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
 
  const getComments = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get('https://backend-nomadsociety-development.up.railway.app/comments', {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "GET_COMMENTS",
      payload: res.data,
    });
  }

  const createComment = async (comment, user, id) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const currentDate = new Date();
    const newComment = {
      author: user._id,
      content: comment,
      createAt: currentDate,
    }
    try {
      const res = await axios.post(`https://backend-nomadsociety-development.up.railway.app/post/${id}/comments`, newComment, {
        headers: {
          authorization: token,
        },
      })
      dispatch({
        type: 'ADD_COMMENT',
        payload: res.data
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        getComments,
        createComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  )
}