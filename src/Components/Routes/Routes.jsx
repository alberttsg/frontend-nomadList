import { useRoutes } from 'react-router-dom';
import { Register } from '../Auth/Register/Register';
import { Content } from '../Content/Content';
import { Profile } from '../Profile/Profile';



export const Routes = () => {
  return useRoutes(

        [
              {
                element: <Content/>,
                path: '/'
              },
              {
                element: <Profile/>,
                path: '/profile'
              },
              {
                element: <Register/>,
                path: '/register'
              },
        ]
        );

}