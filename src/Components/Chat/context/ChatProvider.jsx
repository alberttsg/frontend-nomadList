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
  searchResult: [],
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const URL = 'https://nomadsocietychat.onrender.com:4000/';

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

  const setActiveRoom = (room, name) => {
    dispatch({
      type: 'SET_ACTIVE_ROOM',
      payload: { room, name },
    });
  }

  const setContacts = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const contacts = await axios.get(URL + 'contacts?token=' + token);
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

  const addContact = async (contactId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const body = { contactId: contactId };
    const contacts = await axios.post(URL + 'addContact?token=' + token, body);
    const addedUsers = contacts.data.map(item => item.userId);
    const checkAdded = state.searchResult.map(e => {
      return {
        ...e,
        added: addedUsers.includes(e._id),
      }
    })
    dispatch({
      type: 'SET_SEARCH',
      payload: checkAdded,
    });
    dispatch({
      type: 'SET_CONTACTS',
      payload: contacts,
    });
  }

  const removeContact = async (contactId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const body = { contactId: contactId };
    const contacts = await axios.post(URL + 'removeContact?token=' + token, body);
    const addedUsers = contacts.data.map(item => item.userId);
    const checkAdded = state.searchResult.map(e => {
      return {
        ...e,
        added: addedUsers.includes(e._id),
      }
    })
    dispatch({
      type: 'SET_SEARCH',
      payload: checkAdded,
    });
    dispatch({
      type: 'SET_CONTACTS',
      payload: contacts,
    });
  }

  const createRoom = async (room) => {
    setActiveRoom(room, room);
    setSocket(state.generalSocket);
    state.generalSocket.emitWithAck('joinRoom', room);
    const rooms = await axios.get(URL + 'chatrooms');
    dispatch({
      type: 'SET_CHATROOMS',
      payload: rooms,
    });
  }

  const search = async (search) => {
    const searchResult = await axios.get(URL + 'find/' + search);
    const users = searchResult.data;
    const addedUsers = state.contacts.map(item => item.userId);
    const checkAdded = users.map(e => {
      return {
        ...e,
        added: addedUsers.includes(e._id),
      }
    })
    dispatch({
      type: 'SET_SEARCH',
      payload: checkAdded,
    });
  }

  return (
    <ChatContext.Provider
      value={{
        socket: state.socket, setSocket,
        personalSocket: state.personalSocket,
        generalSocket: state.generalSocket,
        activeRoom: state.activeRoom, activeRoomName: state.activeRoomName, setActiveRoom,
        contacts: state.contacts, setContacts, addContact, removeContact, 
        chatrooms: state.chatrooms, setChatrooms, createRoom,
        searchResult: state.searchResult, search,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}