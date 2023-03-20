import React from 'react';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from 'axios';
import './UserPosts.scss'
import { Button, Card, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { LikeButton } from '../LikeButton/LikeButton';
import { ThunderboltFilled } from '@ant-design/icons';


const UsersPosts =  () => {
    const { editUser, user, getUserInfo, deleteUser} = useContext(GlobalContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers:{
      'Authorization': token
    }
  }
  useEffect(() => {
  
    console.log(user._id);
    const getPosts = async (id) => {
        const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/userPosts/${id}`, config);
        setPosts(res.data)
        console.log(posts.length)
        setLoading(false);
      }
      getPosts(user._id);
      
      
      
    }, [])
    return (
      <>
                <Spin size='large' spinning={loading}>
                <div className='publis'>
                  <h3> <ThunderboltFilled spin={false} style={{ color: '#F0C311'}} /> {posts && posts.length} {' '} PUBLICACIONES </h3>
                </div>
                <div className='posts-container-profiles'>
                {console.log(posts)}
                {posts && posts.map((post) => {
                  const likes = post.likes.length
                  return(
                    <Card key={post._id} className='post-container-uni' hoverable
                    style={{ width: 250 }} cover={<img alt="example" src={ "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"} />}>
                        <Meta title={post.title} description={post.content}/>
                        {/* <p>{post.content}</p> */}
                        {/* <img src={'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'} alt="img" /> */}
                        <br />
                        <div>
                        <LikeButton id={post._id} likes={likes}/>

                        </div>
                        <div className='button-container-posts'>

                        <Button type='primary' onClick={() => console.log('borra')}>Delete</Button >
                        <Button type='primary' onClick={() => console.log('edit')}>Edit</Button >
                        
                        </div>
                    </Card>
                )
              }
              )
            }
            </div>
                    </Spin>
            
            </>
                );
};

export default UsersPosts;