import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CommentsProvider } from './context/comments/CommentsState'
import { UsersProvider } from './context/UsersState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsersProvider>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </UsersProvider>
)
