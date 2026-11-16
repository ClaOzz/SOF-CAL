/* Importación privada e idempotente de las copias Excel. No se ejecuta al instalar. */
function importCopies43_(u,q){
 adminOnly_(u);setup42_();
 if(!Array.isArray(q.items)||q.items.length>10)throw Error('Máximo 10 registros por lote.');
 const result={inserted:0,skipped:0};
 for(const item of q.items){
  if(!['equipment','quality'].includes(item.module))throw Error('Módulo inválido.');
  const r=item.record;if(!r||!/^xl43_[a-f0-9]{24}$/.test(r.id)||!r.code||!r.source||!['D220','D229'].includes(r.project))throw Error('Registro de importación inválido.');
  if(JSON.stringify(r).length>45000)throw Error('Registro demasiado grande: '+r.code);
  const sheet=item.module==='equipment'?'Equipos_Medicion':'Seguimiento_Calidad',rows=values_(sheet);
  if(rows.some(x=>x[0]===r.id)){result.skipped++;continue;}
  // Existing unrelated central records are never overwritten or silently merged.
  const collision=rows.some(x=>x[1]===r.code&&!String(x[0]).startsWith('xl43_'));
  if(collision)throw Error('Ya existe un registro central con el código '+r.code+'. Revise antes de importar.');
  r.version=1;r.created=r.updated=new Date().toISOString();r.modifiedBy=u.email;r.imported=true;
  append_(sheet,[[r.id,r.code,r.project,item.module==='equipment'?equipmentState42_(r,Utilities.formatDate(new Date(),'America/Santo_Domingo','yyyy-MM-dd')).state:r.state,1,new Date(),JSON.stringify(r)].map(safe_)]);
  append_('Historial42',[[new Date(),u.email,item.module,r.id,1,JSON.stringify(r)]]);result.inserted++;
 }
 if(q.unmatchedActions){
  ensureSheet_('Importacion_Revision43',['ID','Código','Motivo','Datos JSON']);const rows=values_('Importacion_Revision43');
  if(!Array.isArray(q.unmatchedActions)||q.unmatchedActions.length>10)throw Error('Máximo 10 acciones por lote.');
  for(const a of q.unmatchedActions)if(!rows.some(x=>x[0]===a.id))append_('Importacion_Revision43',[[a.id,a.code,'Asociación ambigua o registro no encontrado',JSON.stringify(a)].map(safe_)]);
 }
 return result;
}
