import React, { useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import { getComments } from './ServiceCommentCreate';


const CommentsPrint = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const print =async () =>{
      const res = await getComments(postId);
      setComments(res);
      console.log(res)
    }
    print()
  }, [])


  return (
    <div>
      <div>
        {comments && comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>{comment.author}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.content}</p>
            </div>
          )})}
      </div>
      <div>
        <CommentsForm postId={postId} comments={comments} setComments={setComments}/>
      </div>
    </div>
  )
}

export default CommentsPrint;