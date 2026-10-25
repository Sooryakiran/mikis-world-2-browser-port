import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { decodeOTT } from '../ott.js';

const manifest = JSON.parse(await readFile(new URL('../public/original/manifest.json', import.meta.url)));
const resources = new Map();
const dimensions = new Map();
for (const entry of manifest.resources) {
  const bytes = await readFile(new URL(`../public/original/${entry.name}`, import.meta.url));
  resources.set(entry.name, bytes.toString('latin1'));
  if (entry.name.endsWith('.png')) dimensions.set(entry.name, [bytes.readUInt32BE(16),bytes.readUInt32BE(20)]);
}

async function boot() {
  let commands = [], paragraphs = [], options = [], fields = [], kind = '';
  const stores = new Map();
  const sizes = [[176,144], ...dimensions.values()];
  const platform = {
    clock:0, callbacks:null, exited:false, sounds:[],
    bind(callbacks) { this.callbacks=callbacks; },
    resource: name => resources.get(name) ?? null,
    image: name => dimensions.has(name) ? [...dimensions.keys()].indexOf(name)+1 : -1,
    dimension: (id,axis) => sizes[id][axis],
    surface(w,h) { return sizes.push([w,h])-1; },
    rect() {}, blit() {}, drawText() {},
    measure: (text,size) => Math.ceil(text.length*size*.6),
    beginUI(value) { commands=[]; paragraphs=[]; options=[]; fields=[]; kind=value; },
    addCommand(id,label) { commands.push({id,label}); },
    addText(text) { paragraphs.push(text); },
    addField(id,label,value,max) { fields.push({id,label,value,max}); },
    addOption(id,text,selected) { options.push({id,text,selected}); },
    endUI() {},
    rms(name,op,id,value) {
      if (!stores.has(name)) {
        if (op!=='create') return null;
        stores.set(name,[]);
      }
      const records=stores.get(name);
      if (op==='create' || op==='open') return 'ok';
      if (op==='count') return String(records.length);
      if (op==='get') return records[id-1] ?? null;
      if (op==='add') { records.push(value); return String(records.length); }
      if (op==='set') { assert.ok(id>0 && id<=records.length); records[id-1]=value; return 'ok'; }
      if (op==='delete') { stores.delete(name); return 'ok'; }
      throw new Error(`Unexpected RMS ${op}`);
    },
    sound(data) {
      this.sounds.push(decodeOTT(Buffer.from(data,'latin1')));
      return this.sounds.length-1;
    },
    playSound(id,repeats) { assert.ok(this.sounds[id]); assert.ok(repeats>=0); },
    stopSound() {}, vibrate() {},
    exit() { this.exited=true; }
  };
  globalThis.mikiPlatform=platform;
  const module = await import(`../public/generated/game.js?run=${Math.random()}`);
  module.main([]);
  assert.ok(platform.callbacks,'compiled MIDlet bound its callbacks');
  assert.equal(platform.exited,false);
  const tick = count => {
    for(let i=0;i<count;i++) { platform.clock+=20; platform.callbacks.tick(); }
  };
  return {
    platform, tick, stores,
    get commands() { return commands; },
    get paragraphs() { return paragraphs; },
    get options() { return options; },
    get fields() { return fields; },
    get kind() { return kind; },
    state: () => JSON.parse(platform.callbacks.state()),
    command(label) {
      const command=commands.find(item=>item.label===label);
      assert.ok(command,`Missing command "${label}"; found ${commands.map(c=>c.label)}`);
      platform.callbacks.command(command.id);
    }
  };
}

test('original MIDlet initializes title, commands, 12 sounds and RMS', async () => {
  const game=await boot();
  assert.equal(game.platform.sounds.length,12);
  assert.ok(game.stores.has('AppData'));
  assert.equal(game.state().mode,0);
  assert.ok(game.commands.some(command=>command.label==='New game'));
  game.tick(500);
  assert.equal(game.platform.exited,false);
  console.log('Original title commands:',game.commands.map(command=>command.label).join(', '));
});

test('original story reaches gameplay naturally, movement and release use original physics', async () => {
  const game=await boot();
  game.command('New game');
  game.tick(1);
  assert.equal(game.state().mode,1);
  let storyTicks=0;
  while(game.state().state===20 && storyTicks<3500) { game.tick(1); storyTicks++; }
  assert.equal(game.state().mode,1);
  assert.equal(game.state().state,0);
  assert.ok(storyTicks>100 && storyTicks<3500);
  const before=game.state();
  game.platform.callbacks.key(54,1);
  game.tick(20);
  game.platform.callbacks.key(54,0);
  const after=game.state();
  assert.notEqual(after.x,before.x,'right key must move the original player');
  game.platform.callbacks.key(50,1);
  game.tick(8);
  game.platform.callbacks.key(50,0);
  assert.notEqual(game.state().y,after.y,'jump must change the original vertical position');
});

test('original instructions, scores, about, sound settings and exit commands remain reachable', async () => {
  const game=await boot();
  for (const label of ['Instructions','High scores','About']) {
    game.command(label);
    assert.equal(game.kind,'form',`${label} opens the original form`);
    assert.ok(game.paragraphs.length>0,`${label} contains original text`);
    game.command('Back');
    assert.equal(game.kind,'canvas');
    assert.ok(game.commands.some(command=>command.label==='New game'));
  }
  const before=game.stores.get('AppData')[0];
  game.command('Sound: on');
  assert.ok(game.commands.some(command=>command.label==='Sound: off'));
  assert.notEqual(game.stores.get('AppData')[0],before);
  game.command('Sound: off');
  assert.equal(game.stores.get('AppData')[0],before);
  game.command('Exit');
  game.tick(2);
  assert.equal(game.platform.exited,true);
});
