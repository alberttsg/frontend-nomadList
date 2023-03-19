import './Content.scss'
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import { LikeButton } from '../LikeButton/LikeButton';
import { PostComponent } from '../PostComponent/PostComponent';
import { PostContext } from "../../context/PostContext/PostState"
import Post from '../../Components/Post/Post'
import { Space } from 'antd';

export const Content = () => {
  const { getUserInfo, user, deleteUser, logOut, reset } = useContext(GlobalContext);
  const { getAllPost, posts } = useContext(PostContext);

  useEffect(()=>{
    getUserInfo()
    getAllPost()
  },[])

  return (
    <div className='content'>

      <PostComponent />
      { <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {
            posts.length === 0 ? <div>no hay posts</div> :
              posts.map((e,i) => 
                (
                  <Post
                    userName = {user.firstName + user.lastName}
                    profilePhoto = {user.avatar}
                    postTitle = {e.title}
                    postContent = {e.content}
                    createdAt = {e.createdAt}
                  />
                ))
          }
        </Space>
      }
    </div>
  )
}
