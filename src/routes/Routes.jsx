import { useRoutes } from 'react-router-dom';
import { PrivateZone } from '../guards/PrivateZone';
import { Content } from '../Content/Content';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { Profile } from '../Profile/Profile';
import ProfileUserId from '../Components/ProfileUserId/ProfileUserId';
import { Login } from '../Components/Auth/Login/Login';
import { Register } from '../Components/Auth/Register/Register';

export const Routes = () => {
  return useRoutes(
    [
      {
        element: <Content />,
        path: '/'
      },
      {
        element: <Login />,
        path: '/login'
      },
      {
        element: <Register />,
        path: '/register'
      },
      {
        element: <PrivateZone><Profile /></PrivateZone>,
        path: '/profile'
      },
      {
        element: <PrivateZone><CreatePost /></PrivateZone>,
        path: '/createpost'
      },
      {
        element: <PrivateZone><Content /></PrivateZone>,
        path: '/*'
      },
      {
        element: <PrivateZone><ProfileUserId /></PrivateZone>,
        path: '/profile/:userId'
      },
    ]
  );
}