/** Lee la LME. No ejecuta VBA ni refresca Power Query. */
function main(workbook: ExcelScript.Workbook): string {
 const table=workbook.getTable('T_D220_LME'),inventory=workbook.getTable('Tabla4');
 if(!table||!inventory)throw new Error('Falta T_D220_LME o Tabla4.');
 const range=table.getRangeBetweenHeaderAndTotal(),rows=range.getTexts();
 if(range.getColumnIndex()!==0||rows.some(r=>r.length<41))throw new Error('Cambió la estructura de LME.');
 const names=new Set(inventory.getColumnByName('Documento').getRangeBetweenHeaderAndTotal().getTexts().map(r=>r[0].trim()));
 const sheet=table.getWorksheet(),start=range.getRowIndex();
 const base='https://sofratesapanamainc.sharepoint.com/sites/D220/Documentos%20compartidos/02.CRD/05.%20Areas/8_%20D220%20CONTROL%20DOC/6.%20Documentaci%C3%B3n%20T%C3%A9cnica/03%20Documentos%20T%C3%A9cnicos%20Entregados/';
 const documents=rows.map((r,i)=>{
 const cell=sheet.getCell(start+i,9),h=cell.getHyperlink(),formula=cell.getFormula();let url=h?.address||'';
 if(!url&&names.has(r[25].trim())&&formula.includes('HYPERLINK')&&formula.includes('Tabla4')&&formula.includes('03%20Documentos%20T%C3%A9cnicos%20Entregados/'))url=base+encodeURIComponent(r[25].trim())+'.pdf';
 return {id:r[6].trim(),code:r[6].trim(),title:r[11],status:r[4],bpe:r[5],revision:r[7],date:r[8],ice:r[10],phase:r[12],system:r[13],responsible:r[15],notes:r[20],versionId:r[25],project:'D220',location:r[39]||r[33],type:r[38],asBuilt:r[40],url:/^https:\/\//i.test(url)?url:''};
 }).filter(d=>d.code&&d.title);
 if(new Set(documents.map(d=>d.id)).size!==documents.length)throw new Error('Hay códigos externos duplicados.');
 return JSON.stringify({schema:1,source:'D220-LME',exportedAt:new Date().toISOString(),documents});
}
