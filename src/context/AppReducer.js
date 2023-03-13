
const users = (state, action) => {

  switch (action.type) {
      case "POST_USER":
      return {
        ...state,
        token: action.payload.token,
        isSuccess:true,
       
      };
      case "POST_USER_ERROR":
      return {
        ...state,
        isError: true,
      };
      case "RESET":
        return {
          ...state,
          isError: false,
          isSuccess:false,

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

