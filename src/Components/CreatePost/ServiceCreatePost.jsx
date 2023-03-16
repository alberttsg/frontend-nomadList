import axios from 'axios'

export const ServiceCreatePost = async ({ body }) => {
console.log(888888)
  const token = localStorage.getItem('token')
  console.log(token, 8888)

  const config = {
    headers:{
      Authorization:token
    }
  }

  const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/post/newpost', body, config)
  console.log(res)

  return res.data
}
