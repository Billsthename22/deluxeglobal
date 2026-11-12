import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { authorized, sameOrigin } from '@/lib/auth';
import { dataDir, getProducts, updateProducts } from '@/lib/products';
export const runtime='nodejs';
export async function GET(){return NextResponse.json(await getProducts(),{headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){
 if(!sameOrigin(request)||!await authorized())return NextResponse.json({error:'Please sign in.'},{status:401});
 try {
 if(Number(request.headers.get('content-length'))>6000000)return NextResponse.json({error:'Image must be smaller than 5 MB.'},{status:413});
 const form=await request.formData();const name=String(form.get('name')||'').trim();const price=Number(form.get('price'));const id=String(form.get('id')||'');const previous=(await getProducts()).find(p=>p.id===id);
 if(!name||name.length>100||!Number.isFinite(price)||price<=0||price>100000000||!form.get('price'))return NextResponse.json({error:'Enter a product name and a valid price.'},{status:400});
 let image=previous?.image;const file=form.get('image');
 if(file instanceof File && file.size){const bytes=Buffer.from(await file.arrayBuffer());let ext='';if(bytes.subarray(0,3).equals(Buffer.from([255,216,255])))ext='jpg';else if(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext='png';else if(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP')ext='webp';if(!ext||file.size>5000000)return NextResponse.json({error:'Use a JPG, PNG, or WebP image smaller than 5 MB.'},{status:400});const filename=`${crypto.randomUUID()}.${ext}`;await mkdir(path.join(dataDir,'uploads'),{recursive:true});await writeFile(path.join(dataDir,'uploads',filename),bytes);image=`/api/media/${filename}`;}
 if(!image)return NextResponse.json({error:'Please upload a product photo.'},{status:400});
 const product={id:previous?.id||crypto.randomUUID(),name,price,image,category:String(form.get('category')||'Gift boxes').slice(0,60),description:String(form.get('description')||'').slice(0,1000)};
 await updateProducts(products=>previous?products.map(p=>p.id===previous.id?product:p):[product,...products]);return NextResponse.json(product);
 }catch {return NextResponse.json({error:'Could not save the product. Please try again.'},{status:500});}
}
export async function DELETE(request:Request){if(!sameOrigin(request)||!await authorized())return NextResponse.json({error:'Please sign in.'},{status:401});const {id}=await request.json();await updateProducts(products=>products.filter(p=>p.id!==id));return NextResponse.json({ok:true});}
