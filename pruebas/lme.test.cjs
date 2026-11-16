const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');let sent=0,rows=[[]];
const sheet={getLastRow:()=>rows.length,getRange:()=>({getValues:()=>rows.slice(1)}),appendRow:r=>rows.push(r)};
const c={Set,JSON,Date,Error,String,Array,Number,hash_:s=>s,prop_:k=>k==='LME_SYNC_SECRET'?'x'.repeat(32):'',lock_:f=>f(),safe_:s=>s,book_:()=>({getSheetByName:()=>sheet}),MailApp:{sendEmail:m=>{assert.equal(m.to,'dmontero@sofratesa.com');sent++;}}};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/../google/DocumentacionLME.gs','utf8'),c);
assert.throws(()=>c.lmeSync_({secret:'bad'}),/autorizada/);assert.throws(()=>c.lmeStore_({schema:1,source:'D220-LME',documents:[]}),/inválido/);
const d={id:'DOC1',code:'DOC1',title:'Plano',revision:'V1',url:''},p={schema:1,source:'D220-LME',exportedAt:'2026-10-30T12:00:00Z'};
assert.throws(()=>c.lmeStore_({...p,documents:[d,d]}),/duplicado/);assert.throws(()=>c.lmeStore_({...p,documents:[{...d,url:'https://example.com'}]}),/autorizado/);
c.lmeLoad_=()=>({documents:[d],syncedAt:'2026-10-30'});const u={email:'qa@example.org',name:'QA',role:'calidad'};
assert.throws(()=>c.lmeApi_(u,{mode:'import'}),/Administrador/);assert.equal(c.lmeApi_(u,{mode:'report',id:'DOC1'}).sent,true);assert.equal(c.lmeApi_(u,{mode:'report',id:'DOC1'}).alreadyReported,true);assert.equal(sent,1);
d.url='https://sofratesapanamainc.sharepoint.com/test.pdf';assert.throws(()=>c.lmeApi_(u,{mode:'report',id:'DOC1'}),/existe enlace/);console.log('PASS LME: clave, validación, permisos, destinatario y duplicados; sin correos reales');
