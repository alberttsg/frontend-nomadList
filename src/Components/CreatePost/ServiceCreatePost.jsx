import axios from 'axios'

export const ServiceCreatePost = async ({ body }) => {

  const token = localStorage.getItem('token')

  const config = {
    headers:{
      Authorization:token
    }
  }

  const res = await axios.post('http://clone-backend-production.up.railway.app/post/newpost', body, config)
  console.log(res)

  return res.data
}
