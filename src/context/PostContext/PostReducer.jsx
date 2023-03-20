export const PostReducer = (state,action) => {
  switch (action.type) {
    case 'GET_ALL_POST':
      return{
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  };
  
};
