import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = readFileSync(new URL('../src/shared/lib/arcade-music.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;

function harness({available=true,delayResume=false}={}) {
  const contexts=[];
  const timers=new Set();
  const statuses=[];
  const param = () => ({setValueAtTime(value){this.value=value;},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}});
  class Context {
    currentTime=0;
    state='suspended';
    destination={};
    oscillators=[];
    constructor(){contexts.push(this);}
    createGain(){return {gain:param(),connect(){},disconnect(){}};}
    createBiquadFilter(){return {frequency:param(),connect(){}};}
    createOscillator(){
      const oscillator={frequency:param(),connect(){},disconnect(){},start(){this.started=true;},stop(time){if(time===undefined)this.stopped=true;}};
      this.oscillators.push(oscillator);return oscillator;
    }
    resume(){this.state='running';return delayResume?new Promise(resolve=>this.finishResume=resolve):Promise.resolve();}
    suspend(){this.state='suspended';return Promise.resolve();}
    close(){this.state='closed';return Promise.resolve();}
  }
  const sandbox={exports:{},window:{AudioContext:available?Context:undefined},setInterval(callback){timers.add(callback);return callback;},clearInterval(callback){timers.delete(callback);}};
  vm.runInNewContext(compiled,sandbox);
  const engine=new sandbox.exports.ArcadeMusic(status=>statuses.push(status));
  return {engine,contexts,timers,statuses};
}

test('music is gesture-started, bounded, and retains its sequence across mute/visibility',async()=>{
  const {engine,contexts,timers,statuses}=harness();
  assert.equal(contexts.length,0);
  engine.setEnabled(false);engine.setEnabled(true);
  assert.equal(contexts.length,0,'Toggling before Press Start cannot create audio');
  engine.start(true);await Promise.resolve();
  const context=contexts[0];
  assert.equal(context.state,'running');
  assert.equal(timers.size,1);
  assert(context.oscillators.every(voice=>voice.started));
  const firstFrequency=context.oscillators[0].frequency.value;
  engine.start(true);await Promise.resolve();
  assert.equal(contexts.length,1);assert.equal(timers.size,1);
  engine.setEnabled(false);
  assert.equal(context.state,'suspended');assert.equal(timers.size,0);
  assert(context.oscillators.every(voice=>voice.stopped));
  engine.setEnabled(true);await Promise.resolve();
  assert.notEqual(context.oscillators.at(-1).frequency.value,firstFrequency,'Resume continues melody rather than restarting');
  engine.setVisible(false);
  assert.equal(context.state,'suspended');assert.equal(timers.size,0);
  engine.setVisible(true);await Promise.resolve();
  assert.equal(context.state,'running');assert.equal(timers.size,1);
  engine.dispose();
  assert.equal(context.state,'closed');assert.equal(timers.size,0);
  assert(context.oscillators.every(voice=>voice.stopped));
  assert(statuses.includes('playing')&&statuses.includes('muted')&&statuses.includes('paused'));
});

test('unmount invalidates a pending resume and leaves no scheduler',async()=>{
  const {engine,contexts,timers}=harness({delayResume:true});
  engine.start(true);engine.dispose();
  contexts[0].finishResume();await Promise.resolve();
  assert.equal(contexts[0].state,'closed');assert.equal(timers.size,0);
  assert.equal(contexts[0].oscillators.length,0);
});

test('unavailable audio reports a fallback without throwing',()=>{
  const {engine,contexts,statuses}=harness({available:false});
  assert.doesNotThrow(()=>engine.start(true));
  assert.equal(contexts.length,0);assert.equal(statuses.at(-1),'unavailable');
  engine.dispose();
});
