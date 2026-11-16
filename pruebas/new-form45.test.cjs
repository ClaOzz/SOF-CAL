const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const saved=[],noop=()=>{};
const ctx={console,structuredClone,Set,Array,Object,String,Number,Error,Portal:{person:'Ana',role:'calidad',templates:[],assert:noop,save:async function(){saved.push(structuredClone(this.record));}},Access45:{email:()=> 'ana@example.invalid',editable:()=>true},uuid:()=> 'new-form-id-45',vToday:()=> '2026-11-13',nowISO:()=> '2026-11-13T12:00:00Z',render:noop,newActivity:async()=>{},AutoProject:{apply:r=>{r.project=r.system==='PDA'?'D229':'D220'},get:s=>({PDA:'D229',ASC:'D220'}[s]),check:noop},CAT:{systems:[{cod:'PDA'},{cod:'ASC'}]},FormEditor:{errors:()=>[],template:()=>null},vf:noop,esc:s=>s,document:{addEventListener:noop},autofill45:r=>{r.system=r.kind==='sat'?'PDA':'ASC';r.responsible='Ana';},systemChoices:()=>[]};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../fuentes/integration45.js'),'utf8'),ctx);
const source=fs.readFileSync(path.join(__dirname,'../fuentes/portal.js'),'utf8');
const method=source.slice(source.indexOf(' async newForm('),source.indexOf(' async open(')).trim().replace(/,$/,'');
ctx.Portal.newForm=vm.runInContext('({'+method+'}).newForm',ctx);
(async()=>{
 ctx.Portal.templates=[{id:'sat-template',kind:'sat',short:'SAT PDA',name:'SAT PDA.pdf',sha256:'test'}];
 await ctx.Portal.newForm('sat-template');
 assert.equal(saved.length,1);assert.equal(saved[0]._localOwner,'ana@example.invalid');assert.equal(saved[0].responsible,'Ana');assert.equal(saved[0].system,'INT');assert.equal(saved[0].project,'D229');assert.deepEqual(saved[0].integratedSystems,['PDA']);assert.equal(saved[0].integration45,true);
 const old={kind:'sat',code:'SAT-D229-PDA-001',system:'PDA'};ctx.old=old;vm.runInContext('Integration45.initialize(old)',ctx);assert.equal(old.integration45,undefined);assert.equal(old.system,'PDA');
 ctx.Portal.templates.push({id:'iat-template',kind:'iat',name:'IAT ASC.pdf'});await ctx.Portal.newForm('iat-template');assert.equal(saved[1].system,'ASC');assert.equal(saved[1].integration45,undefined);
 console.log('PASS ruta Completar formato: autor, autollenado y SAT INT antes del primer guardado; formatos IAT y códigos anteriores conservados.');
})().catch(e=>{console.error(e);process.exitCode=1});
