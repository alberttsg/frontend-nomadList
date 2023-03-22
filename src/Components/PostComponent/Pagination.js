import { useEffect, useState } from 'react';
import axios from 'axios';

export default function getPosts(pageNumber) {
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
      url: 'https://backend-nomadsociety-development.up.railway.app/post/all',
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