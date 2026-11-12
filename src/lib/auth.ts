import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
export function matches(a:string,b:string) {const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length && timingSafeEqual(x,y);}
export function token(expiry:string) {return createHmac('sha256',process.env.ADMIN_PASSWORD || '').update(expiry).digest('hex');}
export async function authorized() {if(!process.env.ADMIN_PASSWORD)return false;const value=(await cookies()).get('deluxe-admin')?.value || '';const [expiry,signature]=value.split('.');return Number(expiry)>Date.now() && matches(signature || '',token(expiry));}
export function sameOrigin(request:Request) {return request.headers.get('origin')===new URL(request.url).origin;}
