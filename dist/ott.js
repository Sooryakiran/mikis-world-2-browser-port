// Nokia Smart Messaging basic-song bitstream, not RTTTL text or sampled audio.
const TEMPOS = [25,28,31,35,40,45,50,56,63,70,80,90,100,112,125,140,160,180,200,225,250,285,320,355,400,450,500,565,635,715,800,900];

export function decodeOTT(bytes) {
  let position = 0;
  const read = count => {
    if (position + count > bytes.length * 8) throw new Error(`Truncated OTT at bit ${position}`);
    let value = 0;
    for (let i = 0; i < count; i++, position++) {
      value = value * 2 + ((bytes[position >> 3] >> (7 - (position & 7))) & 1);
    }
    return value;
  };
  const expect = (count, value, label) => {
    if (read(count) !== value) throw new Error(`Unsupported OTT ${label}`);
  };
  expect(8, 2, 'command count');
  expect(7, 37, 'programming command');
  read(1);
  expect(7, 29, 'sound command');
  expect(3, 1, 'song type');
  const length = read(4);
  let title = '';
  for (let i = 0; i < length; i++) title += String.fromCharCode(read(8));
  const patternCount = read(8);
  const patterns = new Map();
  let scale = 1, bpm = 63, style = 0, volume = 7, time = 0;
  const notes = [];
  for (let patternIndex = 0; patternIndex < patternCount; patternIndex++) {
    expect(3, 0, 'pattern header');
    const id = read(2), repeats = read(4), instructionCount = read(8);
    if (repeats === 15) throw new Error('Unbounded internal OTT pattern repeat is unsupported');
    let instructions;
    if (instructionCount === 0) {
      instructions = patterns.get(id);
      if (!instructions) throw new Error(`Undefined OTT pattern ${id}`);
    } else {
      instructions = [];
      for (let i = 0; i < instructionCount; i++) {
        const type = read(3);
        if (type === 1) instructions.push({ type, note: read(4), duration: read(3), modifier: read(2) });
        else if (type === 2 || type === 3) instructions.push({ type, value: read(2) });
        else if (type === 4) instructions.push({ type, value: read(5) });
        else if (type === 5) instructions.push({ type, value: read(4) });
        else throw new Error(`Unsupported OTT instruction ${type} at bit ${position}`);
      }
      patterns.set(id, instructions);
    }
    for (let repeat = 0; repeat <= repeats; repeat++) {
      for (const instruction of instructions) {
        const { type, value } = instruction;
        if (type === 2) scale = value;
        else if (type === 3) style = value;
        else if (type === 4) bpm = TEMPOS[value];
        else if (type === 5) volume = value;
        else {
          const { note, duration, modifier } = instruction;
          if (note > 12 || duration > 5 || style > 2) throw new Error('Invalid OTT musical value');
          const seconds = (240 / bpm) / (2 ** duration) * [1, 1.5, 1.75, 2 / 3][modifier];
          // Scale 0 is octave 4; note 1 is C, note 0 is a rest.
          const frequency = note === 0 ? 0 : 440 * 2 ** ((60 + scale * 12 + note - 1 - 69) / 12);
          const gate = style === 1 ? seconds : style === 2 ? seconds / 2 : Math.max(0, seconds - 0.02);
          notes.push({ start: time, duration: seconds, gate, frequency, volume: volume / 15 });
          time += seconds;
        }
      }
    }
  }
  if (!notes.length || !Number.isFinite(time) || time > 600) throw new Error('Invalid OTT duration');
  return { title, notes, duration: time };
}
