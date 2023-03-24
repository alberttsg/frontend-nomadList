import React, { useCallback, useRef, useState } from 'react'
import getPosts from './Pagination';
import { PostCard } from './PostCard';
import { Spin, Alert } from 'antd';

export const PostComponent = () => {
  const [page, setPage] = useState(1)
  const { posts, hasMore, loading, error } = getPosts(page);
  const observer = useRef();
  
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
    <div style={{display: 'flex', flexFlow: 'column nowrap', gap: '30px'}}>
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
