import { test, expect } from '@playwright/test';

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
  await expect(page.getByRole('button',{name:'New game',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'New game',exact:true}).click();
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
    await page.getByRole('button',{name,exact:true}).click();
    await expect(page.locator('#native-ui')).toBeVisible();
    await page.getByRole('button',{name:'Back',exact:true}).click();
    await expect(page.locator('#native-ui')).toBeHidden();
  }
  await page.getByRole('button',{name:'Sound: on',exact:true}).click();
  await expect(page.getByRole('button',{name:'Sound: off',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Sound: off',exact:true}).click();
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

  await page.getByRole('button',{name:'New game',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>JSON.parse(globalThis.mikiPlatform.callbacks.state()).state)).toBe(20);
  await page.keyboard.press('Space');
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
