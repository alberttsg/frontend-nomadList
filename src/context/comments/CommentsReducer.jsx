const comments = (state, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT':
      return {
        ...state,
        comment: [action.payload, ...state.comments],
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