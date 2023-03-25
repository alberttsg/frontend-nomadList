import axios from 'axios';

const URL = import.meta.env.VITE_DEV_URL;

export async function getUserById(userId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { Authorization: token } };
  const response = await axios.get(URL + 'users/id/' + userId, config);
  return response.data;
}

export async function editUserById(userId, update) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { Authorization: token } };
  const response = await axios.put(URL + 'users/id/' + userId, update, config);
  return response.data;
}

export async function deleteUserById(userId) {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(URL + 'users/id/' + userId, config);
  return response.data;
}