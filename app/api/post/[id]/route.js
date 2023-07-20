import { prisma } from "@/app/lib/db/blog";
import { NextResponse } from "next/server";



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


export async function PATCH(req, {params}){

    if(req.method){

        try{
            const content = await req.json();
            const { title, body} = content;
            const { id } = params;
            const updatePost = await prisma.post.update({
                where:{
                    id
                },
                data:{
                    title,
                    body
                }                
            });
            if(!updatePost){
                return NextResponse.json({message:"No post found"},{status: 404})
            }
            return NextResponse.json(updatePost)
        }
        catch(error){
            return NextResponse.json({error:"Error updating post", error}, {status: 500})
        }
    }
}
export async function PUT(req, {params}){

    if(req.method){

        try{
            const content = await req.json();
            const { title, body} = content;
            const { id } = params;
            const updatePost = await prisma.post.update({
                where:{
                    id
                },
                data:{
                    title,
                    body
                }                
            });
            if(!updatePost){
                return NextResponse.json({message:"No post found"},{status: 404})
            }
            return NextResponse.json(updatePost)
        }
        catch(error){
            return NextResponse.json({error:"Error replacing post", error}, {status: 500})
        }
    }
}



export async function DELETE(req, {params}){
    
    if(req.method){
        try{
            const {id} = params
            await prisma.post.delete({
                where:{
                    id
                }
            })
            return NextResponse.json("post deleted successfully")
        }
        catch(error){
            return NextResponse.json({ error: 'Error deleting posts' }, { status: 500 })
        }
    }
    else{
        console.error("Error Getting Post", error);
        return NextResponse.error(405, 'Method Not Allowed');
    }
}
