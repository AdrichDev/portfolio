import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root=path.resolve(fileURLToPath(new URL('../exports/portfolio-netlify/',import.meta.url)));
const html=await readFile(path.join(root,'index.html'),'utf8');
assert(!/https?:\/\/(localhost|127\.0\.0\.1)/i.test(html),'No local development origin in exported HTML');
assert(!/data-boot-overlay/.test(html),'No loader in exported HTML');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain'};
const server=createServer(async(req,res)=>{
  try {
    const relative=decodeURIComponent(new URL(req.url,'http://static.test').pathname);
    let file=path.resolve(root,'.'+relative);
    if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    const data=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(data);
  }catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const baseURL=`http://127.0.0.1:${server.address().port}`;
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
try {
  const files=await readdir(root,{recursive:true});
  let assets=0;
  for(const file of files){
    if(/\.(html|txt)$/.test(file)) assert(!/https?:\/\/(localhost|127\.0\.0\.1)/i.test(await readFile(path.join(root,file),'utf8')),'No local origin in '+file);
    if(!/\.(css|js|woff2?|jpg|png|ico)$/.test(file))continue;
    assert.equal((await fetch(`${baseURL}/${file.split(path.sep).join('/')}`)).status,200,file);
    assets++;
  }
  const page=await browser.newPage({locale:'es-ES'});
  const failures=[];const external=[];
  await page.route('**/*',route=>{
    if(new URL(route.request().url()).origin!==baseURL){external.push(route.request().url());return route.abort();}
    return route.continue();
  });
  page.on('pageerror',error=>failures.push(error.message));
  page.on('console',message=>{if(message.type()==='error')failures.push(message.text());});
  page.on('response',response=>{if(response.status()>=400)failures.push(`${response.status()} ${response.url()}`);});
  await page.goto(baseURL);
  await page.getByRole('button',{name:'Activar música',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-music-state]')?.dataset.musicState==='playing');
  await page.getByRole('button',{name:'Press Start',exact:true}).click();
  await page.getByRole('button',{name:'Perfil',exact:true}).click();
  await page.getByRole('dialog').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  assert(await page.locator('img').evaluateAll(els=>els.every(el=>el.complete&&el.naturalWidth>0)),'Portrait loaded');
  assert(await page.evaluate(()=>[...document.fonts].filter(font=>font.status==='loaded').length>=2),'Local pixel and mono fonts loaded');
  assert.deepEqual(external,[],'Site works without external runtime assets');
  assert.deepEqual(failures,[],'Static runtime is error-free');
  await page.close();
  console.log(`PASS static artifact: ${assets} assets HTTP 200; local fonts/portrait; no external requests or errors; music/menu/dialog work`);
  await new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,[fileURLToPath(new URL('./arcade-journey.mjs',import.meta.url))],{
      env:{...process.env,BASE_URL:baseURL,QA_OUTPUT:path.join(os.tmpdir(),'portfolio-static-qa')},stdio:'inherit',
    });
    child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(`Static journey exited ${code}`)));
  });
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
