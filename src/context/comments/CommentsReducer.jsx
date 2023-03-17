const comments = (state, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comment: action.payload
      };
    case 'EDIT_COMMENT':
      return {

      };
    case 'DELETE_COMMENT':
      return {

      };
  }
}

export default comments;