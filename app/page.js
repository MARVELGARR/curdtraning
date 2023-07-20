"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [post, setPost] = useState([])

  const handleTitle =(e)=>{
    const value = e.target.value;
    setTitle(value)
  }
  const handleBody =(e)=>{
    const value = e.target.value;
    setBody(value)
  }

  const createPost =  async (e)=>{
    e.preventDefault();

    try{

      const newPost = await fetch("/api/post",{
        method: "POST",
        headers: { 
          "content-type": "application/json"
        },
        body: JSON.stringify({title, body})
      })
      if(newPost.ok){
        const res = await newPost.json();
        getPost()
        console.log("post was created successfully", res);
      }
      else{
        console.error("Failed to create post", newPost.statusText);
      }
    }
    catch(error){
      console.error("Error creating post:", error);
    }
  }

  
  
  const getPost = async ()=>{
    try{

      const posts = await fetch("/api/post",{
        method: "GET",
        headers:{
          "content-type": "application/json"
        }
      })
      if(posts.ok){
        const res = await posts.json();
        setPost(res)
        console.log("Post recieved successfully", res);
      }
      else{
        console.error("Error getting posts", post.statusText)
      }
    }
    catch(error){
      console.error("Error getting posts", error);
    }
  } 
  useEffect(()=>{
    getPost()
  },[])

  const deletePost = async (id)=>{

    try{
      const post = await fetch(`api/post/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(post.ok){
        const res = await post.json();
        getPost();
        console.log(res, "was deleted successfully", post.statusText)
      }
      else{
        console.error("Failed to delete post", s)
      }
    }
    catch(error){
      console.error("error deleting post", error)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={createPost}  className="flex gap-3 items-center justify-center">
        <fieldset className="">
          <input type="text" value={title} onChange={handleTitle} className="rounded-xl border-2" placeholder='title..' />
        </fieldset>
        <fieldset className="">
          <textarea className='border-2 rounded-xl' value={body} onChange={handleBody} placeholder="body..."></textarea>
        </fieldset>
        <button className="p-2 rounded-xl bg-black text-white" type="submit">submit</button>
      </form>
      <div className="flex gap-4">
        {post.map((item) =>{
          return(
            <div className='border-2 shadow-sm shadow-slate-400 p-2 h-44 w-44' key={item.id}>
              <div className="bg-pink-400/50"><span className=" text-base font-bold">title: </span>{item.title}</div>
              <div className=''><span className=" text-base font-bold">body: </span>{item.body}</div>
              <div className='absolute bottom-0 flex justify-between w-full'>
                <button onClick={()=>deletePost(item.id)} className=' p-1 bg-black text-white rounded-lg '>DELET</button>
                <button className=' p-1 bg-black text-white rounded-lg'>EDIT</button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
