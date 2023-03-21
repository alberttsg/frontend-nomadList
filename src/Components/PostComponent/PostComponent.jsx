import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PostComponent.scss'
import { LikeButton } from '../LikeButton/LikeButton'
import CommentsPrint from '../Comments/CommentsPrint';
import { DateComponent } from '../DateComponent/DateComponent';
import { Card } from 'antd';
const { Meta } = Card;


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
      const res = await axios.get('https://backend-nomadsociety-development.up.railway.app/post/all', headerAxios);
      setPosts(res.data)
    }
    getPost()
  }, [])


  return (
    <>
      {posts && posts.map((post) => {
        const likes = post.likes.length
        return (
          <Card  hoverable className="post-content" key={post._id}>
            <div >
              <p>{post.title}</p>
              {<img className='post-img' src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' alt="" />}
            </div>
              <p>{post.content}</p>

            <div className="btn-like-coment">
              <LikeButton id={post._id} likes={likes} />
            </div>
            <div>
              <CommentsPrint postId={post._id} />
            </div>
             <DateComponent datePost={post.createdAt}/>
          </Card>
        )
      })}

    </>
  )
}
