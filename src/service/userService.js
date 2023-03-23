import { URL } from './endpoints';
import axios from 'axios';

export async function validateToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) return null;
  try {
    axios.get(URL + 'token', { headers: { Authorization: token } });
    return token;
  } catch (error) {
    return null;
  }
}

export async function login(user) {
  const response = await axios.post(URL + 'login', user);
  return response.data.token;
}

export async function register(user) {
  const response = await axios.post(URL + 'register', user);
  return response.data.token;
}

export async function getUserInfo(followers, followed, likedPosts) {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) throw new Error('Missing token in local storage')
  const query = `?populateFollowers=${followers}&populateFollowed=${followed}&populateLikedPosts=${likedPosts}`;
  const response = await axios.get(URL + 'users/info' + query, { headers: { Authorization: token } });
  return response.data;
}