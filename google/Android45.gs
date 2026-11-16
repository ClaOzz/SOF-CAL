/** One-use Android return ticket. The session is never placed in a deep link. */
function androidTarget45_(pending,session){
 if(!pending.nativeChallenge)return prop_('APP_URL').split('#')[0]+'#sofcal_session='+session+'&state='+encodeURIComponent(pending.clientState);
 const ticket=random_();CacheService.getScriptCache().put('android45:'+hash_(ticket),JSON.stringify({session,challenge:pending.nativeChallenge,state:pending.clientState,created:Date.now()}),180);
 return 'sofcal://oauth?ticket='+ticket+'&state='+encodeURIComponent(pending.clientState);
}
function androidExchange45_(req){return lock_(()=>{
 if(!/^[a-f0-9]{64}$/.test(req.ticket||'')||!/^[a-f0-9]{64}$/.test(req.verifier||''))throw Error('Retorno Android inválido.');
 const cache=CacheService.getScriptCache(),key='android45:'+hash_(req.ticket),raw=cache.get(key);if(!raw)throw Error('El acceso Android venció o ya se utilizó.');
 const value=JSON.parse(raw);if(Date.now()-value.created>180000||value.challenge!==hash_(req.verifier)||value.state!==req.state)throw Error('El acceso no corresponde a este dispositivo.');
 cache.remove(key);session_(value.session);return {session:value.session};
});}
