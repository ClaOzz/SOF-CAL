/* Structured protocol capture. Mount only with a reviewed source/PDF schema.
 * No example answers, execution dates, names or signatures become defaults.
 */
const ProtocolForm45={
 definitions:{
  sessions:{title:'Sesiones de prueba',singular:'sesión',fields:[['date','Fecha','date'],['responsible','Responsable'],['location','Ubicación'],['observations','Observaciones','textarea']],required:['date','responsible']},
  equipment:{title:'Equipos a verificar',singular:'equipo',fields:[['description','Descripción'],['tag','Identificación / TAG'],['location','Ubicación'],['expected','Cantidad según referencia','number'],['actual','Cantidad verificada','number'],['unit','Unidad'],['result','Resultado','result'],['observations','Observaciones','textarea']],required:['description','actual','result']},
  cables:{title:'Cableado',singular:'cable',fields:[['tag','Identificación del cable'],['type','Tipo / categoría'],['origin','Origen'],['destination','Destino'],['result','Resultado','result'],['observations','Observaciones','textarea']],required:['tag','origin','destination','result']},
  instruments:{title:'Instrumentos utilizados',singular:'instrumento',fields:[['name','Instrumento'],['serial','Serial / identificación'],['certificate','Certificado'],['validUntil','Vigencia','date'],['observations','Observaciones','textarea']],required:['name','serial']},
  measurements:{title:'Mediciones',singular:'medición',fields:[['point','Punto / prueba'],['value','Valor medido'],['unit','Unidad'],['instrument','Instrumento utilizado'],['criterion','Criterio de aceptación'],['result','Resultado','result'],['observations','Observaciones','textarea']],required:['point','value','unit','result']},
  references:{title:'Referencias documentales',singular:'referencia',fields:[['code','Código / nombre'],['revision','Revisión'],['url','Enlace','url'],['observations','Alcance / observaciones','textarea']],required:['code']},
  parameters:{title:'Configuración de la herramienta',singular:'parámetro',fields:[['parameter','Parámetro'],['reference','Referencia / valor'],['observations','Observaciones','textarea']],required:['parameter','reference']},
  acceptance:{title:'Valores de aceptación',singular:'criterio',fields:[['point','Punto'],['criterion','Criterio / comentarios','textarea'],['observations','Observaciones','textarea']],required:['point','criterion']}
 },
 escape(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
 button(label,action,attrs={}){return '<button type="button" class="btn" data-protocol-action="'+this.escape(action)+'" '+Object.entries(attrs).map(([k,v])=>'data-'+k+'="'+this.escape(v)+'"').join(' ')+'>'+this.escape(label)+'</button>';},
 field(label,value,type,attrs={},disabled=false,choices=[]){
  const attributes=Object.entries(attrs).map(([k,v])=>'data-'+k+'="'+this.escape(v)+'"').join(' ')+(disabled?' disabled':'');
  let input;
  if(type==='result'||type==='select'){
   const options=type==='result'?['OK','NOK','PEND','N/A']:choices;
   input='<select '+attributes+'><option value="">Seleccione</option>'+options.map(v=>'<option value="'+this.escape(v)+'"'+(v===value?' selected':'')+'>'+this.escape(v)+'</option>').join('')+'</select>';
  }else if(type==='textarea')input='<textarea '+attributes+' rows="3">'+this.escape(value)+'</textarea>';
  else input='<input type="'+this.escape(type||'text')+'" '+attributes+' value="'+this.escape(value)+'"'+(type==='number'?' min="0" step="any"':'')+'>';
  return '<label class="fld"><span>'+this.escape(label)+'</span>'+input+'</label>';
 },
 tests(model,schema,{offset=0,pageSize=12,editable=true,query='',result=''}={}){
  const all=schema.tests||[];
  const points=all.filter(p=>(!result||(result==='unanswered'?!model.answers[p.id]?.result:model.answers[p.id]?.result===result))&&(!query||JSON.stringify([p.sourceItem,p.description,p.descriptors,p.section]).toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  const start=Math.min(Math.max(0,offset),Math.max(0,Math.floor((points.length-1)/pageSize)*pageSize));
  const totals=ProtocolModel45.totals(model,all.map(p=>p.id));
  let html='<section class="card"><h3>Pruebas y verificaciones</h3><p>'+totals.total+' pruebas · '+(totals.total-totals.unanswered)+' respondidas · '+totals.unanswered+' sin responder</p><p>Seleccione un resultado general por prueba. Los requisitos y procedimientos se conservan como referencia.</p></section>';
  html+=points.slice(start,start+pageSize).map(p=>{
   const a=model.answers[p.id]||{},base={'protocol-point':p.id};
   return '<section class="card"><h4>'+this.escape(p.sourceItem?'Prueba '+p.sourceItem:(p.section||'Verificación'))+'</h4>'+(p.description?'<p>'+this.escape(p.description)+'</p>':'')+(p.descriptors||[]).filter(d=>d.text).map(d=>'<div class="protocol-reference45"><b>'+this.escape(d.label)+'</b><p style="white-space:pre-wrap">'+this.escape(d.text)+'</p></div>').join('')+'<div class="grid2">'+this.field('Resultado',a.result,'result',{...base,'protocol-field':'result'},!editable)+this.field('Fecha de ejecución',a.date,'date',{...base,'protocol-field':'date'},!editable)+((p.responseCells||[]).some(c=>/SEVERIDAD/i.test(c.label))?this.field('Severidad según el criterio del protocolo',a.severity,'text',{...base,'protocol-field':'severity'},!editable):'')+'</div>'+this.field('Observaciones / motivo de N/A',a.observation,'textarea',{...base,'protocol-field':'observation'},!editable)+'</section>';
  }).join('');
  if(!points.length)html+='<section class="card"><p>No hay pruebas con este filtro.</p></section>';
  html+='<section class="card v3-toolbar">'+(start?this.button('Anterior','tests-page',{offset:Math.max(0,start-pageSize)}):'')+'<span>'+Math.min(start+1,points.length)+'–'+Math.min(start+pageSize,points.length)+' de '+points.length+'</span>'+(start+pageSize<points.length?this.button('Siguiente','tests-page',{offset:start+pageSize}):'')+'</section>';
  return html;
 },
 collection(model,key,{editable=true,people=[]}={}){
  const def=this.definitions[key];if(!def)throw Error('Sección de protocolo no disponible.');
  return '<section class="card"><h3>'+def.title+'</h3>'+((model[key]||[]).map((row,index)=>'<article class="v3-block"><h4>'+this.escape(def.singular)+' '+(index+1)+'</h4><fieldset'+(!editable?' disabled':'')+'><div class="grid2">'+def.fields.map(([field,label,type])=>this.field(label,row[field],field==='responsible'&&people.length?'select':type,{'protocol-collection':key,'protocol-row':row.id,'protocol-field':field},!editable,people)).join('')+'</div></fieldset>'+(key==='equipment'&&ProtocolModel45.discrepancy(row)!==null?'<p>Diferencia de cantidad: '+ProtocolModel45.discrepancy(row)+'. El resultado se confirma en campo.</p>':'')+(editable?this.button('Quitar '+def.singular,'remove-row',{collection:key,row:row.id}):'')+'</article>').join('')||'<p>No se han agregado elementos.</p>')+(editable?this.button('Añadir '+def.singular,'add-row',{collection:key}):'')+'</section>';
 },
 updateAnswer(model,schema,pointId,key,value){
  if(!schema.tests.some(p=>p.id===pointId))throw Error('Prueba no disponible en este formato.');
  if(!['result','observation','date','severity'].includes(key))throw Error('Campo de prueba no admitido.');
  if(key==='result'&&value!==''&&!ProtocolModel45.results.includes(value))throw Error('Resultado no válido.');
  model.answers[pointId]={...(model.answers[pointId]||{}),[key]:String(value??'')};
  ProtocolModel45.reconcilePending(model);delete model.reviewedHash;
 },
 updateRow(model,key,id,field,value){
  const def=this.definitions[key];if(!def?.fields.some(f=>f[0]===field))throw Error('Campo de sección no admitido.');
  const row=(model[key]||[]).find(r=>r.id===id);if(!row)throw Error('Elemento no encontrado.');
  if(def.fields.find(f=>f[0]===field)[2]==='result'&&value&&!ProtocolModel45.results.includes(value))throw Error('Resultado no válido.');
  row[field]=String(value??'');delete model.reviewedHash;
 },
 removeRow(model,key,id){if(!this.definitions[key])throw Error('Sección no admitida.');model[key]=(model[key]||[]).filter(r=>r.id!==id);delete model.reviewedHash;},
 errors(model,schema){
  const names=new Map(schema.tests.map(p=>[p.id,p.sourceItem||p.description||p.id]));
  const errors=ProtocolModel45.validate(model,schema.tests.map(p=>p.id)).map(e=>'Prueba '+names.get(e.pointId)+': '+e.message);
  for(const [key,def] of Object.entries(this.definitions))for(const [i,row] of (model[key]||[]).entries()){
   for(const field of def.required)if(!String(row[field]??'').trim())errors.push(def.title+' '+(i+1)+': complete '+def.fields.find(f=>f[0]===field)[1]+'.');
   for(const [field,label,type] of def.fields){const value=row[field];if(type==='number'&&value!==''&&value!=null&&(!Number.isFinite(Number(value))||Number(value)<0))errors.push(def.title+' '+(i+1)+': '+label+' debe ser un número no negativo.');}
  }
  return errors;
 }
};
if(typeof module!=='undefined'&&module.exports)module.exports=ProtocolForm45;
