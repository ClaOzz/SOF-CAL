/* Structured IAT/SAT data. This module does not infer test results from examples. */
const ProtocolModel45={
 results:['OK','NOK','PEND','N/A'],
 collections:['sessions','equipment','cables','instruments','measurements','references','photos','parameters','acceptance'],
 create(templateId,common={}){return {schema:1,templateId,responseScope:'one-per-test',common:{...common},answers:{},sessions:[],equipment:[],cables:[],instruments:[],measurements:[],references:[],photos:[],parameters:[],acceptance:[],pending:[],decision:{result:'',comment:''}};},
 add(model,collection,id,data={}){if(!this.collections.includes(collection))throw Error('Sección no admitida.');if(!id||model[collection].some(x=>x.id===id))throw Error('Identificador duplicado.');const row={...data,id};model[collection].push(row);return row;},
 answer(model,pointId,value,observation=''){if(!pointId||!this.results.includes(value))throw Error('Resultado no válido.');model.answers[pointId]={...(model.answers[pointId]||{}),result:value,observation};this.reconcilePending(model);},
 reconcilePending(model){const previous=new Map(model.pending.map(p=>[p.pointId,p]));model.pending=Object.entries(model.answers).filter(([,a])=>['PEND','NOK'].includes(a.result)).map(([pointId,a])=>({...previous.get(pointId),id:previous.get(pointId)?.id||'point:'+pointId,pointId,result:a.result,observation:a.observation||''}));},
 totals(model,pointIds){const totals={OK:0,NOK:0,PEND:0,'N/A':0,unanswered:0,total:pointIds.length};for(const id of pointIds){const result=model.answers[id]?.result;if(this.results.includes(result))totals[result]++;else totals.unanswered++;}return totals;},
 validate(model,pointIds){const errors=[];for(const id of pointIds){const a=model.answers[id];if(!a||!this.results.includes(a.result)){errors.push({pointId:id,message:'Seleccione el resultado.'});continue;}if(['PEND','NOK','N/A'].includes(a.result)&&!String(a.observation||'').trim())errors.push({pointId:id,message:a.result==='N/A'?'Indique por qué no aplica.':'Describa el pendiente o la desviación.'});}return errors;},
 discrepancy(equipment){const expected=equipment.expected,actual=equipment.actual;if(expected===''||actual===''||expected==null||actual==null)return null;const a=Number(expected),b=Number(actual);return Number.isFinite(a)&&Number.isFinite(b)?b-a:null;}
};
if(typeof module!=='undefined'&&module.exports)module.exports=ProtocolModel45;
