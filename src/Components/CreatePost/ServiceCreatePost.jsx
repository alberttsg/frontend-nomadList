import axios from 'axios'

export const ServiceCreatePost = async (body) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers:{
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  }

  console.log(body)

  //API BAD LANGUAGE

  const validation = await badLanguage(body)

  if(validation.data.classification == 1 || validation.data.classification == 2 || validation.data.classification == 3){
    return false
  }
  
  //API SENTIMENT

  const sentiment = await sentimentAnalysis(body)

  body.append('sentiment', sentiment.data.sentiment)

  const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/post/newpost', body, config)

  return res.data
}

const badLanguage = async (body) => {
  const content = {text:body.get('content')}
  const validation = await axios.post('https://flask-production-782a.up.railway.app/bad-language', content)
  return validation
}

const sentimentAnalysis = async (body) => {
  const content = {text:body.get('content')}
  
  const validation = await axios.post('https://flask-production-782a.up.railway.app/sentiment', content)
  return validation
}

