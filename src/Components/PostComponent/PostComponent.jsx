import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import { CommentOutlined } from "@ant-design/icons";
import axios from 'axios'
import './PostComponent.scss'
import { LikeButton } from '../LikeButton/LikeButton'
import CommentsForm from '../Comments/CommentsForm'
import CommentsPrint from '../Comments/CommentsPrint';


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
    <div className='post-container' key={'1111'}>
      {posts && posts.map((post) => {
        const likes = post.likes.length
        // añadir componete de likes (numero de likes) para actualizar el numero de likes sin refrescar la pagina
        return (
          <div className="post-content" key={post._id}>
            <div >
              <p>{post.title}</p>
              <p>{post.description}</p>
              <p>{post.content}</p>
              {<img className='post-img' src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' alt="" />}
            </div>

            <div className="btn-like-coment">
              <span>{likes} </span>
              <LikeButton id={post._id} />
              <CommentOutlined />
            </div>
            <div>
              <CommentsPrint postId={post._id} />

            </div>
          </div>
        )
      })}

    </div>
  )
}
