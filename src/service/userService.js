import { URL } from './endpoints';
import axios from 'axios';

export async function validateToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) return null;
  try {
    const response = axios.get(URL + 'token', { headers: { Authorization: token } });
    if (response == 'OK') return token;
  } catch (error) {
    return null;
  }
}

export async function login(user) {
  const { email, password } = user;
  if (!email || !password) throw new Error('Must provide all params');
  const response = await axios.post(URL + 'login', { email, password });
  return response.data.token;
}

export async function register(user) {
  const { firstName, lastName, email, password } = user;
  if (!firstName || !lastName || !email || !password) throw new Error('Must provide all params');
  const response = await axios.post(URL + 'register', { firstName, lastName, email, password });
  return response.data.token;
}

export async function getUserInfo(followers, followed, likedPosts) {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) throw new Error('Missing token in local storage')
  const query =
    (followers || followed || likedPosts ? '?' : null) +
    (followers ? 'populateFollowers=true' : null) +
    (followed ? 'populateFollowed=true' : null) +
    (likedPosts ? 'populateLikedPosts=true' : null);
  const response = await axios.get(URL + 'users/info' + query, { headers: { Authorization: token } });
  return response.data;
}