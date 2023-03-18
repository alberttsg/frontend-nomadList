import React from 'react'
import { HeartTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';

export const LikeButton = () => {
  const [liked, setLiked] = useState(false)
  return (liked === false ? <HeartOutlined onClick={()=>setLiked(!liked)}/> : <HeartFilled style={{color: "#eb2f96"}} onClick={()=>setLiked(!liked)} />
  )
}
