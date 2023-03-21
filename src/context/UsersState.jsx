import React, { createContext, useReducer } from 'react'
import AppReducer from './UserReducer.js'
import axios from 'axios'

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLogOut: false,
};

export const GlobalContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = async (user) => {
    try {
      const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/login', user);
      dispatch({
        type: "POST_USER",
        payload: res.data
      });
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      };
    } catch (error) {
      console.error(error)
      dispatch({
        type: "POST_USER_ERROR"
      });
    };

  }

  const logOut = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({
      type: "LOGOUT",
      payload: token,
    });
    if (token || user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  const reset = () => {
    dispatch({
      type: "RESET"
    });
  }

  const register = async (user) => {
    try {
      const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/register', user);
      dispatch({
        type: "POST_USER",
        payload: res.data
      });
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      };

    } catch (error) {
      console.error(error)
      dispatch({
        type: "POST_USER_ERROR"
      });
    }
  };

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/info?populateFollowers=${true}&populateFollowed=${true}&populatedLikedPosts=${false}`, {
      headers: {
        authorization: token,
      },
    });
    if(res.data){
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    dispatch({
      type: "GET_USER_INFO",
      payload: res.data,
    });
  };

  const editUser = async (user, id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.put(`https://backend-nomadsociety-development.up.railway.app/users/id/${id}`, user, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'EDIT_USER',
      payload: res.data,
    });
    getUserInfo();
    return res;
  }
  const deleteUser = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.delete(`https://backend-nomadsociety-development.up.railway.app/users/id/${id}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'DELETE_USER',
      payload: res.data,
    });

    return res;
  }
  const getUserById = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/id/${id}`, {
    headers: {
      Authorization: token
    }
  });
  dispatch({
    type: 'GET_USER_BY_ID',
    payload: res.data,
  });
  }
  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isSuccess: state.isSuccess,
        isError: state.isError,
        isLogOut: state.isLogOut,
        login,
        register,
        getUserInfo,
        reset,
        logOut,
        editUser,
        deleteUser,
        getUserById
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
