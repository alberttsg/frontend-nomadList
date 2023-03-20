import axios from 'axios'

export const ServiceSearch = async (params) => {

  const token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers:{
      'Authorization': token
    }
  }
  const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users?firstName=${params}`, config)

  return res
}
