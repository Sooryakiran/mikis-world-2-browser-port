import { cp, mkdir, rename, rm, stat } from 'node:fs/promises';

const files = ['index.html','style.css','app.js','browser-platform.js','ott.js','license.txt','TEAVM-LICENSE.txt','THIRD-PARTY-NOTICES.txt'];
for (const path of [...files, 'public/generated/game.js', 'public/original/manifest.json']) await stat(path);
// Stage first so a failed copy cannot replace a previously usable package.
const stage = '.package-stage';
await mkdir(stage);
try {
  for (const file of files) await cp(file, `${stage}/${file}`);
  await cp('public/generated', `${stage}/generated`, { recursive: true });
  await cp('public/original', `${stage}/original`, { recursive: true });
  await rm('dist', { recursive: true, force: true });
  await rename(stage, 'dist');
} finally {
  await rm(stage, { recursive: true, force: true });
}
console.log('Static website assembled in dist/');
