/* Original-page protocol rendering. Long observations continue on a copy of
 * the source page instead of being truncated or forcing unreadable text. */
const ProtocolExport45={
 wrap(text,font,width,size=8){
  if(!(width>0))throw Error('El campo no tiene un ancho válido.');
  const lines=[];
  for(const paragraph of String(text??'').replace(/\r\n?/g,'\n').split('\n')){
   let line='';
   for(const word of paragraph.split(/\s+/).filter(Boolean)){
    if(line&&font.widthOfTextAtSize(line+' '+word,size)<=width){line+=' '+word;continue;}
    if(line){lines.push(line);line='';}
    let part='';
    for(const char of word){
     if(part&&font.widthOfTextAtSize(part+char,size)>width){lines.push(part);part='';}
     if(font.widthOfTextAtSize(char,size)>width)throw Error('El campo es demasiado estrecho para escribir.');
     part+=char;
    }
    line=part;
   }
   lines.push(line);
  }
  return lines;
 },
 value(answer,label){
  const key=String(label).toUpperCase();
  if(/OK\s*\/?\s*NOK/.test(key))return answer.result||'';
  if(key.includes('SEVERIDAD'))return answer.severity||'';
  if(key.includes('FECHA'))return answer.date?answer.date.split('-').reverse().join('/'):'';
  if(key.includes('COMENT')||key.includes('OBSERV')||!key.trim())return answer.observation||'';
  return '';
 },
 erase(page,box){const [x,y,x2,y2]=box;page.drawRectangle({x:x+.6,y:page.getHeight()-y2+.6,width:x2-x-1.2,height:y2-y-1.2,color:PDFLib.rgb(1,1,1)});},
 write(page,box,lines,font,size=8){
  const [x,y,x2,y2]=box,leading=size*1.2,capacity=Math.max(1,Math.floor((y2-y-5)/leading));
  if(lines.length>capacity)throw Error('El texto requiere una página de continuación.');
  lines.forEach((line,i)=>{if(line)page.drawText(line,{x:x+3,y:page.getHeight()-y-3-size-i*leading,size,font,color:PDFLib.rgb(0,0,0)});});
 },
 async fill(bytes,schema,model,{common={},footer=false}={}){
  const source=await PDFLib.PDFDocument.load(bytes),doc=await PDFLib.PDFDocument.load(bytes),font=await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  const pages=[...doc.getPages()],continuations=[],lastContinuation=new Map();
  const sourceTests=schema.tests||[];
  for(const point of sourceTests){
   if(!point.responseCells?.length)throw Error('No está definida la ubicación de la prueba '+(point.sourceItem||point.id)+'.');
   const page=pages[point.sourcePage-1];if(!page)throw Error('Página de prueba no disponible.');
   const answer=model.answers[point.id]||{},chunks=[];
   for(const cell of point.responseCells){
    this.erase(page,cell.box);
    const value=this.value(answer,cell.label),[x,y,x2,y2]=cell.box;
    let size=8;
    if(/FECHA|SEVERIDAD|OK.*NOK/.test(String(cell.label).toUpperCase()))while(size>5&&font.widthOfTextAtSize(value,size)>x2-x-6)size-=.5;
    const lines=this.wrap(value,font,x2-x-6,size),capacity=Math.max(1,Math.floor((y2-y-5)/(size*1.2)));
    this.write(page,cell.box,lines.slice(0,capacity),font,size);
    for(let i=capacity,part=0;i<lines.length;i+=capacity,part++){
     chunks[part]??=[];chunks[part].push({cell,lines:lines.slice(i,i+capacity),size});
    }
   }
   chunks.forEach((cells,index)=>continuations.push({point,cells,index:index+1}));
  }
  // Fill source-defined common fields on originals and repeated pages alike.
  const commonOnPage=(page,sourcePage)=>{
   for(const field of schema.commonFields||[]){if(field.page!==sourcePage)continue;const value=common[field.key];if(value==null)continue;this.erase(page,field.box);const lines=this.wrap(value,font,field.box[2]-field.box[0]-6,8);this.write(page,field.box,lines,font);}
  };
  pages.forEach((page,index)=>commonOnPage(page,index+1));
  for(const extension of continuations){
   const {point,cells,index}=extension,[page]=await doc.copyPages(source,[point.sourcePage-1]);
   const original=pages[point.sourcePage-1],after=lastContinuation.get(point.sourcePage)||original.ref.toString();
   const at=doc.getPages().findIndex(p=>p.ref.toString()===after)+1;
   if(!at)throw Error('No se encontró la página de origen para la continuación.');
   doc.insertPage(at,page);lastContinuation.set(point.sourcePage,page.ref.toString());
   for(const other of sourceTests.filter(p=>p.sourcePage===point.sourcePage))for(const cell of other.responseCells)this.erase(page,cell.box);
   for(const {cell,lines,size} of cells)this.write(page,cell.box,lines,font,size);
   commonOnPage(page,point.sourcePage);
   page.drawRectangle({x:45,y:page.getHeight()-34,width:page.getWidth()-90,height:22,color:PDFLib.rgb(1,1,1)});
   page.drawText('Continuación '+index+' · Prueba '+(point.sourceItem||point.id),{x:50,y:page.getHeight()-26,size:9,font});
  }
  // Retain historical source sheets for reference, not in a newly executed protocol.
  const excluded=(schema.sections||[]).filter(s=>s.captureEnabled===false).map(s=>doc.getPages().findIndex(p=>p.ref.toString()===pages[s.page-1].ref.toString())).filter(i=>i>=0).sort((a,b)=>b-a);
  for(const index of excluded)doc.removePage(index);
  // The bundled PDF library retains its page cache after removals. Reload the
  // serialized page tree before numbering or attaching record metadata.
  const finalDoc=excluded.length?await PDFLib.PDFDocument.load(await doc.save()):doc;
  const footerFont=excluded.length?await finalDoc.embedFont(PDFLib.StandardFonts.Helvetica):font;
  if(footer)finalDoc.getPages().forEach((page,index)=>{const x=page.getWidth()/2;page.drawRectangle({x:x-70,y:8,width:140,height:22,color:PDFLib.rgb(1,1,1)});page.drawText((index+1)+' de '+finalDoc.getPageCount(),{x:x-24,y:18,size:8,font:footerFont});});
  return finalDoc;
 }
};
if(typeof module!=='undefined'&&module.exports)module.exports=ProtocolExport45;
