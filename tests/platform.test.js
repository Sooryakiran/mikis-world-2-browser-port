import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { decodeOTT } from '../ott.js';
import { FixedScheduler, InputSources, Platform, PLAYBACK_RATE, SOUND_WAVEFORM } from '../browser-platform.js';

const manifest = JSON.parse(await readFile(new URL('../public/original/manifest.json', import.meta.url)));

test('JAR identity and every extracted resource are preserved byte for byte', async () => {
  const jar = new URL('../jar/mikis_world_2.jar', import.meta.url);
  assert.equal(createHash('sha256').update(await readFile(jar)).digest('hex'), manifest.jarSha256);
  assert.equal(manifest.resources.length, 34);
  for (const entry of manifest.resources) {
    const extracted = await readFile(new URL(`../public/original/${entry.name}`, import.meta.url));
    const original = execFileSync('unzip', ['-p', jar.pathname, entry.name]);
    assert.deepEqual(extracted, original);
    assert.equal(extracted.length, entry.size);
    assert.equal(createHash('sha256').update(extracted).digest('hex'), entry.sha256);
  }
});

test('all 12 original OTT sounds decode to finite notes with valid pitch and duration', async () => {
  const names = (await readdir(new URL('../public/original/', import.meta.url))).filter(name => name.endsWith('.ott'));
  assert.equal(names.length, 12);
  for (const name of names) {
    const melody = decodeOTT(await readFile(new URL(`../public/original/${name}`, import.meta.url)));
    assert.ok(melody.notes.length > 0);
    assert.ok(melody.duration > 0 && melody.duration < 60);
    for (const note of melody.notes) {
      assert.ok(Number.isFinite(note.frequency) && note.frequency >= 0 && note.frequency < 20000);
      assert.ok(note.gate >= 0 && note.gate <= note.duration);
    }
  }
  const coin = decodeOTT(await readFile(new URL('../public/original/coin.ott', import.meta.url)));
  assert.equal(coin.title, 'coin');
  assert.equal(coin.notes.length, 4);
  assert.throws(() => decodeOTT(new Uint8Array(4)), /Unsupported OTT/);
});

test('OTT scale, tempo, articulation and volume follow a known encoded note', () => {
  let bits='';
  const write=(value,width)=>{ bits+=value.toString(2).padStart(width,'0'); };
  write(2,8); write(37,7); write(0,1); write(29,7); write(1,3); write(1,4); write(65,8);
  write(1,8); write(0,3); write(0,2); write(0,4); write(5,8);
  write(2,3); write(0,2); // octave 4
  write(3,3); write(0,2); // natural articulation
  write(4,3); write(16,5); // 160 bpm
  write(5,3); write(15,4);
  write(1,3); write(1,4); write(2,3); write(0,2); // C quarter note
  bits=bits.padEnd(Math.ceil(bits.length/8)*8,'0');
  const melody=decodeOTT(Uint8Array.from(bits.match(/.{8}/g),value=>parseInt(value,2)));
  assert.equal(melody.title,'A');
  assert.equal(melody.duration,.375);
  assert.equal(melody.notes[0].volume,1);
  assert.ok(Math.abs(melody.notes[0].frequency-261.6255653)<.00001);
  assert.ok(Math.abs(melody.notes[0].gate-.355)<1e-10);
});

test('coin and key pickup notes retain an audible body instead of 1 ms pulses', async () => {
  for(const name of ['coin.ott','key.ott']) {
    const melody=decodeOTT(await readFile(new URL(`../public/original/${name}`,import.meta.url)));
    const notes=melody.notes.filter(note=>note.frequency);
    assert.ok(notes.length>=4);
    for(const note of notes) {
      assert.ok(Math.abs(note.duration-60/2840)<1e-10);
      assert.ok(Math.abs(note.gate/note.duration-.875)<1e-10);
      assert.ok(note.gate/PLAYBACK_RATE>.028,'each pickup tone must sound for at least 28 ms at 0.64 speed');
    }
  }
});

test('0.64 playback produces 320 steps over 10 seconds at 60, 120 and 144 Hz', () => {
  assert.equal(PLAYBACK_RATE,0.64);
  for (const hz of [60,120,144]) {
    const scheduler = new FixedScheduler();
    let ticks = 0;
    for (let frame=0; frame<hz*10; frame++) scheduler.advance(1000/hz, () => ticks++);
    assert.equal(ticks, 320);
    assert.equal(scheduler.clock, 6400);
    scheduler.advance(30000, () => ticks++);
    assert.equal(ticks, 323, 'stalls are capped to 100 ms scaled to 64 ms');
    scheduler.reset();
    scheduler.advance(15.625, () => ticks++);
    scheduler.reset();
    scheduler.advance(15.625, () => ticks++);
    assert.equal(ticks, 323, 'pause discards the pending half step');
  }
});

