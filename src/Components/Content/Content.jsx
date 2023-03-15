
import './Content.scss'
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
export const Content = () => {
  const { getUserInfo, user, deleteUser, logOut, reset } = useContext(GlobalContext);
  useEffect(()=>{
    getUserInfo()
  },[])
  return (
    <div className='content'>
      hola que tal
    </div>
  )
}
