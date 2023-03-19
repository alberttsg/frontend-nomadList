import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CommentsPrint = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data)
    return setComments(res.data);
  }

  useEffect(()=>{
    getComments()
  },[])


  return (
    <div>
      {comments && comments.map((comment)=>{
        return <p>{comment.content}</p>
      })}
    </div>
  )
}

export default CommentsPrint;