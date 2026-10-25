import { decodeOTT } from './ott.js';

export const STEP_MS = 20;
export const PLAYBACK_RATE = 0.64;
export const SOUND_PITCH_SEMITONES = 0;
export const SOUND_WAVEFORM = 'triangle';

export class FixedScheduler {
  pending = 0;
  clock = 0;
  advance(elapsed, tick) {
    this.pending += Math.min(Math.max(elapsed, 0), 100) * PLAYBACK_RATE;
    while (this.pending + 1e-8 >= STEP_MS) {
      this.pending -= STEP_MS;
      this.clock += STEP_MS;
      tick(this.clock);
    }
  }
  reset() { this.pending = 0; }
}

export class InputSources {
  sources = new Map();
  constructor(send) { this.send = send; }
  press(source, key) {
    if (this.sources.has(source)) return;
    const alreadyHeld = [...this.sources.values()].includes(key);
    this.sources.set(source, key);
    if (!alreadyHeld) this.send(key, 1);
  }
  release(source) {
    const key = this.sources.get(source);
    if (key === undefined) return;
    this.sources.delete(source);
    if (![...this.sources.values()].includes(key)) {
      this.send(key, 0);
      // This game's release handler clears both movement axes.
      for (const held of new Set(this.sources.values())) this.send(held, 1);
    }
  }
  clear() {
    const keys = new Set(this.sources.values());
    this.sources.clear();
    for (const key of keys) this.send(key, 0);
  }
}

