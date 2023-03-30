import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/UsersState";

export const Content = ({ children }) => {
  const { getUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className='content'>
      {children}
    </div>
  )
}