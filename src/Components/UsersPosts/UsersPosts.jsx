import React from 'react';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from 'axios';
import './UserPosts.scss'
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';


const UsersPosts =  () => {
    const { editUser, user, getUserInfo, deleteUser} = useContext(GlobalContext);
    const [posts, setPosts] = useState([]);

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
      }
      getPosts(user._id);
      
      
      
    }, [])
    return (
            <div className='posts-container-profiles'>
                {console.log(posts)}
                {posts && posts.map((post) => (
                    <Card key={post._id} className='post-container-uni' hoverable
                    style={{ width: 250 }} cover={<img alt="example" src={ "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"} />}>
                        <Meta title={post.title} description={post.content}/>
                        {/* <p>{post.content}</p> */}
                        {/* <img src={'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'} alt="img" /> */}
                        <br />
                        <div className='button-container-posts'>

                        <button onClick={() => console.log('borra')}>Delete</button>
                        <button onClick={() => console.log('edit')}>Edit</button>
                        </div>
                    </Card>
                )
                )
                }
            </div>
            
                );
};

export default UsersPosts;