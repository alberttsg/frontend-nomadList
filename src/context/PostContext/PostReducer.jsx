export const PostReducer = (state,action) => {
  switch (action.type) {
    case 'GET_ALL_POST':
      return{
        ...state,
        posts: action.payload,
      };
      case 'EDIT_POST': 
      return {
        ...state,
        post: state.post
      };
      case "DELETE_POST":
    return {
      ...state,
      post: state.post
    };
    case "GET_POST_BY_ID":
      return {
       ...state,
        post: action.payload,
      };
    default:
      return state;
  };
  
};
