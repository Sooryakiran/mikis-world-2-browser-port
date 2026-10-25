import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 40000,
  use: { baseURL: 'http://127.0.0.1:4174', headless: true },
  webServer: {
    command: process.env.MIKI_PREVIEW === '1' ? 'node server.mjs --preview' : 'node server.mjs',
    url: 'http://127.0.0.1:4174',
    env: { PORT:'4174' },
    reuseExistingServer: false
  },
  projects: [
    { name:'desktop', use: { viewport:{width:1280,height:800} } },
    { name:'mobile', use: { viewport:{width:390,height:844}, hasTouch:true, isMobile:true } },
    { name:'landscape', use: { viewport:{width:844,height:390}, hasTouch:true, isMobile:true } }
  ]
});
