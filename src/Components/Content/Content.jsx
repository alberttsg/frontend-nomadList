import './Content.scss'
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import { PostComponent } from '../PostComponent/PostComponent';
import { ChatLayout } from '../Chat/components/ChatLayout';
export const Content = () => {
  const { getUserInfo } = useContext(GlobalContext);
  useEffect(()=>{
    getUserInfo()

  },[])
  return (
    <div className='content'>
      <PostComponent />
      <ChatLayout/>
    </div>
  )
}