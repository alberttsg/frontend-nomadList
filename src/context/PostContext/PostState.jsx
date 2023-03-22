import axios from 'axios'
import { createContext, useContext, useReducer } from 'react';
import { PostReducer } from './PostReducer';
import { GlobalContext } from "../../context/UsersState";


export const PostContext = createContext();

const initialState = {
  posts: [],
  post:{},
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { token, user  } = useContext(GlobalContext);

  const getAllPost = async () => {
    try {
      const res = await axios.get('https://backend-nomadsociety-development.up.railway.app/post/all',
      {
        headers: {
          'Authorization': token
        }
      });
      dispatch({
        type: 'GET_ALL_POST',
        payload: res.data,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  const getPostById = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/${id}`,
      {
        headers: {
          'Authorization': token
        }
      });
      dispatch({
        type: 'GET_POST_BY_ID',
        payload: res.data,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
 
  const getPosts = async (id) => {

    const res = await axios.get(
      `https://backend-nomadsociety-development.up.railway.app/post/userPosts/${id}`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    return res.data;
  }
  const editPost = async (id,post) => {
    const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.put(`https://backend-nomadsociety-development.up.railway.app/post/${id}/`,post, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: 'EDIT_POST',
        payload: res.data,
      });
      console.log(res.data , 'actualizado');
      // getPosts(user._id);
      return res.data;
    }
    
  const deletePost = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.delete(
          `https://backend-nomadsociety-development.up.railway.app/post/${id}`,
          {
            headers: {
              Authorization: token,
            },
          });
        dispatch({
          type: 'DELETE_POST',
          payload: res.data,
        });
        return res.data;
  }
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        getAllPost,
        post: state.post,
        editPost,
        deletePost,
        getPostById,
      }}>
      {children}
    </PostContext.Provider>
  )
}
