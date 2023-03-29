import axios from 'axios';
import { Avatar } from 'antd'

const token = JSON.parse(localStorage.getItem("token"));

export async function searchByName(input) {
  try{
    const finded = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/search/${input}`,
      {
        headers: {
          Authorization: token
        }
      })
      const users = finded.data.length > 0 ? finded.data.map((item) => {
        return { key: 'profile/' + item._id, label: <><Avatar src={item.avatar} size='small' /><span style={{ marginLeft: '10px' }}>{item.firstName + ' ' + item.lastName}</span></>};
      }):[{ key: 'users0', label: 'No results', disabled: true }];
      const items = [
        {
          key: 'users', type: 'group', label: 'Users',
          children: [...users],
        }
      ];
      return items;
    }catch(error) {
      return [
        {
          key: 'users', type: 'group', label: 'Users',
          children: [{ key: 'users0', label: 'No results', disabled: true }],
        }
      ];
    }
}