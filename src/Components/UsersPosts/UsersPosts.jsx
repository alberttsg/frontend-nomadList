import React from 'react';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from 'axios';

const UsersPosts =  () => {
    const { editUser, user, getUserInfo, deleteUser} = useContext(GlobalContext);
    const [posts, setPosts] = useState([]);

    const token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers:{
      'Authorization': token
    }
  }
useEffect(() => {
    const res =  axios.get(`https://backend-nomadsociety-development.up.railway.app/post/userPost/${user._id}`, config)
    .then(res => {
        console.log(res.data)
        setPosts(res);
      })
}
    )

  
    

    return (
        <div>
            soy user posts{console.log(posts)}
        </div>
    );
};

export default UsersPosts;