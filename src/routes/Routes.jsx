import { useRoutes } from 'react-router-dom';
import { HomePostLayout } from '../pages/Home/HomePostLayout';
import { Profile } from '../pages/Profile/Profile';
import { NotFound } from '../pages/NotFound/NotFound';

import { CreatePost } from '../Components/CreatePost/CreatePost';
import ProfileUserId from '../Components/ProfileUserId/ProfileUserId';

export const Routes = () => {
  return useRoutes(
    [
      {
        element: <HomePostLayout />,
        path: '/'
      },
      {
        element: <Profile />,
        path: '/profile/'
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
      {
        element: <NotFound />,
        path: '*'
      },
    ]
  );
}