import React, { useCallback, useRef, useState, useEffect } from 'react'
import { paginatePosts, getPostById } from '../../service/postService';
import { useParams } from 'react-router';
import { PostCard } from './PostCard/PostCard';
import { Spin, Alert, Divider } from 'antd';

export function PostSearchLayout() {
  const { postId } = useParams();
  const [searchPost, setSearchPost] = useState()
  const [page, setPage] = useState(1)
  const { posts, hasMore, loading, error } = paginatePosts(page);
  const observer = useRef();

  useEffect(() => {
    async function getData() {
      const res = await getPostById(postId);
      setSearchPost(res);
    }
    getData();
  }, [])

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      };
    }, { root: null })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box', flexFlow: 'column nowrap', width: '100%', alignItems: 'center', padding: '10px', gap: '20px' }}>
      <h4>Search result</h4>
      {searchPost && <PostCard post={searchPost} />}
      <Divider plain/>
      {posts && posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <PostCard post={post} key={index} forwardedRef={lastPostElementRef} />
        } else {
          return <PostCard post={post} key={index} />
        }
      })}
      {loading && <Spin tip='Loading posts...' />}
      {error && <Alert type='error' message="Couldn't load more posts" banner />}
    </div>
  )
}