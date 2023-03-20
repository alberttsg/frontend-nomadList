import './Content.scss'
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import { LikeButton } from '../LikeButton/LikeButton';
import { PostComponent } from '../PostComponent/PostComponent';
export const Content = () => {
  const { getUserInfo, user, deleteUser, logOut, reset } = useContext(GlobalContext);
  useEffect(()=>{
    getUserInfo()

  },[])
  return (
    <div className='content'>
      <PostComponent />
    </div>
  )
}