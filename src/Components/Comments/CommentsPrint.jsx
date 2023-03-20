import React, { useContext, useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import { getComments } from './ServiceCommentCreate';
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalContext } from '../../context/UsersState';


const CommentsPrint = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [click, setClick] =useState(false);
  const { user } = useContext(GlobalContext);

  const clickHandler= () =>{
    setClick(!click)
    console.log('apretaste aca')
  }

  useEffect(() => {
    const print = async () => {
      const res = await getComments(postId);
      setComments(res);
      console.log(res)
    }
    print()
  }, [])


  return (
    <div>
      <CommentOutlined onClick={clickHandler} />
      <div>
        {click === true && comments && comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>{comment.author}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.content}</p>
              <div>
                {user._id === comment.author && <div>
                  <EditOutlined/>
                  <DeleteOutlined />
                  </div>}
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <CommentsForm postId={postId} comments={comments} setComments={setComments} />
      </div>
    </div>
  )
}

export default CommentsPrint;