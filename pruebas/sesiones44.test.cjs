const fs=require('fs'),vm=require('vm'),assert=require('assert');
let time=1800000000000,rows=[],writes=0,active=true;const c={Date:{now:()=>time},console,CacheService:{getScriptCache:()=>({get:()=>null,remove:()=>{}})}};
vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/../google/Code.gs','utf8'),c);c.hash_=v=>v;c.values_=()=>rows;c.ensureSheet_=()=>{};c.append_=(_,r)=>rows.push(...r);c.user_=id=>{if(!active)throw Error('ACCESO_DENEGADO');return id};c.book_=()=>({getSheetByName:()=>({getRange:(r,col)=>({setValue:v=>{rows[r-2][col-1]=v;writes++}})})});
const token='a'.repeat(64),u={email:'qa@example.invalid',sub:'qa'};c.persistSession42_(token,u);const expiry=rows[0][2];assert.equal(expiry,time+8*3600000);time+=3600000;c.session_(token);assert.equal(rows[0][2],expiry);assert.equal(writes,0);time=expiry;assert.throws(()=>c.session_(token),/vencida/);
time-=1;rows[0][3]='Revocada';assert.throws(()=>c.session_(token),/revocada/);rows[0][3]='Activa';active=false;assert.throws(()=>c.session_(token),/ACCESO/);active=true;
rows[0][2]=time+30*86400000;c.session_(token);assert.equal(rows[0][2],time+8*3600000);assert.equal(writes,1);time+=1000;c.session_(token);assert.equal(writes,1);rows[0][2]='bad';assert.throws(()=>c.session_(token),/vencida/);
console.log('PASS sesión de 8 h, límite exacto, sin renovación por actividad, revocación, usuario desactivado y reducción de sesiones anteriores.');

vm.runInContext(fs.readFileSync(__dirname+'/../google/Edicion45.gs','utf8'),c);
rows[0][2]=time+1000; const renewed=c.renewSession45_(u,{session:token});
assert.equal(renewed.expires,time+8*3600000);assert.equal(rows[0][2],renewed.expires);
time+=3600000;c.session_(token);assert.equal(rows[0][2],renewed.expires);
time=renewed.expires;assert.throws(()=>c.renewSession45_(u,{session:token}),/SESION/);
rows[0][2]=time+1000;rows[0][3]='Revocada';assert.throws(()=>c.renewSession45_(u,{session:token}),/SESION/);
console.log('PASS 4.5 renovación explícita por interacción: otras 8 horas, consultas no renuevan y no revive sesiones vencidas/revocadas.');
