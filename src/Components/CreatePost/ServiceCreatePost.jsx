import axios from 'axios'

export const ServiceCreatePost = async ({ body }) => {

  const token = localStorage.getItem('token')

  const config = {
    headers:{
      Authorization:token
    }
  }

  const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/', body, config)
  console.log(res)

  return res.data
}
