export const UserReducer = (state, action) => {
  switch (action.type) {
      case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
      case "SET_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
