# Miki's World 2 - browser port

This is an ahead-of-time Java-bytecode-to-JavaScript port of the supplied
[Miki's World 2 JAR](jar/mikis_world_2.jar), **not a JavaScript recreation or a
JVM interpreting the game in the browser**. The original classes still control
the story, physics, collisions, enemies, maps, menus, scores and progression.
TeaVM compiles those classes together with a focused MIDP/Nokia compatibility
layer.

## Play locally

Build-time requirements: a JDK compatible with Gradle 9.4.1 (verified here with
OpenJDK 25), Node.js 20+, and internet access for the first dependency download.
Java bridge sources target Java 17. Players do not need Java.

```sh
npm ci
npm run build
npm start
```

Open <http://127.0.0.1:4173>, click **Play** to enable browser audio, then use the
original **New game** command. The original opening story runs before gameplay.
The game retains its original title/splash flow and menus.

| Input | Action |
| --- | --- |
| Left / A / 4 | Run left |
| Right / D / 6 | Run right |
| Up / W / 2 | Jump |
| 1 / 3 | Diagonal jump |
| Down / S / 8 | Enter passages |
| Space / Enter / 5 | Select / skip animations |
| P | Browser pause/resume |

Touch devices have an on-screen keypad with simultaneous movement/jump support.
Release, pointer cancellation, pause and loss of focus clear input. When a key is
released the adapter reasserts other held keys because this game's original
release handler clears both axes.

The toolbar provides pause, fullscreen and credits/license controls. Native
fullscreen is optional and requires browser support and a user gesture.
Switching away pauses the game; click **Resume** when returning.
Opening/closing the browser menu does not undo an existing explicit pause.
Original phone forms use HTML controls, including their Back/Save commands.

Settings and high scores use namespaced, localStorage-backed RMS records.
**Continue game is in-session only**, not a new persistent save-game feature.
Returning to title reloads the module/page to reset original Java static state.
Saves are specific to the browser origin, including its port.

## Static deployment

```sh
npm run package
npm run preview
```

Open <http://127.0.0.1:4175> to preview the completed [dist/](dist/) website.
Preview does not compile or rebuild. Set `PORT=4176` if a port is occupied.

Publish the **contents** of `dist/` to a static HTTPS host, with JavaScript module
MIME types and the bundled license/notices. No Java or Node backend is required.
URLs are relative, so the site can also be hosted in a subdirectory. Resource
integrity checking requires HTTPS or localhost. Opening the HTML directly with
`file://` is not supported. This is not an offline/PWA installation.

Packaging checks required files, copies to a staging directory, then replaces
`dist/`. Do not store hand-maintained files in that generated directory.
The source JAR, build tools, Java sources and test dependencies are not deployed.

## Architecture

- [tools/PrepareOriginal.java](tools/PrepareOriginal.java): verifies the exact JAR,
  extracts resources unchanged, and applies bounded ASM transformations.
- [build.gradle](build.gradle): TeaVM 0.16.0 / ASM 9.9 compilation and Gradle tasks.
- [java/BrowserGame.java](java/BrowserGame.java): boots the original MIDlet,
  exposes browser callbacks and read-only player-state diagnostics.
- [java/javax/microedition/](java/javax/microedition/): required MIDP graphics,
  commands, forms and record stores.
- [java/com/nokia/](java/com/nokia/): Nokia sound, backlight and vibration APIs.
- [browser-platform.js](browser-platform.js): Canvas surfaces, resource
  verification, DOM forms, localStorage, scheduling and Web Audio.
- [ott.js](ott.js): bit-packed Nokia basic-song decoder.
- [app.js](app.js): startup gesture, keyboard/touch input and browser lifecycle.

Build outputs are `public/generated/game.js` and `public/original/`. Never edit
generated JavaScript; rebuild after changing Java or the bytecode transformer.
The compatibility layer intentionally implements only this game's API subset.

### Artifact identity and adaptations

The archive manifest identifies **Sumea, Miki'sWorld2, version 1.2.2**,
CLDC 1.0 / MIDP 1.0, entry class `GameMIDlet`. It contains 12 original classes and
34 resources, including 12 OTT sounds. Logical display size is **176 x 144**.

JAR SHA-256:

```text
20cf96fe5bb118e47abd2f390b4778f36bca9d461349351b7e003669ea29a794
```

The build rejects any other JAR hash and unexpected adaptation counts:

| Adaptation | Count | Purpose |
| --- | ---: | --- |
| Cooperative `GameMIDlet.run()` boundary | 1 | One original iteration per browser tick; preserve lifecycle checks/cleanup |
| Thread construction/start removal | 1 | Browser owns scheduling |
| Thread join removal | 1 | No native game thread remains |
| Resource stream redirection | 7 | Read preloaded original bytes synchronously |
| Simulation-clock redirection in `j` | 3 | Original elapsed-time calculations |
| Random-seeding wall-clock call retained in `d` | 1 | Do not turn randomness seeding into simulation time |
| 10 ms sleeps removed in `b` and `d` | 2 | Menu/bonus-list polling yields are replaced by browser scheduling |
| Thread yield removal in `j` | 1 | Browser regains control at the iteration boundary |

Only read-only diagnostic accessors are added to the original classes. Player
coordinates exposed by diagnostics use the game's original 1/16-pixel units.
The manifest and runtime SHA-256 checks ensure assets match the packaged build;
they do not independently prove ownership or authenticity of the supplied JAR.

Simulation advances in fixed **20 ms** steps, with a 100 ms stall cap and no
paused-time catch-up. The global `PLAYBACK_RATE` is **0.64** (64% speed), and
audio tempo follows that rate while pitch stays at **0 semitones**. This is a
player pacing preference, **not a claim of measured handset cadence**.
The browser uses a triangle waveform (`SOUND_WAVEFORM`) to soften the square
wave's buzzy upper harmonics without transposing notes. Attack/release ramps
shrink symmetrically for very short original effects to avoid level jumps.
The configurable constants are in `browser-platform.js`.

## Validation

```sh
npm test
npm run check
# Install only if Chromium is not already available:
npx playwright install chromium
npm run test:browser
# After npm run package, run the same browser suite against dist/:
MIKI_PREVIEW=1 npm run test:browser
```

[Node tests](tests/) exercise the compiled original module, natural story-to-game
transition, movement/jump, original forms/commands/settings/exit, byte-for-byte
resource preservation, OTT note decoding, audio scheduling/cleanup, binary RMS
round trips/errors, and fixed stepping at 60/120/144 Hz.

[Browser tests](e2e/original.spec.js) use real Chromium Canvas, Web Audio, storage,
keyboard and multi-touch APIs across desktop, mobile portrait and landscape.
They cover startup, natural story completion and movement, pause/menu behavior,
settings reload, original forms, oscillator frequencies for all 12 sounds,
input cancellation, fullscreen rejection and resource-integrity failure.
Their dedicated server uses port 4174.

### Known limits / unverified behavior

- No original handset recording or emulator reference was supplied. Timing,
  audio timbre and overall fidelity have **not** been calibrated against hardware.
- Browser monospace fonts substitute for handset fonts; HTML forms are not
  pixel-identical Nokia menus. Graphics retain original pixels and logical size.
- OTT playback uses triangle-wave oscillators, one melody at a time. This is a
  browser timbre preference, not a measured reproduction of the phone speaker. All supplied
  sounds decode; other Nokia song types and unbounded internal pattern loops are
  rejected rather than silently approximated.
- Backlight control is an explicit no-op. Vibration uses `navigator.vibrate`
  when available; unsupported browsers have no physical vibration.
- Full game completion, boss/ending routes, both secret rooms, and the hidden
  bonus game's AI have **not** been independently playthrough-verified.
- Browser automated coverage is Chromium only; Safari/Firefox and physical
  mobile devices still need manual testing.
- localStorage is local to the origin and is not a cloud backup. Corrupt or
  blocked storage is shown as an error rather than silently discarded.

## Rights and attribution

You confirmed permission to adapt and distribute this specific game
non-commercially and supplied [license.txt](license.txt). It restricts commercial
use, monetization and sublicensing. Keep that license and the notice accessible
with any deployment; this is not a general license for other JARs.

> Original game Miki's World 2 (c) [2006]. Browser port and modifications by
> Sooryakiran P, used under a non-commercial licence.

The supplied license describes a 2006 work, while this archive has 2003
timestamps and identifies version 1.2.2. The license also has an unfilled
governing-law placeholder. Those details are preserved, not independently
authenticated or interpreted as a broader grant.

TeaVM runtime licensing and upstream notices are included in
[TEAVM-LICENSE.txt](TEAVM-LICENSE.txt) and
[THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt).
