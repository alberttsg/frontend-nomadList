import ReactDOM from 'react-dom/client'
import { App } from './App'
import { UsersProvider } from './context/UserState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsersProvider>
    <App />
  </UsersProvider>
)