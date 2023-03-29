import axios from 'axios';
import { Avatar } from 'antd'

const token = JSON.parse(localStorage.getItem("token"));

export async function searchByName(input) {
  try{
    const findedUsers = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/search/${input}`,
      {
        headers: {
          Authorization: token
        }
      });
      const users = findedUsers.data.length > 0 ? findedUsers.data.map((item) => {
        return { key: 'profile/' + item._id, label: <><Avatar src={item.avatar} size='small' /><span style={{ marginLeft: '10px' }}>{item.firstName + ' ' + item.lastName}</span></>};
      }):[{ key: 'users0', label: 'No results', disabled: true }];
      const findedPost = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/search/${input}`,
      {
        headers: {
          Authorization: token
        }
      });
      console.log(findedPost.data);
      const posts = findedPost.data.length > 0 ? findedPost.data.map((item) => {
        return { key: 'profile/' + item.author, label: <><Avatar src={item.users[0].avatar} size='small' /><span style={{ marginLeft: '10px' }}>{item.title
        }</span></>};
      }):[{ key: 'post0', label: 'No results', disabled: true }];
      const items = [
        {
          key: 'users', type: 'group', label: 'Users',
          children: [...users],
        },
        {
          key: 'post', type: 'group', label: 'Post',
          children: [...posts],
        }
      ];
      return items;
    }catch(error) {
      return [
        {
          key: 'users', type: 'group', label: 'Users',
          children: [{ key: 'users0', label: 'No results', disabled: true }],
        },
        {
          key: 'post', type: 'group', label: 'Post',
          children: [{ key: 'post0', label: 'No results', disabled: true }],
        }
      ];
    }
}