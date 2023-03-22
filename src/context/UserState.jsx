import React, { createContext, useReducer } from 'react';
import { UserReducer } from './UserReducer';
import * as userService from '../service/userService';

const token = await userService.validateToken();

const initialState = {
  token: token,
  user: token ? await userService.getUserInfo(false, false, false) : null,
 };

export const UserContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async (user) => {
    try {
      const token = await userService.login(user);
      dispatch({
        type: "SET_TOKEN",
        payload: token
      });
      localStorage.setItem("token", JSON.stringify(token));
      getUserInfo(0, 0, 0);
    } catch (error) {
      console.error(error);
    };
  }

  const register = async (user) => {
    try {
      const token = await userService.register(user);
      dispatch({
        type: "SET_TOKEN",
        payload: token
      });
      localStorage.setItem("token", JSON.stringify(token));
      getUserInfo(0, 0, 0);
    } catch (error) {
      console.error(error);
    };
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: "SET_TOKEN",
      payload: null,
    });
  }

  const getUserInfo = async (followers, followed, likedPosts) => {
    try {
      const userInfo = await userService.getUserInfo(followers, followed, likedPosts);
      dispatch({
        type: "SET_USER_INFO",
        payload: userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        register,
        logout,
        getUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
