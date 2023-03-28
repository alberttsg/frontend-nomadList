import axios from 'axios';
import { Avatar } from 'antd';

export async function searchService(input) {
  try {
    const res = await axios.get(import.meta.env.VITE_DEV_URL + 'search/' + input);
    const users = res.data.users.length > 0 ? res.data.users.map((item, index) => {
      if (index > 9) return;
      return { key: 'profile/' + item._id, label: <><Avatar src={item.avatar} size='small' /><span style={{ marginLeft: '10px' }}>{item.displayName}</span></> }
    }) : [{ key: 'users0', label: 'No results', disabled: true }];
    const posts = res.data.posts.length > 0 ? res.data.posts.map((item, index) => {
      if (index > 9) return;
      return { key: 'post/' + item._id, label: item.title.substring(0, 50) + '...' }
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