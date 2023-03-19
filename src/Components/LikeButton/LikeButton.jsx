import React, { useEffect } from 'react'
import { HeartTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';
import axios from 'axios';

export const LikeButton = (props) => {
  const {id} = props
  const [liked, setLiked] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const headerAxios = { headers: { Authorization: token } }
  const isLiked = async () => {
    const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/like/${id}`, headerAxios);
    return res.data
  }
  const likePost = async () => {
    const res = await axios.put(`https://backend-nomadsociety-development.up.railway.app/post/like/${id}`, {}, headerAxios);
    setLiked(!liked)
    return
  }
useEffect(()=>{
  isLiked().then((res)=>{
    setLiked(res)
  })
},[])

  return (liked === false ? <HeartOutlined onClick={likePost}/> : <HeartFilled style={{color: "#eb2f96"}} onClick={likePost} />
  )
}
