const assert=require('node:assert/strict');
const catalog=require('../fuentes/protocol-catalog45.json');
const pda=require('../fuentes/protocol-pda-full45.json');
const scadi=catalog.templates.find(t=>t.id==='566cef41faee');
assert.equal(scadi.tests.length,156);
assert.equal(new Set(scadi.tests.map(p=>p.sourceItem)).size,156);
assert.ok(scadi.tests.every(p=>p.sourcePage>=37&&p.sourcePage<=55));
assert.ok(scadi.sections.filter(p=>p.page>=22&&p.page<=36).every(p=>p.captureEnabled===false&&p.testIds.length===0));
const source=catalog.templates.find(t=>t.id==='7168df7e9878');
assert.deepEqual(source.tests.map(p=>+p.sourceItem),Array.from({length:155},(_,i)=>i+1));
assert.equal(source.partialPdfTests.length,5);
assert.deepEqual(pda.tests.map(p=>p.id),source.tests.map(p=>p.id));
assert.equal(new Set(pda.tests.map(p=>p.id)).size,155);
for(const point of pda.tests){
 assert.equal(point.defaultResult,'');
 const page=pda.pages[point.sourcePage-1];
 for(const cell of point.responseCells){const [x,y,x2,y2]=cell.box;assert.ok(x>=0&&y>=0&&x2>x&&y2>y&&x2<=page.w&&y2<=page.h);}
}
assert.equal(pda.tests.find(p=>p.sourceItem==='133').segments.length,2);
assert.equal(pda.exportMappingReady,false); // Collection/signature placement remains under review.
console.log('PASS protocolos: 156 pruebas SCADI new, old excluido, 155 pruebas PDA sin filtro, paginación y resultados inicialmente vacíos.');
