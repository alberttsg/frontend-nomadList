import React, { createContext,  useReducer } from 'react'
import CommentsReducer from './CommentsReducer'
import axios from 'axios'

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  comments: [],
}

export const CommentsContext = createContext(initialState);

export const CommentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentsReducer, initialState);
 
  const getComments = async (postId) => {
    console.log(postId)
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "GET_COMMENTS",
      payload: res.data,
    });
  }

  const createComment = async (comment, user, postId) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const currentDate = new Date();
    const newComment = {
      author: user._id,
      post_id: postId,
      content: comment,
      createAt: currentDate,
    }
 
    try {
      const res = await axios.post(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, newComment, {
        headers: {
          authorization: token,
        },
      })
      dispatch({
        type: 'CREATE_COMMENT',
        payload: res.data
      })
    } catch (error) {
      console.error(error);
    }
    console.log(newComment);
  }

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        comment: state.comment,
        getComments,
        createComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  )
}