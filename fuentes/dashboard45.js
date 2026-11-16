/* Dashboard scope is separate from history filters and resets on account changes. */
const DashboardScope45={
 key:null,selection:'mine',
 email(v){return String(v||'').trim().toLowerCase();},
 ensure(user){const key=this.email(user?.email)+'|'+(user?.role||'');if(this.key!==key){this.key=key;this.selection=user?.role==='admin'?'all':'mine';}return this.selection;},
 reset(user){this.key=null;return this.ensure(user);},
 select(user,value){this.ensure(user);if(value!=='mine'&&value!=='all'&&!value.startsWith('email:'))throw Error('Filtro de usuario no válido.');this.selection=value;},
 rows(rows,user){const choice=this.ensure(user);if(choice==='all')return rows;const target=choice==='mine'?this.email(user?.email):this.email(choice.slice(6));if(!target)return [];return rows.filter(r=>this.email(r.email||r._cloudOwner||r._localOwner)===target);},
 label(user){const choice=this.ensure(user);return choice==='mine'?'Mis indicadores':choice==='all'?'Indicadores del equipo':choice.slice(6);}
};
if(typeof module!=='undefined'&&module.exports)module.exports=DashboardScope45;
