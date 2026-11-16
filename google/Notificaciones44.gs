/* New shared records: asynchronous admin email summaries, separate from calibration alerts. */
const NOTIFY44_SHEET='_Avisos_Registros44';
function adminsRegistros44_(){return [...new Set(values_('Usuarios').filter(r=>['SI','SÍ','TRUE','1'].includes(String(r[3]).trim().toUpperCase())&&['admin','admin_calidad'].includes(String(r[2]).trim())).map(r=>String(r[0]).trim().toLowerCase()).filter(e=>/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(e)))];}
// Recipient configuration is separate from administrator identities and edit requests.
function validarCorreosRegistros452_(input){
 if(typeof input!=='string'&&!Array.isArray(input))throw Error('Ingrese los correos de los destinatarios.');
 const emails=[...new Set((Array.isArray(input)?input.join('\n'):input).split(/[\s,;]+/).map(e=>e.trim().toLowerCase()).filter(Boolean))];
 const invalid=emails.filter(e=>e.length>254||!/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(e)||e.startsWith('.')||e.includes('..')||e.includes('.@'));
 if(invalid.length)throw Error('Revise estos correos: '+invalid.join(', '));
 if(emails.length>100||JSON.stringify(emails).length>8000)throw Error('La lista admite hasta 100 correos y 8.000 caracteres.');return emails;
}
function destinatariosRegistros452_(){const raw=prop_('REGISTROS_DESTINATARIOS452',true);if(!raw)return adminsRegistros44_();return validarCorreosRegistros452_(JSON.parse(raw));}
function estadoAvisos452_(){return {enabled:prop_('REGISTROS_AVISOS44',true)==='SI',recipients:destinatariosRegistros452_(),custom:!!prop_('REGISTROS_DESTINATARIOS452',true),intervalMinutes:5};}
function guardarDestinatarios452_(u,q){adminOnly_(u);return lock_(()=>{const emails=validarCorreosRegistros452_(q.recipients);if(!emails.length&&prop_('REGISTROS_AVISOS44',true)==='SI')throw Error('Deje al menos un correo o desactive los avisos antes de vaciar la lista.');PropertiesService.getScriptProperties().setProperty('REGISTROS_DESTINATARIOS452',JSON.stringify(emails));PropertiesService.getScriptProperties().setProperty('REGISTROS_DESTINATARIOS452_CAMBIO',JSON.stringify({by:u.email,at:new Date().toISOString()}));return estadoAvisos452_();});}
function registrosParaAviso44_(){
 const result=values_('Registros').filter(r=>r[0]&&r[9]!=='Eliminado').map(r=>({key:'Registros|'+r[0],id:r[0],code:r[2],kind:SOF_SECTIONS[r[1]]||r[1],project:r[4],system:r[5],author:r[7],email:r[8],date:String(r[11])}));
 for(const [sheet,label] of [['Equipos_Medicion','Equipos de medición'],['Seguimiento_Calidad','Seguimiento FNC/FHC'],['BoQ_Equipos','BoQ de equipos']])for(const r of values_(sheet)){if(!r[0]||r[3]==='Eliminado')continue;let data={};try{data=JSON.parse(r[6]||'{}');}catch{}result.push({key:sheet+'|'+r[0],id:r[0],code:r[1],kind:label,project:r[2],system:data.system||'',author:data.modifiedBy||'',email:data.modifiedBy||'',date:String(r[5])});}return result;
}
function setupAvisos44_(){ensureSheet_(NOTIFY44_SHEET,['Clave','Detectado','Datos JSON','Estado','Enviados JSON','Último intento','Error']);}
function activarNotificacionesRegistros44(){return lock_(()=>{
 const admins=destinatariosRegistros452_();if(!admins.length)throw Error('Agregue al menos un correo válido en Avisos de registros nuevos → Editar correos.');
 setupAvisos44_();const props=PropertiesService.getScriptProperties();
 if(props.getProperty('REGISTROS_AVISOS44')!=='SI'){
  const known=new Set(values_(NOTIFY44_SHEET).map(r=>r[0]));const baseline=registrosParaAviso44_().filter(r=>!known.has(r.key));append_(NOTIFY44_SHEET,baseline.map(r=>[r.key,new Date(),'','Anterior a activación','[]','','']));
 }
 if(!ScriptApp.getProjectTriggers().some(t=>t.getHandlerFunction()==='notificarRegistros44'))ScriptApp.newTrigger('notificarRegistros44').timeBased().everyMinutes(5).create();
 props.setProperty('REGISTROS_AVISOS44','SI');return {enabled:true,recipients:admins,intervalMinutes:5};
});}
function desactivarNotificacionesRegistros44(){return lock_(()=>{PropertiesService.getScriptProperties().setProperty('REGISTROS_AVISOS44','NO');for(const t of ScriptApp.getProjectTriggers())if(t.getHandlerFunction()==='notificarRegistros44')ScriptApp.deleteTrigger(t);return {enabled:false};});}
function notificacionesRegistrosApi44_(u,q){adminOnly_(u);if(q.mode==='saveRecipients')return guardarDestinatarios452_(u,q);if(q.mode==='activate')return activarNotificacionesRegistros44();if(q.mode==='deactivate')return desactivarNotificacionesRegistros44();return estadoAvisos452_();}
function notificarRegistros44(){
 if(prop_('REGISTROS_AVISOS44',true)!=='SI')return;
 return lock_(()=>{
  setupAvisos44_();let queue=values_(NOTIFY44_SHEET);const known=new Set(queue.map(r=>r[0]));
  const fresh=registrosParaAviso44_().filter(r=>!known.has(r.key));append_(NOTIFY44_SHEET,fresh.map(r=>[r.key,new Date(),JSON.stringify(r),'Pendiente','[]','','']));
  queue=values_(NOTIFY44_SHEET);const admins=destinatariosRegistros452_();if(!admins.length)return;
  const pending=queue.map((r,i)=>({r,index:i+2})).filter(x=>['Pendiente','Error'].includes(x.r[3])).slice(0,50);
  const sheet=book_().getSheetByName(NOTIFY44_SHEET);
  const sent=row=>{try{return JSON.parse(row[4]||'[]');}catch{return [];}};
  for(const email of admins){if(MailApp.getRemainingDailyQuota()<1)break;const items=pending.filter(x=>!sent(x.r).includes(email));if(!items.length)continue;
   const text=items.map(x=>{const d=JSON.parse(x.r[2]);return [d.code||d.id,'Función: '+d.kind,'Proyecto / sistema: '+[d.project,d.system].filter(Boolean).join(' / '),'Registrado por: '+[d.author,d.email].filter(Boolean).join(' · '),'Fecha: '+d.date].join('\n');}).join('\n\n');
   try{MailApp.sendEmail({to:email,subject:'SOF-CAL · '+items.length+' registro(s) nuevo(s)',body:'Se han incorporado registros a la base compartida:\n\n'+text+'\n\nConsultar en SOF-CAL: '+prop_('APP_URL')+'\n\nEste aviso confirma recepción; no constituye aprobación de Calidad.'});
    for(const x of items){x.r[4]=JSON.stringify([...sent(x.r),email]);x.r[5]=new Date();x.r[6]='';sheet.getRange(x.index,5,1,3).setValues([[x.r[4],x.r[5],x.r[6]]]);}
   }catch(e){for(const x of items){x.r[3]='Error';sheet.getRange(x.index,4).setValue('Error');sheet.getRange(x.index,6,1,2).setValues([[new Date(),safe_(String(e.message).slice(0,1000))]]);}}
  }
  for(const x of pending)if(admins.every(email=>sent(x.r).includes(email)))sheet.getRange(x.index,4).setValue('Enviado');
  return {detected:fresh.length,processed:pending.length};
 });
}
