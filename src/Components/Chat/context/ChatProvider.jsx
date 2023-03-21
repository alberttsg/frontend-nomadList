import { useReducer, createContext, useEffect } from 'react';
import ChatReducer from './ChatReducer.js';
import { Manager } from 'socket.io-client';
import axios from 'axios';

const initialState = {
  socket: null,
  personalSocket: null,
  generalSocket: null,
  activeRoom: null,
  contacts: [],
  chatrooms: [],
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const URL = 'http://localhost:4000/';

  useEffect(() => {
    newManager();
  }, [])

  const newManager = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const manager = new Manager(URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
    });
    const auth = { auth: { token: token } }
    const generalSocket = manager.socket('/chatrooms', auth);
    dispatch({
      type: 'SET_GENERAL_SOCKET',
      payload: generalSocket,
    });
    const personalSocket = manager.socket('/personal', auth);
    dispatch({
      type: 'SET_PERSONAL_SOCKET',
      payload: personalSocket,
    });
  }

  const setSocket = (socket) => {
    dispatch({
      type: 'SET_SOCKET',
      payload: socket,
    });
  }

  const setActiveRoom = (room) => {
    dispatch({
      type: 'SET_ACTIVE_ROOM',
      payload: room,
    });
  }

  const setContacts = async () => {
    const contacts = await axios.get(URL + 'contacts');
    dispatch({
      type: 'SET_CONTACTS',
      payload: contacts,
    });
  }

  const setChatrooms = async () => {
    const rooms = await axios.get(URL + 'chatrooms');
    dispatch({
      type: 'SET_CHATROOMS',
      payload: rooms,
    });
  }

  return (
    <ChatContext.Provider
      value={{
        socket: state.socket, setSocket,
        personalSocket: state.personalSocket,
        generalSocket: state.generalSocket,
        activeRoom: state.activeRoom, setActiveRoom,
        contacts: state.contacts, setContacts,
        chatrooms: state.chatrooms, setChatrooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}