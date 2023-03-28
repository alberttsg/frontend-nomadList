import { useRoutes } from 'react-router-dom';
import { PrivateZone } from '../../guards/PrivateZone';
import { Content } from '../Content/Content';
import Countries from '../Countries/Countries';
import { CreatePost } from '../CreatePost/CreatePost';
import { PostHomeLayout } from '../PostComponent/PostHomeLayout';
import { Profile } from '../Profile/Profile';
import { NotFound } from '../Content/NotFound';

export const Routes = () => {
  return useRoutes(
    [
      {
        element: <Content><PostHomeLayout /></Content>,
        path: '/'
      },
      {
        element: <PrivateZone><Content><Profile /></Content></PrivateZone>,
        path: '/profile'
      },
      {
        element: <PrivateZone><Content><Profile /></Content></PrivateZone>,
        path: '/profile/:userId'
      },
      {
        element: <PrivateZone><CreatePost /></PrivateZone>,
        path: '/createpost'
      },
      {
        element: <Content><Countries /></Content>,
        path: '/countries'
      },
      {
        element: <PrivateZone><Content><NotFound /></Content></PrivateZone>,
        path: '*'
      },
    ]
  );

}