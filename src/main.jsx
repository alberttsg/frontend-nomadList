import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { PostProvider } from './context/PostContext/PostState'
import { UsersProvider } from './context/UsersState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsersProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </UsersProvider>
)