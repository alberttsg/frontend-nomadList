
const users = (state, action) => {

  switch (action.type) {
      case "POST_USER":
      return {
        ...state,
        token: action.payload.token,
      };
      case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default users

