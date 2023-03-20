import React from 'react';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from 'axios';
import './UserPosts.scss'
import { createLogger } from 'vite';

const UserPosts =  () => {
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
        console.log(res.data)
    }
    getPosts(user._id)

    console.log(posts)
  }, [])

  
    

    return (

            <div className='posts-container-profiles'>
                {/* {console.log(posts)}
                {posts && posts.length > 0 && posts.map((post) => (
                    <div key={post._id} className='post-container-uni'>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <img src={ post.imagePost || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'} alt="img" />
                        <button onClick={() => console.log('borra')}>Delete</button>
                        <button onClick={() => console.log('edit')}>Edit</button>
                    </div>
                ))} */}
            </div>
            
                );
};

export default UserPosts;