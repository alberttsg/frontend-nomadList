import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CommentsProvider } from './context/comments/CommentsState'
import { UsersProvider } from './context/UsersState'
import { PostProvider } from './context/PostContext/PostState'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UsersProvider>
    <CommentsProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </CommentsProvider>
  </UsersProvider>
)
