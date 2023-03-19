import React, { useContext, useEffect } from 'react'
import { CommentsContext } from '../../context/comments/CommentsState';
import { GlobalContext } from '../../context/UsersState';

const CommentsPrint = (props) => {
  const {postId} = props;
  const { getComments, comments, comment } = useContext(CommentsContext);

  return (
    <div>
      hola
    </div>
  )
}

export default CommentsPrint