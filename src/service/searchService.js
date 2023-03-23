import { URL } from './endpoints';
import axios from 'axios';

export async function searchService(input) {
  try {
    const res = await axios.get(URL + 'search/' + input);
    const users = res.data.users.length > 0 ? res.data.users.map(item => {
      return { key: 'profile/' + item._id, label: item.displayName }
    }) : [{ key: 'users0', label: 'No results', disabled: true }];
    const posts = res.data.posts.length > 0 ? res.data.posts.map(item => {
      return { key: 'post/' + item._id, label: item.title }
    }) : [{ key: 'posts0', label: 'No results', disabled: true }];
    const items = [
      {
        key: 'users', type: 'group', label: 'Users',
        children: [...users],
      },
      {
        key: 'posts', type: 'group', label: 'Posts',
        children: [...posts],
      }
    ];
    return items;
  } catch (error) {
    return [
      {
        key: 'users', type: 'group', label: 'Users',
        children: [{ key: 'users0', label: 'No results', disabled: true }],
      },
      {
        key: 'posts', type: 'group', label: 'Posts',
        children: [{ key: 'posts0', label: 'No results', disabled: true }],
      }
    ];
  }
}
