import { test, expect } from '@playwright/test';

async function command(page, name) {
  await page.locator('#menu-toggle').click();
  await page.locator('#commands').getByRole('button', { name, exact: true }).click();
  await expect(page.locator('#menu')).toBeHidden();
  await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
}

for (const menuOpen of [false, true]) {
  test(`top bar New Game starts the original game with menu ${menuOpen ? 'open' : 'closed'}`, async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#new-game')).toBeDisabled();
    await page.locator('#start').click();
    await expect(page.locator('#toolbar #new-game')).toBeEnabled();
    await expect(page.locator('#new-game')).toBeInViewport();
    await command(page, 'Instructions');
    await expect(page.locator('#new-game')).toBeDisabled();
    await command(page, 'Back');
    await expect(page.locator('#new-game')).toBeEnabled();
    if (menuOpen) await page.locator('#menu-toggle').click();
    await page.locator('#new-game').click();
    await expect(page.locator('#menu')).toBeHidden();
    await expect(page.locator('#pause')).toHaveText('Pause');
    await expect(page.locator('#screen')).toBeFocused();
    await expect.poll(() => page.evaluate(() => JSON.parse(globalThis.mikiPlatform.callbacks.state()).mode)).toBe(1);
    await expect(page.locator('#message')).toBeHidden();
  });
}

test('original coin/key pickups render sustained tones and silent rests, not click pulses', async ({ page }) => {
  await page.goto('/');
  const measurements=await page.evaluate(async ()=>{
    const {Platform,PLAYBACK_RATE}=await import('./browser-platform.js');
    const results=[];
    for(const name of ['coin.ott','key.ott']) {
      const bytes=new Uint8Array(await (await fetch(`./original/${name}`)).arrayBuffer());
      let binary='';
      for(const byte of bytes) binary+=String.fromCharCode(byte);
      const platform=new Platform(null,null,null,error=>{throw error;});
      const id=platform.sound(binary),melody=platform.sounds[id];
      platform.audio=new OfflineAudioContext(1,Math.ceil((melody.duration/PLAYBACK_RATE+.1)*48000),48000);
      platform.playSound(id,1);
      try {
        const samples=(await platform.audio.startRendering()).getChannelData(0);
        const voiced=[],rests=[];
        for(const note of melody.notes) {
          const from=Math.ceil((.015+(note.start+note.duration*.3)/PLAYBACK_RATE)*48000);
          const to=Math.floor((.015+(note.start+note.duration*.6)/PLAYBACK_RATE)*48000);
          let energy=0;
          for(let i=from;i<to;i++) energy+=samples[i]**2;
          (note.frequency ? voiced : rests).push(Math.sqrt(energy/(to-from)));
        }
        results.push({name,minToneRms:Math.min(...voiced),maxRestRms:Math.max(0,...rests)});
      } finally { platform.stopSound(-1); }
    }
    return results;
  });
  for(const result of measurements) {
    expect(result.minToneRms,`${result.name} must remain audible through the middle of each note`).toBeGreaterThan(.01);
    expect(result.maxRestRms,`${result.name} rests must remain silent`).toBeLessThan(1e-7);
  }
});

test('interrupting a live pickup fades to zero instead of cutting the waveform', async ({ page }) => {
  await page.goto('/');
  const result=await page.evaluate(async ()=>{
    const {Platform}=await import('./browser-platform.js');
    const render=async interrupt=>{
      const audio=new OfflineAudioContext(1,9600,48000);
      const platform=new Platform(null,null,null,error=>{throw error;});
      platform.audio=audio;
      platform.sounds.push({duration:.1,notes:[{start:0,duration:.1,gate:.1,frequency:1244.5079348883237,volume:1}]});
      platform.playSound(0,1);
      let stoppedAt;
      const suspended=interrupt ? audio.suspend(.04).then(()=>{
        stoppedAt=audio.currentTime;
        platform.stopSound(0);
        return audio.resume();
      }) : Promise.resolve();
      try {
        const buffer=await audio.startRendering();
        await suspended;
        return {samples:buffer.getChannelData(0),stoppedAt};
      } finally { platform.stopSound(-1); }
    };
    const control=await render(false),faded=await render(true);
    const index=Math.round(faded.stoppedAt*48000);
    return {
      atStop:Math.abs(faded.samples[index]),
      edgeDifference:Math.abs(faded.samples[index]-control.samples[index]),
      halfway:Math.abs(faded.samples[index+72]),
      expectedHalfway:Math.abs(control.samples[index+72])*.5,
      afterFade:Math.max(...faded.samples.slice(index+145).map(Math.abs))
    };
  });
  expect(result.atStop).toBeGreaterThan(.005);
  expect(result.edgeDifference).toBeLessThan(1e-6);
  expect(result.halfway).toBeCloseTo(result.expectedHalfway,5);
  expect(result.afterFade).toBeLessThan(1e-7);
});

