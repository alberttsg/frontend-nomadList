import axios from 'axios'

export const createComment = async (newComment, postId) =>{
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers:{
      'Authorization': token
    }
  }
  const res = await axios.post(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, newComment, config);
  console.log(newComment);
    return res.data;
}


export const getComments = async (postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/${postId}/comments`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
}
