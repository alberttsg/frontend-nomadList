import { useRoutes } from 'react-router-dom';
import { Login } from '../Auth/Login/Login';
import { Content } from '../Content/Content';
// import { Profile } from '../Profile/Profile';

export const Routes = () => {
  return useRoutes(

        [
              {
                element: <Login/>,
                path: '/'
              },
              {
                element: <Content/>,
                path: '/home'
              },
        ]
        );

}