test('game fills the viewport with controls overlaid before and after resizing', async ({ page }) => {
  await page.goto('/');
  const expectFullViewport = async () => {
    const size = page.viewportSize();
    for (const selector of ['#game', '#viewport', '#screen']) {
      expect(await page.locator(selector).boundingBox()).toEqual({
        x: 0, y: 0, width: size.width, height: size.height
      });
    }
    const layout = await page.evaluate(() => ({
      fit: getComputedStyle(document.querySelector('#screen')).objectFit,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }));
    expect(layout).toEqual({ fit: 'contain', width: size.width, height: size.height });
  };
  await expect(page.locator('#start')).toBeEnabled();
  await expectFullViewport();
  await page.locator('#start').click();
  await expect(page.getByRole('button', { name: 'New game', exact: true })).toBeHidden();
  await expect(page.locator('#menu #commands')).toHaveCount(1);
  await expectFullViewport();
  await command(page, 'Instructions');
  await expect(page.locator('#native-ui')).toBeVisible();
  await command(page, 'Back');
  const size = page.viewportSize();
  await page.setViewportSize({ width: size.height, height: size.width });
  await expectFullViewport();
  await expect(page.locator('#toolbar')).toBeInViewport();
  await page.locator('#menu-toggle').click();
  await expect(page.getByRole('button', { name: 'New game', exact: true })).toBeInViewport();
  await page.locator('#menu-toggle').click();
  if (await page.locator('#touch').isVisible()) {
    for (const button of await page.locator('#touch button').all()) {
      await expect(button).toBeInViewport();
    }
  }
});

test('high notes retain pitch with reduced buzzy upper harmonics and no clipping', async ({ page }) => {
  await page.goto('/');
  const measured=await page.evaluate(async ()=>{
    const {Platform}=await import('./browser-platform.js');
    const {decodeOTT}=await import('./ott.js');
    const bytes=new Uint8Array(await (await fetch('./original/cage.ott')).arrayBuffer());
    const frequency=Math.max(...decodeOTT(bytes).notes.map(note=>note.frequency));
    const render=async production=>{
      const audio=new OfflineAudioContext(1,14400,48000);
      let platform;
      if(production) {
        platform=new Platform(null,null,null,error=>{throw error;});
        platform.audio=audio;
        platform.sounds.push({duration:.12,notes:[{start:0,gate:.12,duration:.12,frequency,volume:1}]});
        platform.playSound(0,1);
      } else {
        const oscillator=audio.createOscillator(),gain=audio.createGain();
        oscillator.type='square'; oscillator.frequency.value=frequency; gain.gain.value=.075;
        oscillator.connect(gain); gain.connect(audio.destination);
        oscillator.start(.015); oscillator.stop(.25);
      }
      try {
        const buffer=await audio.startRendering();
        const samples=buffer.getChannelData(0);
        const amplitude=hz=>{
          let real=0,imaginary=0;
          const start=1920,length=4800;
          for(let i=0;i<length;i++) {
            const sample=samples[start+i]*(.5-.5*Math.cos(2*Math.PI*i/(length-1)));
            const phase=2*Math.PI*hz*(start+i)/48000;
            real+=sample*Math.cos(phase); imaginary+=sample*Math.sin(phase);
          }
          return Math.hypot(real,imaginary);
        };
        const fundamental=amplitude(frequency);
        return {
          fundamental,
          thirdRatio:amplitude(frequency*3)/fundamental,
          fifthRatio:amplitude(frequency*5)/fundamental,
          peak:Math.max(...samples.map(Math.abs)),
          nearby:Math.max(amplitude(frequency-100),amplitude(frequency+100))
        };
      } finally { platform?.stopSound(-1); }
    };
    return {triangle:await render(true),square:await render(false)};
  });
  expect(measured.triangle.fundamental).toBeGreaterThan(measured.triangle.nearby*100);
  expect(measured.triangle.thirdRatio).toBeLessThan(.13);
  expect(measured.triangle.fifthRatio).toBeLessThan(.06);
  expect(measured.triangle.thirdRatio).toBeLessThan(measured.square.thirdRatio*.4);
  expect(measured.triangle.peak).toBeGreaterThan(.01);
  expect(measured.triangle.peak).toBeLessThan(.08);
});

