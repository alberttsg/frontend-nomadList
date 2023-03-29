import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/UsersState";
import { ChatLayout } from '../Chat/components/ChatLayout';
import './Content.scss'

export const Content = ({ children }) => {
  const { getUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className='content'>
      {children}
      <ChatLayout/>
    </div>
  )
}