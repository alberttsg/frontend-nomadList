import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PostComponent.scss'

export const PostComponent = () => {
  const [posts, setPosts] = useState([])
  const token = JSON.parse(localStorage.getItem("token"));
  const headerAxios = {
    headers: {
      Authorization: token
  }
}
  
  useEffect(() => {
    const getPost = async () => {
     console.log(token)
      const res = await axios.get('https://backend-nomadsociety-development.up.railway.app/post/all', headerAxios);

      setPosts(res.data)
    }
    getPost()
  
    console.log(posts)
  }, [])
  

  return (
    <div className='post-container' key={1}>
      {posts && posts.map ((post)=>{
        return (
          <div className="post-content">
            <div key={post._id}>
              <p>{post.title}</p>
              <p>{post.description}</p>
             { <img className='post-img' src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' alt=""/> }
            </div>
          </div>
        )
      })}

    </div>
  )
}