test('loads original game, starts gameplay, pauses, and retains settings on reload', async ({ page }) => {
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#start')).toBeEnabled();
  await page.locator('#start').click();
  await expect(page.locator('#startup')).toBeHidden();
  await expect(page.getByRole('button',{name:'New game',exact:true})).toBeHidden();
  await command(page, 'New game');
  await expect.poll(
    () => page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()).state),
    {timeout:30000}
  ).toBe(0);
  const before=await page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()));
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(300);
  await page.keyboard.up('ArrowRight');
  const after=await page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()));
  expect(after.x).not.toBe(before.x);
  await page.locator('#pause').click();
  const paused=await page.evaluate(()=>globalThis.mikiPlatform.callbacks.state());
  await page.waitForTimeout(200);
  expect(await page.evaluate(()=>globalThis.mikiPlatform.callbacks.state())).toBe(paused);
  await page.locator('#menu-toggle').click();
  await page.locator('#menu-toggle').click();
  await expect(page.locator('#pause')).toHaveText('Resume');
  await page.locator('#pause').click();
  const canvas=await page.locator('#screen').boundingBox();
  expect(canvas.width).toBeGreaterThan(100);
  expect(canvas.height).toBeGreaterThan(80);
  const saved=await page.evaluate(()=>localStorage.getItem('mikis-world-2:1.2.2:AppData'));
  expect(saved).not.toBeNull();
  await expect(page.locator('#message')).toBeHidden();
  await page.reload();
  await expect(page.locator('#start')).toBeEnabled();
  await page.locator('#start').click();
  expect(await page.evaluate(()=>localStorage.getItem('mikis-world-2:1.2.2:AppData'))).toBe(saved);
  expect(errors).toEqual([]);
});

test('resource mismatch is shown as an explicit startup failure', async ({ page }) => {
  await page.route('**/original/level.bin',route=>route.fulfill({body:'corrupted map'}));
  await page.goto('/');
  await expect(page.locator('#message')).toContainText('Integrity check failed: level.bin');
  await expect(page.locator('#start')).toBeDisabled();
});

test('original forms, browser audio, input cancellation and fullscreen denial', async ({ page }) => {
  await page.goto('/');
  await page.locator('#start').click();
  for(const name of ['Instructions','High scores','About']) {
    await command(page, name);
    await expect(page.locator('#native-ui')).toBeVisible();
    await command(page, 'Back');
    await expect(page.locator('#native-ui')).toBeHidden();
  }
  await command(page, 'Sound: on');
  await command(page, 'Sound: off');
  await expect.poll(() => page.evaluate(() => globalThis.mikiPlatform.audio.state)).toBe('running');
  const audio=await page.evaluate(()=>{
    const p=globalThis.mikiPlatform;
    p.stopSound(-1);
    const actual=[],expected=[];
    const create=p.audio.createOscillator.bind(p.audio);
    p.audio.createOscillator=()=>{
      const node=create(); actual.push(node); return node;
    };
    try {
      for(let id=0;id<p.sounds.length;id++) {
        expected.push(...p.sounds[id].notes.filter(n=>n.frequency && n.volume && n.gate>0).map(n=>n.frequency));
        p.playSound(id,1);
      }
      return {state:p.audio.state,count:p.sounds.length,actual:actual.map(n=>n.frequency.value),expected};
    } finally { p.stopSound(-1); p.audio.createOscillator=create; }
  });
  expect(audio.state).toBe('running');
  expect(audio.count).toBe(12);
  expect(audio.actual.length).toBe(audio.expected.length);
  audio.actual.forEach((value,i)=>expect(value).toBeCloseTo(audio.expected[i],2));

  await command(page, 'New game');
  await expect.poll(()=>page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()).state)).toBe(20);
  await page.keyboard.press('Space', { delay: 100 });
  await expect.poll(()=>page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()).state),{timeout:20000}).toBe(0);
  const events=await page.evaluate(()=>{
    const p=globalThis.mikiPlatform, events=[], key=p.callbacks.key;
    p.callbacks.key=(code,pressed)=>{events.push([code,pressed]); key(code,pressed);};
    globalThis.__inputEvents=events;
    return events;
  });
  expect(events).toEqual([]);
  if(await page.locator('[data-key="54"]').isVisible()) {
    const right=await page.locator('[data-key="54"]').boundingBox();
    const jump=await page.locator('[data-key="50"]').boundingBox();
    const point=(box,id)=>({x:box.x+box.width/2,y:box.y+box.height/2,id});
    const finger=point(right,1), second=point(jump,2);
    const cdp=await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger,second]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[finger]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
    await cdp.detach();
  }
  await page.keyboard.down('ArrowRight');
  await page.keyboard.down('ArrowUp');
  await page.keyboard.up('ArrowUp');
  await page.keyboard.up('ArrowRight');
  expect(await page.evaluate(()=>globalThis.__inputEvents)).toContainEqual([54,1]);
  expect(await page.evaluate(()=>globalThis.__inputEvents)).toContainEqual([50,0]);
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));
  await expect(page.locator('#pause')).toHaveText('Resume');
  await page.evaluate(()=>{ document.querySelector('#game').requestFullscreen=()=>Promise.reject(new Error('Fullscreen denied for test')); });
  await page.locator('#fullscreen').click();
  await expect(page.locator('#message')).toContainText('Fullscreen denied for test');
});
