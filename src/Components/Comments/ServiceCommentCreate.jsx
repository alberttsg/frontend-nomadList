import axios from 'axios'

export const createComment = async (newComment, postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const res = await axios.post(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, newComment, config);
  console.log(newComment);
  return res.data;
}


export const getComments = async (postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, config);
  return res.data;
}

export const deleteComments = async (commentId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const res = await axios.delete(`https://backend-nomadsociety-development.up.railway.app/comments/${commentId}/`, config);
  return res.data;
}

export const updateComments = async (commentId,comment) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const res = await axios.put(`https://backend-nomadsociety-development.up.railway.app/comments/${commentId}/`,comment, config);
  console.log(res.data);
  console.log('nfaskl');
  return res.data;
}