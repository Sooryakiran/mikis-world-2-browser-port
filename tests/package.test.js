import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

test('static packaging succeeds without a standalone game license file', async () => {
  const root=await mkdtemp(join(tmpdir(),'mikis-package-test-'));
  const inputs=[
    'index.html','style.css','app.js','browser-platform.js','ott.js',
    'TEAVM-LICENSE.txt','THIRD-PARTY-NOTICES.txt',
    'public/generated/game.js','public/original/manifest.json'
  ];
  try {
    for(const file of inputs) {
      await mkdir(dirname(join(root,file)),{recursive:true});
      await writeFile(join(root,file),`fixture: ${file}`);
    }
    const script=fileURLToPath(new URL('../package.mjs',import.meta.url));
    const output=execFileSync(process.execPath,[script],{cwd:root,encoding:'utf8'});
    assert.match(output,/Static website assembled/);
    for(const file of inputs) {
      const target=file.replace(/^public\//,'');
      assert.equal(await readFile(join(root,'dist',target),'utf8'),`fixture: ${file}`);
    }
    for(const name of ['license.txt','licence.txt']) {
      await assert.rejects(access(join(root,name)),{code:'ENOENT'});
      await assert.rejects(access(join(root,'dist',name)),{code:'ENOENT'});
    }
    await assert.rejects(access(join(root,'.package-stage')),{code:'ENOENT'});
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
