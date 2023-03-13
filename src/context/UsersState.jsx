import React, { createContext, useReducer } from 'react'
import AppReducer  from './AppReducer.js'
import axios from 'axios'

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  user: {}
};

export const GlobalContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = async (user) => {
    const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/login',user);
    dispatch ({
      type: "POST_USER",
      payload: res.data
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    };
  };

  const register = async (user) => {
    const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/register',user);
    dispatch ({
      type: "POST_USER",
      payload: res.data
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    };
  };

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get('', {
      headers: {
        authorization: token,
      },
    });
      dispatch({
        type: "GET_USER_INFO",
        payload: res.data,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        register,
        getUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
