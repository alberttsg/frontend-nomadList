import React, { useContext, useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import { deleteComments, getComments } from './ServiceCommentCreate';
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalContext } from '../../context/UsersState';

const CommentsPrint = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [click, setClick] = useState(false);
  const { user } = useContext(GlobalContext);

  const clickHandler = () => {
    setClick(!click)
  }
  const deletehandler = (commentId) => {
    const deleteComment = async () => {
      await deleteComments(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    }
    deleteComment()
  }

  useEffect(() => {
    const print = async () => {
      const res = await getComments(postId);
      setComments(res);
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
              <p>{comment.author.displayName}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.content}</p>
              <div>
                {user._id === comment.author.displayName && <div>
                  <EditOutlined />
                  <DeleteOutlined onClick={() => deletehandler(comment._id)} />
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