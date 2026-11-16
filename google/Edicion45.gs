/* Authenticated reopening requests; server row is the authority. */
function editAccess45_(u,q){
 const sh=ensureSheet_('_Edicion45',['ID','Registro','Solicitante','Estado','Motivo','Fecha','Administrador','Revisado','Avisados JSON']),rows=values_('_Edicion45');
 if(q.mode==='list'){adminOnly_(u);return {rows:rows.filter(r=>r[3]==='Pendiente').map(r=>({id:r[0],recordId:r[1],email:r[2],reason:r[4],at:r[5],code:recordRow_(r[1])?.values[2]||r[1]}))};}
 const row=recordRow_(q.id);if(!row||row.values[9]==='Eliminado')throw Error('Registro no disponible.');
 if(q.mode==='request'){
  if(row.values[8]!==u.email)throw Error('Solo el autor puede solicitar la reapertura.');if(row.values[9]!=='Finalizada')throw Error('Solo se solicita permiso para registros finalizados.');
  const reason=String(q.reason||'').trim();if(!reason||reason.length>2000)throw Error('Indique el motivo (máximo 2000 caracteres).');
  let item=rows.find(r=>r[1]===q.id&&r[2]===u.email&&r[3]==='Pendiente');if(!item){item=[random_(),q.id,u.email,'Pendiente',reason,new Date(),'','','[]'];append_('_Edicion45',[item]);rows.push(item);}
  const index=rows.indexOf(item)+2, sent=JSON.parse(item[8]||'[]'),errors=[];
  for(const email of adminsRegistros44_()){if(sent.includes(email))continue;try{MailApp.sendEmail({to:email,subject:'SOF-CAL · Solicitud de edición '+row.values[2],body:'El autor '+u.name+' ('+u.email+') solicita reabrir '+row.values[2]+'.\n\nMotivo: '+item[4]+'\n\nRevise en Ajustes → Usuarios y perfiles → Solicitudes de edición.\n'+prop_('APP_URL')});sent.push(email);sh.getRange(index,9).setValue(JSON.stringify(sent));}catch(e){errors.push(String(e.message));}}
  return {requested:true,notified:sent.length,warning:errors.length?'Solicitud guardada; el correo no pudo enviarse a todos los administradores.':!sent.length?'Solicitud guardada; no hay administradores activos con correo configurado.':''};
 }
 adminOnly_(u);const n=rows.findIndex(r=>r[0]===q.requestId&&r[1]===q.id);if(n<0||rows[n][3]!=='Pendiente')throw Error('Solicitud ya atendida o inexistente.');
 if(q.mode==='approve'){if(row.values[9]!=='Finalizada')throw Error('El estado ha cambiado; actualice la lista.');const record=readRecord_(row);if(record.uuid)record.estado='Borrador';else record.state='Borrador';delete record._readOnly;record.reopened45={by:u.email,at:new Date().toISOString(),reason:rows[n][4]};save_(u,{record,baseVersion:row.values[10],requestId:'reopen-'+rows[n][0]});}
 else if(q.mode!=='reject')throw Error('Operación no admitida.');
 sh.getRange(n+2,4).setValue(q.mode==='approve'?'Aprobada':'Rechazada');sh.getRange(n+2,7,1,2).setValues([[u.email,new Date()]]);append_('Auditoria',[[new Date(),u.email,'SOLICITUD_EDICION_'+q.mode,q.id,row.values[2],row.values[10]]]);return {saved:true};
}
function renumber45_(u,q){const r=q.record,m=meta_(r);allowed_(u,m.kind);if(recordRow_(m.id))throw Error('El registro ya está en la base central. Descargue su versión vigente; no se renumeran documentos registrados.');const rows=values_('_Reservas'),n=rows.findIndex(x=>x[0]===m.id);if(n>=0){if(rows[n][3]!==u.sub&&u.role!=='admin')throw Error('No puede cambiar la reserva de otro usuario.');book_().getSheetByName('_Reservas').getRange(n+2,1).setValue('retirada-'+random_());append_('Auditoria',[[new Date(),u.email,'CAMBIAR_RESERVA',m.id,rows[n][1],'']]);}return reserve_(u,q);}
function renewSession45_(u,q){const key=hash_(q.session),rows=values_('_Sesiones42'),n=rows.findIndex(r=>r[0]===key);if(n<0||rows[n][3]==='Revocada'||Number(rows[n][2])<=Date.now())throw Error('SESION: inicie sesión de nuevo.');const expires=Date.now()+SESSION_TTL44_MS;book_().getSheetByName('_Sesiones42').getRange(n+2,3).setValue(expires);return {expires};}
