const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
const back={console};vm.createContext(back);vm.runInContext(read('google/Gestion42.gs'),back);
for(const date of ['basura','2026-02-30','2026-13-01','2026-11-31','']){assert.equal(back.validDate44_(date),false);const s=back.equipmentState42_({nextCalibration:date,certificate:'cert'},'2026-11-06');assert.equal(s.state,'Sin calibración');assert.equal(s.conform,false);}
assert(back.validDate44_('2024-02-29'));assert(!back.validDate44_('2026-02-29'));assert.equal(back.riskScoreForAlerts44_({}),null);assert.equal(back.riskScoreForAlerts44_({probability:4,impact:4,detectability:4}),64);
Object.assign(back,{meta_:()=>({id:'test',kind:'inspeccion'})});vm.runInContext(read('google/Pendientes44.gs'),back);
const p=back.extractPending44_({generales:{g1:{res:'PEND',dato:0,responsable:'Inspector',fechaSeguimiento:'2026-11-10',fotos:['1','2']}},snapshot:{gens:[{id:'g1',txt:'Control general'}]}})[0];assert.equal(p.responsible,'Inspector');assert.equal(p.due,'2026-11-10');assert.equal(p.value,0);assert.equal(p.evidenceCount,2);assert.equal(p.criterion,'Control general');
console.log('PASS fechas imposibles, riesgo desconocido y pendientes con campos reales.');
const marker=new Error('validado');Object.assign(back,{lmeLoad_:()=>{throw marker;}});vm.runInContext(read('google/DocumentacionLME.gs'),back);back.lmeLoad_=()=>{throw marker;};
const payload=url=>({schema:1,source:'D220-LME',exportedAt:'2026-11-06T00:00:00Z',documents:[{id:'x',code:'x',title:'Plano',url}]});
for(const host of ['sofratesapanamainc.sharepoint.com','sofratesapanamainc-my.sharepoint.com'])assert.throws(()=>back.lmeStore_(payload('https://'+host+'/test.pdf')),e=>e===marker);
assert.throws(()=>back.lmeStore_(payload('https://sofratesapanamainc-my.sharepoint.com.evil.test/doc')),/autorizado/);
console.log('PASS enlaces corporativos LME y rechazo de dominio suplantado.');
let resolveFetch;const cloudContext={console,AbortController,setTimeout,clearTimeout,fetch:()=>new Promise(r=>resolveFetch=r)};vm.createContext(cloudContext);vm.runInContext(read('fuentes/cloud.js').split('const cloudInitOriginal=')[0]+';globalThis.cloudTest=Cloud;',cloudContext);const cloud=cloudContext.cloudTest;cloud.config={endpoint:'https://example.invalid'};cloud.session='A';const pending=cloud.api('list');cloud.session='B';resolveFetch({text:async()=>JSON.stringify({ok:true,data:{rows:[]}})});await assert.rejects(pending,/SESION_CAMBIADA/);
console.log('PASS respuesta anterior descartada tras cambiar de cuenta.');
let calls=[],releases={},renders=0;const ctx={console,Cloud:{session:'A',api:(_,p)=>{calls.push(p.module);return new Promise(r=>releases[p.module]=r);}},UI:{busy:()=>({close(){}})},Portal:{page:'hub42'},render:()=>renders++,vToday:()=> '2026-11-06'};vm.createContext(ctx);
const src=read('fuentes/gestion42.js');vm.runInContext(src.slice(0,src.indexOf('ACTIVITIES.push'))+';globalThis.hubTest=Hub42;',ctx);const hub=ctx.hubTest;hub.module='equipment';const a=hub.refresh(),b=hub.refresh();assert.deepEqual(calls,['equipment','boq']);hub.module='quality';releases.equipment({rows:[{id:'equipment'}]});releases.boq({rows:[]});await Promise.all([a,b]);assert.equal(hub.data.equipment[0].id,'equipment');assert.equal(hub.data.quality.length,0);assert.equal(renders,0);
const q=hub.refresh();ctx.Cloud.session='B';releases.quality({rows:[{id:'old-user'}]});await q;assert.equal(hub.data.quality.length,0);
console.log('PASS consultas paralelas sin duplicación, cambio de módulo y descarte de sesión anterior.');
})().catch(e=>{console.error(e);process.exit(1)});
