import { Platform, FixedScheduler, InputSources } from './browser-platform.js';

const $ = selector => document.querySelector(selector);
const scheduler = new FixedScheduler();
let started = false, paused = false, failed = false, menuWasPaused = false, lastFrame = null;
const report = (error, fatal = true) => {
  console.error(error);
  $('#message').textContent = `${fatal ? 'Game stopped: ' : ''}${error.message ?? error}`;
  $('#message').hidden = false;
  if (fatal) {
    failed = true;
    input.clear();
    platform.stopSound(-1);
    $('#pause').disabled = true;
    $('#start').disabled = true;
    $('#loading').textContent = 'Startup failed. See the error below.';
  }
};
const platform = new Platform($('#screen'), $('#native-ui'), $('#commands'), report);
globalThis.mikiPlatform = platform;
const input = new InputSources((key, pressed) => platform.invoke(() => platform.callbacks?.key(key, pressed)));
platform.onScreenChange = () => input.clear();
platform.onExit = () => {
  input.clear();
  $('#message').textContent = 'Game exited. Reload to play again.';
  $('#message').hidden = false;
  $('#pause').disabled = true;
};

async function setPaused(value) {
  if (!started || failed || platform.exited || value === paused) return;
  input.clear();
  paused = value;
  scheduler.reset(); lastFrame = null;
  platform.invoke(() => platform.callbacks.pause(value ? 1 : 0));
  $('#pause').textContent = value ? 'Resume' : 'Pause';
  $('#pause').setAttribute('aria-pressed', String(value));
  if (platform.audio) {
    try { await (value ? platform.audio.suspend() : platform.audio.resume()); }
    catch (error) { report(new Error(`Audio ${value ? 'pause' : 'resume'} failed: ${error.message}`), false); }
  }
}

$('#start').addEventListener('click', async () => {
  if (started || failed) return;
  $('#start').disabled = true;
  try {
    await platform.unlockAudio();
    const { main } = await import('./generated/game.js');
    main([]);
    if (!platform.callbacks || platform.exited) throw new Error('Original MIDlet did not initialize');
    started = true;
    $('#startup').hidden = true;
    $('#pause').disabled = false;
    lastFrame = null;
  } catch (error) { report(error); }
});

function frame(now) {
  if (started && !paused && !failed && !platform.exited) {
    if (lastFrame !== null) scheduler.advance(now - lastFrame, clock => {
      platform.clock = clock;
      platform.invoke(() => platform.callbacks.tick());
    });
    lastFrame = now;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
$('#pause').addEventListener('click', () => void setPaused(!paused));
$('#reload').addEventListener('click', () => location.reload());
$('#mute').addEventListener('click', () => {
  platform.muted = !platform.muted;
  if (platform.muted) platform.stopSound(-1);
  $('#mute').setAttribute('aria-pressed', String(platform.muted));
  $('#mute').textContent = platform.muted ? 'Unmute browser audio' : 'Mute browser audio';
});
$('#menu-toggle').addEventListener('click', () => {
  const open = $('#menu').hidden;
  $('#menu').hidden = !open;
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  if (open) { menuWasPaused = paused; void setPaused(true); }
  else if (!menuWasPaused) void setPaused(false);
});
$('#fullscreen').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if ($('#game').requestFullscreen) await $('#game').requestFullscreen();
    else throw new Error('Native fullscreen is unavailable in this browser. The game already fills the viewport.');
  } catch (error) { report(error, false); }
});

const keyMap = new Map([
  ['ArrowLeft',52],['KeyA',52],['ArrowRight',54],['KeyD',54],['ArrowUp',50],['KeyW',50],
  ['ArrowDown',56],['KeyS',56],['Space',53],['Enter',53],
  ...[1,2,3,4,5,6,8].flatMap(n => [[`Digit${n}`,48+n],[`Numpad${n}`,48+n]])
]);
window.addEventListener('keydown', event => {
  if (event.target instanceof HTMLInputElement || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.code === 'KeyP' && !event.repeat) { event.preventDefault(); void setPaused(!paused); return; }
  const key = keyMap.get(event.code);
  if (key === undefined || !started || paused || failed || platform.exited) return;
  event.preventDefault();
  input.press(`keyboard:${event.code}`, key);
});
window.addEventListener('keyup', event => input.release(`keyboard:${event.code}`));
for (const button of document.querySelectorAll('[data-key]')) {
  button.addEventListener('pointerdown', event => {
    event.preventDefault();
    if (!started || paused || failed || platform.exited) return;
    button.setPointerCapture(event.pointerId);
    input.press(`pointer:${event.pointerId}`, Number(button.dataset.key));
  });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) {
    button.addEventListener(type, event => input.release(`pointer:${event.pointerId}`));
  }
}
window.addEventListener('blur', () => { input.clear(); void setPaused(true); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { input.clear(); void setPaused(true); } });
window.addEventListener('error', event => report(event.error ?? new Error(event.message)));
window.addEventListener('unhandledrejection', event => report(event.reason instanceof Error ? event.reason : new Error(String(event.reason))));

try {
  await platform.preload();
  const title = platform.image('title.png');
  const context = $('#screen').getContext('2d');
  context.imageSmoothingEnabled = false;
  const image = platform.surfaces[title];
  context.drawImage(image, (176 - image.width) / 2, (144 - image.height) / 2);
  $('#loading').textContent = 'Original game ready. Click Play to enable sound.';
  $('#start').disabled = false;
} catch (error) { report(error); }
