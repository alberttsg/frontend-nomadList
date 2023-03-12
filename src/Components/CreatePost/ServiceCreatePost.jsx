import axios from 'axios'

export const ServiceCreatePost = ({ body }) => {

  const token = localStorage.getItem('token')

  const config = {
    headers:{
      Authorization:token
    }
  }

  const res = axios.post('https://backend-nomadsociety-development.up.railway.app/post/newpost', body, config)
  console.log(res.data)

  return res.data
}
