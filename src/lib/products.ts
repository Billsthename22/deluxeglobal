import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
export type Product = { id: string; name: string; price: number; image: string; category: string; description: string };
export const dataDir = path.resolve(process.env.DATA_DIR || '.data');
export const seeds: Product[] = [
 {id:'signature',name:'The Signature Gift Box',price:60000,image:'/heroimg.png',category:'Gift boxes',description:'A thoughtful collection of little luxuries, beautifully wrapped for someone special.'},
 {id:'roses',name:'A Little Romance',price:25000,image:'/items/flowers.jpg',category:'Flowers',description:'A beautiful bouquet to say everything you feel.'},
 {id:'jewellery',name:'Little Treasure Box',price:12000,image:'/items/jewellerybox.jpg',category:'Accessories',description:'A lovely home for their most treasured pieces.'},
 {id:'teddy',name:'The Cuddle Companion',price:18000,image:'/items/teddy.jpg',category:'Keepsakes',description:'A soft, sweet reminder that they are loved.'},
];
let queue: Promise<unknown> = Promise.resolve();
export async function getProducts(): Promise<Product[]> { try {return JSON.parse(await readFile(path.join(dataDir,'products.json'),'utf8'));} catch(e) {if ((e as NodeJS.ErrnoException).code === 'ENOENT') return seeds; throw e;} }
export function updateProducts(change: (products: Product[]) => Product[]) { const next = queue.then(async()=>{await mkdir(dataDir,{recursive:true}); const products=change(await getProducts()); const temp=path.join(dataDir,'products.tmp'); await writeFile(temp,JSON.stringify(products,null,2)); await rename(temp,path.join(dataDir,'products.json')); return products;}); queue=next.catch(()=>{}); return next; }
