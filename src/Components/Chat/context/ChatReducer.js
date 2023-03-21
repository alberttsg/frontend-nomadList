const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    case 'SET_PERSONAL_SOCKET':
      return {
        ...state,
        personalSocket: action.payload,
      };
    case 'SET_GENERAL_SOCKET':
      return {
        ...state,
        generalSocket: action.payload,
      };
    case 'SET_ACTIVE_ROOM':
      return {
        ...state,
        activeRoom: action.payload.room,
        activeRoomName: action.payload.name,
      };
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload.data,
      };
    case 'SET_CHATROOMS':
      return {
        ...state,
        chatrooms: action.payload.data,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchResult: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;