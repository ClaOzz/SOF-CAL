/* Consulta compartida, paginada y de solo lectura. La fuente sigue siendo el registro original. */
function extractPending44_(r){
 const m=meta_(r),out=[],base={recordId:m.id,code:m.code,kind:m.kind,project:m.project,system:m.system,location:m.location,inspector:m.responsible,date:m.date};
 const add=(id,label,a)=>{if(!['PEND','NOK','Pendiente','En curso','Cerrado'].includes(a.res||a.state))return;out.push({...base,id:m.id+'|'+id,point:id,criterion:label||id,state:a.res||a.state,comment:a.obs||a.comment||'',value:a.dato??'',unit:a.uni||'',responsible:a.responsable||a.responsible||'',due:a.fechaSeguimiento||a.due||'',evidenceCount:Array.isArray(a.fotos)?a.fotos.length:Number(a.fotos)||0});};
 if(m.kind==='inspeccion')for(const [group,points] of [['generales',r.snapshot?.gens||[]],['respuestas',r.snapshot?.points||[]]])for(const [id,a] of Object.entries(r[group]||{})){const p=points.find(p=>p.id===id)||{};add(id,p.cri||p.ins||p.ele||p.txt,a||{});}
 if(m.kind==='liberacion'){
  for(const p of r.pendingItems44||[])add(p.id,p.title,p);
  for(const [id,value] of Object.entries(r.fields||{}))if(['PEND','NOK','Pendiente'].includes(String(value).trim()))add('campo:'+id,'Campo del formato: '+id,{res:String(value).trim(),obs:r.observations||r.notes||''});
 }
 return out;
}
function pendingList44_(u,q){
 const rows=values_('Registros').filter(r=>r[9]!=='Eliminado'&&['inspeccion','liberacion'].includes(r[1])),offset=Math.max(0,Number(q.offset)||0),limit=15,items=[],errors=[];
 for(const row of rows.slice(offset,offset+limit)){try{items.push(...extractPending44_(readRecord_({values:row})));}catch(e){errors.push({id:row[0],code:row[2],error:'No se pudo leer el registro de origen.'});}}
 return {items,errors,totalRecords:rows.length,next:offset+limit<rows.length?offset+limit:null};
}
