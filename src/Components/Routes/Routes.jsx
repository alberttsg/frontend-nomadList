import { useRoutes } from 'react-router-dom';
import { Login } from '../Auth/Login/Login';
import { Register } from '../Auth/Register/Register';
import { Profile } from '../Profile/Profile';


export const Routes = () => {
  return useRoutes(

        [
            {
                element: <Login/>,
                path: '/'
              },
              {
                element: <Register/>,
                path: '/register'
              },
              {
                element: <Profile/>,
                path: '/profile'
              }
        ]
        );

}