import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const ts = require('typescript');
const source = readFileSync(new URL('../src/shared/lib/arcade-music.ts',import.meta.url),'utf8');
const compiled = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
try {
  const page = await browser.newPage({locale:'es-ES'});
  const signal = await page.evaluate(async code => {
    let clock=0;
    let context;
    const timers=new Set();
    function OfflineFactory() {
      context=new OfflineAudioContext(1,Math.ceil(44100*8.5),44100);
      Object.defineProperties(context,{
        currentTime:{get:()=>clock},state:{get:()=> 'running'},
        resume:{value:()=>Promise.resolve()},suspend:{value:()=>Promise.resolve()},close:{value:()=>Promise.resolve()},
      });
      return context;
    }
    const factory=new Function('window','setInterval','clearInterval','exports',`${code}; return exports.ArcadeMusic;`);
    const Music=factory({AudioContext:OfflineFactory},callback=>{timers.add(callback);return callback;},callback=>timers.delete(callback),{});
    const engine=new Music(()=>{});
    engine.start(true);await Promise.resolve();
    for(clock=0.04;clock<7.36;clock+=0.04) for(const callback of timers) callback();
    const buffer=await context.startRendering();
    const samples=buffer.getChannelData(0);
    let squares=0,peak=0;
    for(const value of samples){squares+=value*value;peak=Math.max(peak,Math.abs(value));}
    const rms=Math.sqrt(squares/samples.length);
    engine.dispose();
    return {rms,peak,rmsDbFS:20*Math.log10(rms),peakDbFS:20*Math.log10(peak),samples:samples.length};
  },compiled);
  console.log('Rendered production synth:',JSON.stringify(signal));
  assert(signal.rms>=0.012 && signal.rms<=0.08,'Music output should be moderate, not near-silent');
  assert(signal.peak>0.04 && signal.peak<0.35,'Music has audible signal and ample clipping headroom');
  console.log('PASS real OfflineAudioContext output level');
} finally {await browser.close();}
