import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import { PostHomeLayout } from '../PostComponent/PostHomeLayout';

export const Content = () => {
  const { getUserInfo } = useContext(GlobalContext);
  useEffect(()=>{
    getUserInfo()

  },[])
  return (
    <div className='content'id='content'>
      <PostHomeLayout />
    </div>
  )
}