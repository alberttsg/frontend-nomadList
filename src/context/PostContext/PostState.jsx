import axios from 'axios'
import { createContext, useContext, useReducer } from 'react';
import { PostReducer } from './PostReducer';
import { GlobalContext } from "../../context/UsersState";


export const PostContext = createContext();

const initialState = {
  posts: [],
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { token } = useContext(GlobalContext);

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

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        getAllPost,
      }}>
      {children}
    </PostContext.Provider>
  )
}
