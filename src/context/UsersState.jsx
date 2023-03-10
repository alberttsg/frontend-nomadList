import React, { createContext, useReducer } from 'react'
import AppReducer  from './AppReducer.js'
import axios from 'axios'

const initialState = {
  users : [],
  user: {}
};

export const GlobalContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = async (user) => {
    const res = await axios.post ('',user);
    dispatch ({
      type: "POST_USER",
      payload: res.data
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    };
  };

  const register = async (user) => {
    const res = await axios.post ('',user);
    dispatch ({
      type: "POST_USER",
      payload: res.data
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    };
  };

  const getUsers = async () => {
    const res = await axios.get("")
      dispatch({
        type: "GET_USERS",
        payload: res.data.results,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        getUsers,
        user: state.user,
        login,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
