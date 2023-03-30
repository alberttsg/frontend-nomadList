import React, { useCallback, useContext, useRef, useState } from 'react'
import { ProfileContext } from '../../Profile';
import { paginateFollowedPostsByUser } from '../../../../service/postService';
import { PostCard } from '../../../PostComponent/PostCard/PostCard';
import { Spin, Alert } from 'antd';

export function UserFollowedPosts() {
  const { userData } = useContext(ProfileContext);
  const [page, setPage] = useState(1);
  const { posts, hasMore, loading, error } = paginateFollowedPostsByUser(page, userData?._id);
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
    <div style={{ display: 'flex', boxSizing: 'border-box', flexFlow: 'column nowrap', width: '100%', alignItems: 'center', padding: '10px', gap: '20px' }}>
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