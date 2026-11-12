import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { dataDir } from '@/lib/products';
export async function GET(_request:Request,{params}:{params:Promise<{name:string}>}){const {name}=await params;if(!/^[a-f0-9-]+\.(jpg|png|webp)$/.test(name))return new Response('Not found',{status:404});try{const file=await readFile(path.join(dataDir,'uploads',name));return new Response(file,{headers:{'Content-Type':name.endsWith('jpg')?'image/jpeg':`image/${name.split('.').pop()}`,'Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});}catch{return new Response('Not found',{status:404});}}
