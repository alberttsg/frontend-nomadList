import axios from 'axios'

export const ServiceCreatePost = async (body) => {
  // const validation = await badLanguage(body)
  // console.log(validation.classification, 6666)

  // if(validation.classification !== 4){
  //   return false
  // }

  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers:{
      'Authorization': token,
    }
  }

  const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/post/newpost', body, config)

  return res.data
}

const badLanguage = async (body) => {

  const content = {content:body.get('content')}

  const validation = await axios.post('https://flask-production-782a.up.railway.app/bad-language', content)
  return validation
}