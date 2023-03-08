import React, { createContext, useReducer } from 'react'
import AppReducer  from './AppReducer.js'
import axios from 'axios'

const initialState = {
  users : []
}

export const GlobalContext = createContext(initialState)

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getUsers = async () => {
    const res = await axios.get("")
      dispatch({
        type: "GET_USERS",
        payload: res.data.results,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
