import { useRoutes } from 'react-router-dom';
import { PrivateZone } from '../../guards/PrivateZone';
import { Content } from '../Content/Content';
import Countries from '../Countries/Countries';
import { CreatePost } from '../CreatePost/CreatePost';
import { CreatePostNew } from '../CreatePostNew/CreatePostNew';
import { Profile } from '../Profile/Profile';

export const Routes = () => {
  return useRoutes(

        [
              {
                element:<Content/> ,
                path: '/'
              },
              {
                element:<PrivateZone><Profile/></PrivateZone> ,
                path: '/profile'
              },
              {
                element:<PrivateZone><CreatePostNew/></PrivateZone> ,
                path: '/createpost'
              },
              {
                element:<PrivateZone><Content/></PrivateZone> ,
                path: '/*'
              },
              {
                element:<PrivateZone><Profile/></PrivateZone> ,
                path: '/profile/:userId'
              },
              {
                element:<Countries/> ,
                path: '/countries'
              },
        ]
        );

}