import { useRoutes } from 'react-router-dom';
import { Login } from '../Auth/Login/Login';
import { Register } from '../Auth/Register/Register';
import { Profile } from '../Profile/Profile';


export const Routes = () => {
  return useRoutes(

        [
            {
                element: <Register/>,
                path: '/'
              },
              {
                element: <Login/>,
                path: '/login'
              },
              {
                element: <Profile/>,
                path: '/profile'
              }
        ]
        );

}