export class Platform {
  clock = 0;
  callbacks = null;
  resources = new Map();
  images = new Map();
  surfaces = [];
  sounds = [];
  activeSound = null;
  audio = null;
  muted = false;
  exited = false;
  constructor(canvas, ui, commands, report) {
    this.surfaces.push(canvas);
    this.ui = ui;
    this.commands = commands;
    this.report = report;
  }
  async preload() {
    const response = await fetch('./original/manifest.json');
    if (!response.ok) throw new Error(`Resource manifest: HTTP ${response.status}`);
    const manifest = await response.json();
    await Promise.all(manifest.resources.map(async entry => {
      const response = await fetch(`./original/${encodeURIComponent(entry.name)}`);
      if (!response.ok) throw new Error(`${entry.name}: HTTP ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      const digest = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))]
        .map(value => value.toString(16).padStart(2, '0')).join('');
      if (bytes.length !== entry.size || digest !== entry.sha256) throw new Error(`Integrity check failed: ${entry.name}`);
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      this.resources.set(entry.name, binary);
      if (entry.name.endsWith('.png')) {
        const image = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
        this.images.set(entry.name, this.surfaces.push(image) - 1);
      } else if (entry.name.endsWith('.ott')) {
        decodeOTT(bytes);
      }
    }));
    return manifest;
  }
  bind(callbacks) { this.callbacks = callbacks; }
  resource(name) { return this.resources.get(name) ?? null; }
  image(name) { return this.images.get(name) ?? -1; }
  surface(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff'; context.fillRect(0, 0, w, h);
    return this.surfaces.push(canvas) - 1;
  }
  dimension(id, axis) { return this.surfaces[id][axis === 0 ? 'width' : 'height']; }
  context(id, cx, cy, cw, ch) {
    const context = this.surfaces[id].getContext('2d');
    context.save();
    context.imageSmoothingEnabled = false;
    context.beginPath(); context.rect(cx, cy, cw, ch); context.clip();
    return context;
  }
  color(value) { return `#${(value & 0xffffff).toString(16).padStart(6, '0')}`; }
  rect(id, color, cx, cy, cw, ch, x, y, w, h, outline) {
    if (w < 0 || h < 0) return;
    const context = this.context(id, cx, cy, cw, ch);
    context.fillStyle = this.color(color);
    if (outline) {
      context.fillRect(x, y, w + 1, 1); context.fillRect(x, y + h, w + 1, 1);
      context.fillRect(x, y, 1, h + 1); context.fillRect(x + w, y, 1, h + 1);
    } else context.fillRect(x, y, w, h);
    context.restore();
  }
  blit(id, source, cx, cy, cw, ch, x, y) {
    const context = this.context(id, cx, cy, cw, ch);
    context.drawImage(this.surfaces[source], x, y);
    context.restore();
  }
  font(size, bold) { return `${bold ? 'bold ' : ''}${size}px monospace`; }
  measure(value, size, bold) {
    const context = this.surfaces[0].getContext('2d');
    context.font = this.font(size, bold);
    return Math.ceil(context.measureText(value).width);
  }
  drawText(id, value, color, size, bold, cx, cy, cw, ch, x, y) {
    const context = this.context(id, cx, cy, cw, ch);
    context.font = this.font(size, bold); context.fillStyle = this.color(color);
    context.textBaseline = 'top'; context.fillText(value, x, y);
    context.restore();
  }
  beginUI(kind, title) {
    this.ui.replaceChildren(); this.commands.replaceChildren();
    this.ui.hidden = kind === 'canvas';
    if (title) {
      const heading = document.createElement('h2'); heading.textContent = title; this.ui.append(heading);
    }
  }
  addCommand(id, label) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', () => this.invoke(() => this.callbacks.command(id)));
    this.commands.append(button);
  }
  addText(text) {
    const paragraph = document.createElement('p'); paragraph.textContent = text; this.ui.append(paragraph);
  }
  addField(id, label, value, max) {
    const wrapper = document.createElement('label'); wrapper.textContent = label ?? '';
    const input = document.createElement('input'); input.value = value; input.maxLength = max;
    input.addEventListener('input', () => this.invoke(() => this.callbacks.text(id, input.value)));
    wrapper.append(input); this.ui.append(wrapper);
  }
  addOption(id, text, selected) {
    const button = document.createElement('button'); button.textContent = text;
    button.setAttribute('aria-pressed', String(selected));
    button.addEventListener('click', () => this.invoke(() => this.callbacks.select(id)));
    this.ui.append(button);
  }
  endUI() { this.onScreenChange?.(); }
  invoke(action) {
    if (this.exited) return;
    try { action(); } catch (error) { this.report(error); }
  }
  rms(name, op, id, value) {
    try {
      const key = `mikis-world-2:1.2.2:${name}`;
      const raw = localStorage.getItem(key);
      if (raw === null && op !== 'create') return null;
      const records = raw === null ? [] : JSON.parse(raw);
      if (!Array.isArray(records) || records.some(record => typeof record !== 'string')) {
        throw new Error(`Corrupt record store: ${name}`);
      }
      switch (op) {
        case 'open': return 'ok';
        case 'create': if (raw === null) localStorage.setItem(key, '[]'); return 'ok';
        case 'delete': localStorage.removeItem(key); return 'ok';
        case 'count': return String(records.length);
        case 'get': return id > 0 && id <= records.length ? atob(records[id - 1]) : null;
        case 'add': records.push(btoa(value)); break;
        case 'set': if (id <= 0 || id > records.length) return null; records[id - 1] = btoa(value); break;
        default: throw new Error(`Unsupported RMS operation: ${op}`);
      }
      localStorage.setItem(key, JSON.stringify(records));
      return op === 'add' ? String(records.length) : 'ok';
    } catch (error) {
      this.report(new Error(`Saved data failed: ${error.message}`, { cause: error }));
      throw error;
    }
  }
  async unlockAudio() {
    const AudioContext = globalThis.AudioContext ?? globalThis.webkitAudioContext;
    if (!AudioContext) {
      this.report(new Error('Web Audio is unavailable. You can play without sound.'), false);
      return;
    }
    this.audio ??= new AudioContext();
    await this.audio.resume();
  }
  sound(binary) {
    const melody = decodeOTT(Uint8Array.from(binary, char => char.charCodeAt(0)));
    return this.sounds.push(melody) - 1;
  }
  playSound(id, repeats) {
    this.stopSound(-1);
    if (this.muted || !this.audio) return;
    if (!Number.isInteger(repeats) || repeats < 0) throw new Error('Invalid sound repeat count');
    const melody = this.sounds[id];
    if (!melody) throw new Error(`Missing sound ${id}`);
    const active = { id, nodes: new Set(), timer: null, count: 0 };
    this.activeSound = active;
    let start = this.audio.currentTime + 0.015;
    const schedule = () => {
      if (this.activeSound !== active) return;
      for (const note of melody.notes) {
        if (!note.frequency || !note.volume || note.gate <= 0) continue;
        const oscillator = this.audio.createOscillator(), gain = this.audio.createGain();
        const from = start + note.start / PLAYBACK_RATE;
        const to = from + note.gate / PLAYBACK_RATE;
        const ramp = Math.min(0.003, (to - from) / 3);
        oscillator.type = SOUND_WAVEFORM;
        oscillator.frequency.value = note.frequency * 2 ** (SOUND_PITCH_SEMITONES / 12);
        gain.gain.setValueAtTime(0, from);
        gain.gain.linearRampToValueAtTime(note.volume * 0.075, from + ramp);
        gain.gain.setValueAtTime(note.volume * 0.075, to - ramp);
        gain.gain.linearRampToValueAtTime(0, to);
        oscillator.connect(gain); gain.connect(this.audio.destination);
        active.nodes.add(oscillator);
        oscillator.onended = () => {
          oscillator.disconnect(); gain.disconnect(); active.nodes.delete(oscillator);
        };
        oscillator.start(from); oscillator.stop(to);
      }
      start += melody.duration / PLAYBACK_RATE;
      active.count++;
      if (repeats === 0 || active.count < repeats) {
        active.timer = setTimeout(schedule, Math.max(0, (start - this.audio.currentTime - 0.1) * 1000));
      } else {
        active.timer = setTimeout(() => {
          if (this.activeSound === active) this.activeSound = null;
        }, Math.max(0, (start - this.audio.currentTime) * 1000));
      }
    };
    schedule();
  }
  stopSound(id) {
    const active = this.activeSound;
    if (!active || (id !== -1 && active.id !== id)) return;
    clearTimeout(active.timer);
    for (const node of active.nodes) node.stop();
    this.activeSound = null;
  }
  vibrate(ms) { if (typeof navigator.vibrate === 'function') navigator.vibrate(ms); }
  exit() { this.exited = true; this.stopSound(-1); this.onExit?.(); }
}
