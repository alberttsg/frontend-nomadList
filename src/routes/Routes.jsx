import { useRoutes } from 'react-router-dom';
import { CreatePost } from '../Components/CreatePost/CreatePost';
import { Profile } from '../pages/Profile/Profile';
import ProfileUserId from '../Components/ProfileUserId/ProfileUserId';
import { HomePostLayout } from '../pages/Home/HomePostLayout';

export const Routes = () => {
  return useRoutes(
    [
      {
        element: <HomePostLayout />,
        path: '/'
      },
      {
        element: <Profile />,
        path: '/profile/:id'
      },
      // {
      //   element: <Post />,
      //   path: '/post'
      // },
      // {
      //   element: <CreatePost />,
      //   path: '/createpost'
      // },
    ]
  );
}