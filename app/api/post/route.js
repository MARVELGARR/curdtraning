import { prisma } from '@/app/lib/db/blog';

import { NextResponse } from 'next/server'

export async function POST(req){

    try{
        const content = await req.json();
        const { title, body } = content;
        const newPost = await prisma.post.create({
            data: {
                title,
                body
            }
        });
        return NextResponse.json(newPost)
    }
    catch(error){
        return NextResponse.json({error:"Error creating post", error}, {status: 500})
    }
}

export async function GET(req){
    
    if(req.method){
        try{
            const content =  await prisma.post.findMany();
            return NextResponse.json(content)
        }
        catch(error){
            console.error("Error Getting Post", error);
            return NextResponse.json({ error: 'Error getting posts' }, { status: 500 })
        }
    }
    else{
        console.error("Error Getting Post", error);
        return NextResponse.error(405, 'Method Not Allowed');
    }
}