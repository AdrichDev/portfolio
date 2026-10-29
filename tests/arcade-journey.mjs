import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import os from 'node:os';
const require = createRequire(import.meta.url);
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseURL = process.env.BASE_URL || 'http://localhost:3001';
const output = process.env.QA_OUTPUT || path.join(os.tmpdir(), 'portfolio-arcade-qa');
const repositories = ['agents-agency', 'crm_creator', 'gru_orchestrator', 'nexus', 'NumerosLoteria', 'portfolio'];
const removed = ['Swing','Hibernate','RabbitMQ','Power Pages','Power Apps','Power Automate','Navision','Business Central','Eclipse','PyCharm','Firebase Studio','Dataverse'];
(async () => {
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({headless:true, channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    for (const [width,height] of [[320,568],[390,844],[768,1024],[1366,768],[1920,1080],[844,390]]) {
      const page = await browser.newPage({locale:'es-ES',viewport:{width,height}});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
      page.setDefaultTimeout(8000);
      await page.goto(baseURL);
      await page.getByRole('button', {name:'Press Start',exact:true}).waitFor();
      assert.equal(await page.locator('[data-boot-overlay],.boot-spinner').count(),0,'No artificial startup loader');
      assert.equal(await page.locator('[data-cabinet-brand]').count(),0);
      assert.equal(await page.locator('.cabinet-bottom').innerText(),'2026 AdrichDev');
      assert.equal(await page.getByText('Insert Coin',{exact:true}).count(),1);
      assert.equal(await page.getByText('Junior Software Developer',{exact:true}).filter({visible:true}).count(),1);
      assert((await page.locator('.title-screen__story').innerText()).startsWith('Nueva partida. La misma misión: ayudar a resolver problemas a las personas.'));
      assert(!/HUMAN FIRST|A NEW CHAPTER BEGINS|Software Junior Developer/i.test(await page.locator('body').innerText()));
      assert.equal(await page.locator('[data-credits]').innerText(),'05');
      assert.equal(await page.getByText('Conoce al jugador. Recorre su historia y explora su código',{exact:true}).count(),0);
      for(const text of ['Insert Coin']) {
        const blink=page.getByText(text,{exact:true});
        assert.equal(await blink.evaluate(el=>getComputedStyle(el).animationName),'arcade-soft-blink');
        assert(await blink.evaluate(el=>el.getAnimations().some(animation=>animation.playState==='running')));
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal page overflow');
      const start=page.getByRole('button',{name:'Press Start',exact:true});
      const startBox=await start.boundingBox();
      assert(startBox.y+startBox.height<=height, 'START inside viewport');
      assert(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight), 'Intro fits viewport');
      if(width===1366||width===390) await page.screenshot({animations:'disabled',path:path.join(output,`${width}-intro.png`)});
      await start.click();
      await page.getByRole('heading',{name:'Menú principal'}).waitFor();
      assert.equal(await page.getByText('WORLD 01 · MAIN MENU',{exact:true}).count(),0);
      assert.equal(await page.getByText('Elige tu siguiente misión',{exact:true}).count(),0);
      const helper=page.getByText('Conoce al jugador. Recorre su historia y explora su código',{exact:true});
      assert.equal(await helper.evaluate(el=>getComputedStyle(el).animationName),'arcade-soft-blink');
      const menuBoxes=await page.locator('.stage-grid button').evaluateAll(els=>els.map(el=>{const b=el.getBoundingClientRect();const label=el.querySelector('.stage-label').getBoundingClientRect();return {width:b.width,height:b.height,center:b.x+b.width/2,labelCenter:label.x+label.width/2};}));
      assert.equal(menuBoxes.length,5);
      const typography=await page.locator('.stage-grid button').evaluateAll(els=>els.map(el=>{
        const read=node=>{const s=getComputedStyle(node);return [s.fontFamily,s.fontSize,s.fontWeight,s.letterSpacing,s.lineHeight];};
        return {button:read(el),label:read(el.querySelector('.stage-label'))};
      }));
      for(const entry of typography){assert.deepEqual(entry.label,typography[0].label);assert.deepEqual(entry.button,entry.label,'Menu typography owned by shared button rule');}
      assert.equal(await page.locator('[data-cabinet-brand]').innerText(),'portfolio Adrián Chozas');
      for(const box of menuBoxes){assert(Math.abs(box.width-menuBoxes[0].width)<1);assert(Math.abs(box.height-menuBoxes[0].height)<1);assert(Math.abs(box.center-box.labelCenter)<1);}
      if(width>=768 && height>480) assert(menuBoxes[0].height>=60);
      assert(await page.locator('[data-aircraft-scenery]').isVisible());
      assert(await page.locator('[data-aircraft-scenery] .battle-enemy').count()>=3);
      for(const selector of ['.battle-fighter','.battle-enemy','.battle-shot','.battle-explosion']) assert(await page.locator(selector).first().evaluate(el=>el.getAnimations().some(a=>a.playState==='running')),'Animated battle '+selector);
      if(width===390) {
        for(const moment of [0,3500,7000]) {
          await page.locator('.aircraft-world').evaluate((el,time)=>{for(const a of el.getAnimations({subtree:true})){a.pause();a.currentTime=time;}},moment);
          for(const selector of ['.battle-fighter','.battle-enemy']) assert(await page.locator(selector).first().evaluate(el=>{const b=el.getBoundingClientRect();const r=el.parentElement.getBoundingClientRect();return b.right>r.left&&b.left<r.right&&b.bottom>r.top&&b.top<r.bottom;}),'Mobile battle actors stay in scene');
          await page.screenshot({path:path.join(output,`390-battle-${moment}.png`)});
        }
        await page.locator('.aircraft-world').evaluate(el=>{for(const a of el.getAnimations({subtree:true}))a.play();});
      }
      if(width===390) await page.screenshot({animations:'disabled',path:path.join(output,`${width}-home.png`)});
      if(width===1366) {
        await page.screenshot({animations:'disabled',path:path.join(output,`${width}-home.png`)});
        await page.keyboard.press('Tab');
        assert(await page.getByRole('button',{name:'Perfil',exact:true}).evaluate(el=>el===document.activeElement),'Home keyboard entry');
        await page.keyboard.press('Enter');
        await page.getByRole('dialog',{name:'Perfil',exact:true}).waitFor();
        await page.keyboard.press('Escape');
        await page.getByRole('dialog',{name:'Perfil',exact:true}).waitFor({state:'hidden'});
      }
      for (const name of ['Perfil','Experiencia y formación','Proyectos','Contacto']) {
        const opener=page.getByRole('button',{name,exact:true});
        await opener.click();
        const dialog=page.getByRole('dialog'); await dialog.waitFor();
        const animation = await dialog.evaluate(el => el.getAnimations().find(item=>item.id==='button-to-dialog')?.effect.getKeyframes());
        assert(animation?.length >= 2, 'Dialog expands from menu button, not a generic fade');
        assert(animation[0].transform.includes('scale(') && animation[0].transform.includes('translate('), 'Origin includes button scale and offset');
        const sourceBox = await opener.boundingBox();
        const originBox = await dialog.evaluate(el => {
          const expansion = el.getAnimations().find(item=>item.id==='button-to-dialog');
          expansion.pause(); expansion.currentTime=0;
          const rect=el.getBoundingClientRect();
          const result={x:rect.x,y:rect.y,width:rect.width,height:rect.height};
          expansion.play(); return result;
        });
        for(const dimension of ['x','y','width','height']) assert(Math.abs(sourceBox[dimension]-originBox[dimension])<2,'Dialog begins at actual clicked button bounds');
        await dialog.evaluate(el => Promise.all(el.getAnimations({subtree:true}).map(animation => animation.finished)));
        const box=await dialog.boundingBox();
        assert(box.x>=8 && box.y>=8 && box.x+box.width<=width-8 && box.y+box.height<=height-8,'Dialog has inset gutters');
        assert(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth),'No dialog horizontal overflow');
        assert(await opener.evaluate(el => { el.focus(); return document.activeElement !== el; }), 'Background is inert');
        if(name==='Proyectos' && width===1366) await page.screenshot({animations:'disabled',path:path.join(output,'1366-projects-top.png')});
        await page.keyboard.press('Shift+Tab');
        assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'Focus stays in dialog');
        await page.keyboard.press('Tab');
        assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'Focus trapped after Tab');
        if(name==='Perfil') {
          const card=dialog.locator('[data-player-card]');
          const soft = card.locator('[data-skill-card=soft]');
          const hard = card.locator('[data-skill-card=hard]');
          assert.equal(await soft.count(),1); assert.equal(await hard.count(),1);
          const softItems=await soft.locator('li').allTextContents();
          assert(softItems.length<=6);
          assert(softItems.includes('Habilidad comunicativa') && softItems.includes('Empatía profesional') && softItems.includes('Liderazgo'));
          assert(softItems.every(text=>text.length<35 && !text.includes('.')));
          assert((await dialog.innerText()).includes('Trabajador Social durante más de 12 años'));
          assert((await dialog.innerText()).includes('Alegre, entusiasta y apasionado por lo que hago.'));
          for(const label of ['Soft skills','Hard skills','Supabase','SDD','MCPs','GentleAI','Microsoft Power Platform']) assert((await card.innerText()).includes(label),label);
          for(const label of removed) assert(!(await card.innerText()).includes(label),`Removed skill ${label}`);
          assert(!(await dialog.innerText()).includes('Habilidades personales'));
          if(width===1366||width===390) await page.screenshot({animations:'disabled',path:path.join(output,`${width}-profile.png`)});
        }
        if(name==='Experiencia y formación') {
          for(const label of ['EXCELIA','DOMUSVI','ESSIP','Big School','FP Tech Hub Euroformac','Universidad Complutense']) assert((await dialog.innerText()).toLowerCase().includes(label.toLowerCase()), label);
        }
        if(name==='Proyectos') {
          if(width===1366) await page.screenshot({animations:'disabled',path:path.join(output,'1366-projects.png')});
          assert.deepEqual(await dialog.getByRole('link',{name:/Ver código/i}).evaluateAll(els=>els.map(el=>el.href)), repositories.map(repo=>`https://github.com/AdrichDev/${repo}`));
          assert(!/demo/i.test(await dialog.innerText()));
        }
        const scroll=dialog.locator('[data-dialog-scroll]');
        await scroll.evaluate(el=>el.scrollTop=el.scrollHeight);
        assert(await scroll.evaluate(el=>el.scrollHeight-el.scrollTop-el.clientHeight<=2),'All dialog content scrollable');
        if(name==='Experiencia y formación' && width===1366) await page.screenshot({animations:'disabled',path:path.join(output,'1366-experience-end.png')});
        await page.keyboard.press('Escape');
        const closing = await dialog.evaluate(el => {
          const animation=el.getAnimations().find(item=>item.id==='dialog-to-button');
          animation?.pause();
          return {open:el.open,frames:animation?.effect.getKeyframes()};
        });
        assert(closing.open && closing.frames?.length===2,'Modal stays open during reverse animation');
        assert.equal(closing.frames.at(-1).transform,animation[0].transform,'Closing reverses to the same button origin');
        assert(await opener.evaluate(el=>{el.focus();return document.activeElement!==el;}),'Closing dialog keeps background inert');
        await page.keyboard.press('Escape');
        assert.equal(await dialog.evaluate(el=>el.getAnimations().filter(item=>item.id==='dialog-to-button').length),1,'Repeated Escape does not duplicate close');
        await dialog.evaluate(el=>el.getAnimations().find(item=>item.id==='dialog-to-button').play());
        await dialog.waitFor({state:'hidden'});
        assert(await opener.evaluate(el=>document.activeElement===el),'Focus restored');
        if(width===1366) {
          await opener.click();
          await dialog.waitFor();
          assert.equal(await dialog.locator('.phase-title').evaluate(el=>getComputedStyle(el).animationName), 'phase-rise');
          await dialog.getByRole('button',{name:'Volver',exact:true}).click();
          await dialog.waitFor({state:'hidden'});
          assert(await opener.evaluate(el=>document.activeElement===el),'Volver restores focus');
        }
      }
      await page.getByRole('button',{name:'Exit',exact:true}).click();
      await start.waitFor();
      assert.equal(await page.locator('[data-boot-overlay]').count(),0,'Exit never replays loader');
      assert(await start.evaluate(el=>el===document.activeElement),'Exit restores START focus');
      assert.deepEqual(errors, [], 'No browser console or runtime errors');
      await page.close(); console.log(`PASS ${width}x${height}: intro, Home, four inset dialogs, content, focus, scrolling`);
    }
    const reduced=await browser.newPage({locale:'es-ES',reducedMotion:'reduce'});
    await reduced.goto(baseURL);
    for(const text of ['Insert Coin']) assert.equal(await reduced.getByText(text,{exact:true}).evaluate(el=>getComputedStyle(el).animationName),'none');
    await reduced.getByRole('button',{name:'Press Start',exact:true}).click();
    assert.equal(await reduced.locator('.intro-helper').evaluate(el=>getComputedStyle(el).animationName),'none');
    assert.equal(await reduced.locator('.battle-enemy').first().evaluate(el=>getComputedStyle(el).animationName),'none');
    await reduced.getByRole('button',{name:'Proyectos',exact:true}).click();
    assert.equal(await reduced.getByRole('dialog').locator('.phase-title').evaluate(el=>getComputedStyle(el).animationName),'none');
    assert.equal(await reduced.getByRole('dialog').evaluate(el=>el.getAnimations().length),0,'Reduced-motion dialog is static');
    await reduced.close(); console.log('PASS reduced motion');
    const credits = await browser.newPage({locale:'es-ES',reducedMotion:'reduce'});
    await credits.addInitScript(() => {
      window.audioContexts=[];
      const NativeAudioContext=window.AudioContext;
      window.AudioContext=class extends NativeAudioContext {
        constructor(...args){super(...args);window.audioContexts.push(this);}
      };
      window.testHidden=false;
      Object.defineProperty(document,'hidden',{get:()=>window.testHidden,configurable:true});
    });
    await credits.goto(baseURL);
    assert.equal(await credits.evaluate(()=>window.audioContexts.length),0,'No audio before start gesture');
    await credits.getByRole('button',{name:'Activar música',exact:true}).click();
    await credits.waitForFunction(()=>window.audioContexts[0]?.state==='running');
    assert(await credits.getByRole('button',{name:'Press Start',exact:true}).isVisible(),'Intro toggle starts music without consuming a credit');
    for(let remaining=4;remaining>=0;remaining--){
      await credits.getByRole('button',{name:'Press Start',exact:true}).click();
      await credits.getByRole('button',{name:'Exit',exact:true}).click();
      assert.equal(await credits.locator('[data-credits]').innerText(),String(remaining).padStart(2,'0'));
    }
    assert.equal(await credits.getByRole('button',{name:'Press Start',exact:true}).count(),0);
    await credits.getByRole('button',{name:'Insert Coin',exact:true}).click();
    assert.equal(await credits.locator('[data-credits]').innerText(),'01');
    assert(await credits.getByRole('button',{name:'Press Start',exact:true}).isVisible(),'Refill does not start game');
    assert.equal(await credits.evaluate(()=>window.audioContexts.length),1,'Same music context across roundtrips');
    await credits.waitForFunction(()=>window.audioContexts[0].state==='running');
    await credits.getByRole('button',{name:'Silenciar música',exact:true}).click();
    await credits.waitForFunction(()=>window.audioContexts[0].state==='suspended');
    await credits.getByRole('button',{name:'Press Start',exact:true}).click();
    assert.equal(await credits.evaluate(()=>window.audioContexts[0].state),'suspended','Mute survives navigation');
    await credits.getByRole('button',{name:'Perfil',exact:true}).click();
    await credits.getByRole('dialog').getByRole('button',{name:'Activar música',exact:true}).click();
    await credits.waitForFunction(()=>window.audioContexts[0].state==='running');
    await credits.evaluate(()=>{window.testHidden=true;document.dispatchEvent(new Event('visibilitychange'));});
    await credits.waitForFunction(()=>window.audioContexts[0].state==='suspended');
    assert.equal(await credits.locator('[data-aircraft-scenery]').getAttribute('data-paused'),'true');
    await credits.evaluate(()=>{window.testHidden=false;document.dispatchEvent(new Event('visibilitychange'));});
    await credits.waitForFunction(()=>window.audioContexts[0].state==='running');
    await credits.getByRole('dialog').getByRole('button',{name:'Volver',exact:true}).click();
    assert.equal(await credits.evaluate(()=>window.audioContexts.length),1);
    await credits.close(); console.log('PASS credits 5→0/refill, gesture-only audio, mute, modal toggle, background pause/resume');
    const unavailable=await browser.newPage({locale:'es-ES',reducedMotion:'reduce'});
    await unavailable.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});
    await unavailable.goto(baseURL);
    await unavailable.getByRole('button',{name:'Press Start',exact:true}).click();
    assert(await unavailable.getByRole('button',{name:'Música no disponible',exact:true}).isDisabled());
    await unavailable.close();console.log('PASS unavailable audio fallback');
    const tiny = await browser.newPage({locale:'es-ES',viewport:{width:320,height:240},reducedMotion:'reduce'});
    await tiny.goto(baseURL);
    const screen=tiny.locator('.title-screen');
    await screen.evaluate(el => el.scrollTop = el.scrollHeight);
    assert(await screen.evaluate(el => el.scrollHeight-el.scrollTop-el.clientHeight <= 2));
    assert(await tiny.evaluate(() => document.documentElement.scrollHeight <= innerHeight && document.documentElement.scrollWidth <= innerWidth));
    await tiny.getByRole('button',{name:'Press Start',exact:true}).click();
    await tiny.close(); console.log('PASS tiny screen: bounded internal scrolling');
    const noJS = await browser.newPage({locale:'es-ES',javaScriptEnabled:false,viewport:{width:390,height:844}});
    await noJS.goto(baseURL);
    for(const title of ['Ficha de Jugador','Mapa de Niveles','Selecciona Juego','Modo cooperativo']) assert(await noJS.getByRole('heading',{name:title,exact:true}).isVisible());
    assert.equal(await noJS.getByRole('link',{name:/Ver código/i}).count(),6);
    assert(await noJS.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await noJS.close(); console.log('PASS no-JavaScript: four readable sections and six repository links');
    console.log(`Screenshots: ${output}`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
