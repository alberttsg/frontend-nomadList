import { useEffect, useState } from 'react';
import axios from 'axios';

export function paginatePosts(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: import.meta.env.VITE_DEV_URL + 'post/all',
      params: { page: pageNumber },
      headers: { Authorization: token },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setPosts(prevPosts => {
        return [...new Set([...prevPosts, ...res.data.posts])]
      })
      setHasMore(posts.length < res.data.totalPosts)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, posts, hasMore }
}

export function paginatePostsByUser(pageNumber, id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: URL + 'post/userPosts/' + id,
      params: { page: pageNumber },
      headers: { Authorization: token },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      if (res.data.posts.length > 0) {
        setPosts(prevPosts => {
          return [...new Set([...prevPosts, ...res.data.posts])]
        })
      }
      setHasMore(posts.length < res.data.totalPosts)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(true)
    })
    return () => cancel()
  }, [pageNumber, id])

  return { loading, error, posts, hasMore }
}

export async function toggleLike(postId) {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(import.meta.env.VITE_DEV_URL + 'post/like/' + postId, {}, { headers: { Authorization: token } });
  return res.data.likesCount;
}

export async function getCommentsByPostId(postId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { Authorization: token } };
  const res = await axios.get(import.meta.env.VITE_DEV_URL + 'post/' + postId + '/comments', config);
  return res.data;
}

export async function createComment(content, postId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { Authorization: token } };
  const contentValue = content.content;
 
  //API BAD LENGUAGE
  const validation = await badLanguage(contentValue)
  console.log(validation.data.classification)

  if(validation.data.classification == 1 || validation.data.classification == 2 || validation.data.classification == 3){
    return false;
  }
  
  const res = await axios.post(import.meta.env.VITE_DEV_URL + 'post/createcomment/' + postId, content, config);
  return res.data;
  
}

export async function deleteComment(commentId) {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(import.meta.env.VITE_DEV_URL + 'comments/' + commentId, config);
  return res.data;
}

export async function editComment(commentId, content) {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = { headers: { Authorization: token } };
  const res = await axios.put(import.meta.env.VITE_DEV_URL + 'comments/' + commentId, content, config);
  return res.data;
}

//APIS PETITION DATA
const badLanguage = async (contentValue) => {
  const content = {text: contentValue}
  const validation = await axios.post('https://flask-production-782a.up.railway.app/bad-language', content)
  return validation
}

// const sentimentAnalysis = async (body) => {
//   const content = {text:body.get('content')}

//   const validation = await axios.post('https://flask-production-782a.up.railway.app/sentiment', content)
//   return validation
// }