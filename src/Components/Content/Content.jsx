
import './Content.scss'
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import UserCard from '../UserCard/UserCard';
import EditUser from '../EditUser/EditUser';
import UsersPosts from '../UsersPosts/UsersPosts';

export const Content = () => {
  const { getUserInfo, user, deleteUser, logOut, reset } = useContext(GlobalContext);
  useEffect(()=>{
    getUserInfo()

  },[])
  return (
    <div className='content'>
<UserCard/>
 <UsersPosts/>
    </div>
  )
}