test('input sources preserve shared keys and reassert held movement after jump release', () => {
  const events = [];
  const input = new InputSources((...event) => events.push(event));
  input.press('left-arrow', 52);
  input.press('touch-left', 52);
  input.release('left-arrow');
  assert.deepEqual(events, [[52,1]]);
  input.press('jump',50);
  input.release('jump');
  assert.deepEqual(events.slice(-2), [[50,0],[52,1]]);
  input.clear();
  assert.deepEqual(events.at(-1), [52,0]);
  assert.equal(input.sources.size,0);
});

test('RMS create/missing, binary updates, deletion, and corrupt-store errors', () => {
  const data = new Map(), errors = [];
  const previous = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key,value) => data.set(key,value),
    removeItem: key => data.delete(key)
  };
  try {
    const platform = new Platform(null,null,null,error => errors.push(error));
    assert.equal(platform.rms('test','open',0,null),null);
    assert.equal(platform.rms('test','create',0,null),'ok');
    assert.equal(platform.rms('test','count',0,null),'0');
    assert.equal(platform.rms('test','add',0,'\x00\xff\x80'),'1');
    assert.equal(platform.rms('test','get',1,null),'\x00\xff\x80');
    platform.rms('test','set',1,'\x02');
    assert.equal(platform.rms('test','get',1,null),'\x02');
    assert.equal(platform.rms('test','get',2,null),null);
    platform.rms('test','delete',0,null);
    assert.equal(platform.rms('test','open',0,null),null);
    data.set('mikis-world-2:1.2.2:test','{}');
    assert.throws(() => platform.rms('test','open',0,null), /Corrupt/);
    assert.equal(errors.length,1);
  } finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
});

test('Web Audio uses decoded notes and cancels repeat scheduling and active nodes', async () => {
  const platform=new Platform(null,null,null,error=>{ throw error; });
  const nodes=[];
  const envelopes=[];
  platform.audio={
    currentTime:5, destination:{},
    createOscillator() {
      const node={frequency:{value:0},connect(){},disconnect(){this.disconnected=true;},
        start(time){this.from=time;},stop(time){this.to=time; this.stops=(this.stops??0)+1;}};
      nodes.push(node); return node;
    },
    createGain() {
      const events=[];
      envelopes.push(events);
      return {gain:{
        setValueAtTime(value,time){events.push({value,time});},
        linearRampToValueAtTime(value,time){events.push({value,time});},
        cancelScheduledValues(time){
          for(let i=events.length-1;i>=0;i--) if(events[i].time>=time) events.splice(i,1);
        }
      },connect(){},disconnect(){}};
    }
  };
  const bytes=await readFile(new URL('../public/original/coin.ott',import.meta.url));
  const id=platform.sound(bytes.toString('latin1'));
  try {
    platform.playSound(id,0);
    const audible=platform.sounds[id].notes.filter(note=>note.frequency && note.volume && note.gate>0);
    assert.equal(nodes.length,audible.length);
    for(let i=0;i<nodes.length;i++) {
      assert.equal(SOUND_WAVEFORM,'triangle');
      assert.equal(nodes[i].type,SOUND_WAVEFORM);
      assert.equal(nodes[i].frequency.value,audible[i].frequency);
      assert.ok(Math.abs(nodes[i].from-(5.015+audible[i].start/PLAYBACK_RATE))<1e-10);
      assert.ok(Math.abs(nodes[i].to-nodes[i].from-audible[i].gate/PLAYBACK_RATE)<1e-10);
      const envelope=envelopes[i];
      assert.equal(envelope.length,4);
      assert.equal(envelope[0].value,0);
      assert.equal(envelope[3].value,0);
      for(let j=1;j<envelope.length;j++) {
        assert.ok(envelope[j].time>envelope[j-1].time,'even short notes must have ordered attack, sustain and release');
      }
    }
    platform.stopSound(id+1);
    assert.ok(platform.activeSound);
    const voice=[...platform.activeSound.nodes.values()][0];
    platform.audio.currentTime=voice.from+voice.ramp/2;
    platform.stopSound(id);
    assert.equal(platform.activeSound,null);
    assert.ok(nodes.every(node=>node.stops===2));
    assert.ok(Math.abs(nodes[0].to-platform.audio.currentTime-.003)<1e-10);
    assert.ok(Math.abs(envelopes[0].at(-2).value-voice.peak/2)<1e-10);
    assert.equal(envelopes[0].at(-1).value,0);
    assert.ok(nodes.slice(1).every(node=>node.to===platform.audio.currentTime),'future notes are canceled before starting');
    for(const node of nodes) node.onended();
    assert.ok(nodes.every(node=>node.disconnected));
  } finally { platform.stopSound(-1); }
});
