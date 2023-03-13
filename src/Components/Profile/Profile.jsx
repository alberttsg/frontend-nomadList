import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/UsersState'
import './Profile.scss'

export const Profile = () => {
  const {getUserInfo, user } = useContext(GlobalContext);

  useEffect(()=>{
    getUserInfo()
    console.log(user);
  },[])
  return (
    <div>Profile</div>
  )
}
