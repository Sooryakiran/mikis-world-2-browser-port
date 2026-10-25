import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const preview = process.argv.includes('--preview');
const base = preview ? join(root, 'dist') : root;
const port = Number(process.env.PORT ?? (preview ? 4175 : 4173));
const files = new Set(['index.html','style.css','app.js','browser-platform.js','ott.js','license.txt','TEAVM-LICENSE.txt','THIRD-PARTY-NOTICES.txt']);
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.txt':'text/plain; charset=utf-8' };
if (preview) {
  for (const name of ['index.html','generated/game.js','original/manifest.json']) {
    try { await stat(join(base, name)); }
    catch (error) { throw new Error(`Preview requires dist/${name}. Run npm run package first.`, { cause: error }); }
  }
}
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).slice(1) || 'index.html';
    if (!files.has(path) && !/^generated\/game\.js(?:\.map)?$/.test(path)
        && !/^original\/[A-Za-z0-9_.-]+$/.test(path)) {
      response.writeHead(404).end('Not found'); return;
    }
    const source = !preview && /^(original|generated)\//.test(path) ? join(base, 'public', path) : resolve(base, path);
    const bytes = await readFile(source);
    response.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    response.end(bytes);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') response.writeHead(404).end('Not found');
    else {
      console.error(error);
      response.writeHead(500).end('Server error');
    }
  }
}).listen(port, '127.0.0.1', () => console.log(`Miki's World 2 ${preview ? 'preview' : 'development'}: http://127.0.0.1:${port}`));
