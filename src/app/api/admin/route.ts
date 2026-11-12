import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authorized, matches, sameOrigin, token } from '@/lib/auth';
export async function GET(){return NextResponse.json({authenticated:await authorized(),configured:!!process.env.ADMIN_PASSWORD});}
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});
 if(!process.env.ADMIN_PASSWORD)return NextResponse.json({error:'Set ADMIN_PASSWORD in .env.local to enable admin access.'},{status:503});
 const key=request.headers.get('x-forwarded-for') || 'local';const entry=attempts.get(key);if(entry && entry.until>Date.now() && entry.count>=5)return NextResponse.json({error:'Too many attempts. Try again in 15 minutes.'},{status:429});
 const {password}=await request.json();if(typeof password!=='string'||!matches(password,process.env.ADMIN_PASSWORD)){attempts.set(key,{count:entry&&entry.until>Date.now()?entry.count+1:1,until:Date.now()+900000});return NextResponse.json({error:'Incorrect password.'},{status:401});}
 attempts.delete(key);const expiry=String(Date.now()+28800000);(await cookies()).set('deluxe-admin',`${expiry}.${token(expiry)}`,{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:28800});return NextResponse.json({ok:true});
}
export async function DELETE(request:Request){if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});(await cookies()).delete('deluxe-admin');return NextResponse.json({ok:true});}
