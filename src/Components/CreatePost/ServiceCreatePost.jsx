import axios from 'axios'

export const ServiceCreatePost = async (body) => {
  console.log(body)

  //API BAD LANGUAGE

  // const validation = await badLanguage(body)
  // console.log(validation.classification, 6666)

  // if(validation.classification !== 4){
  //   return false
  // }
  //API SENTIMENT

  // const sentiment = await sentimentAnalysis(body)
  // console.log(sentiment)

  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers:{
      'Authorization': token,
    }
  }

  // body.append('sentiment', sentiment)
  const res = await axios.post('https://backend-nomadsociety-production.up.railway.app/post/newpost', body, config)

  return res.data
}

const badLanguage = async (body) => {

  const content = {content:body.get('content')}

  const validation = await axios.post('https://flask-production-782a.up.railway.app/bad-language', content)
  return validation
}

const sentimentAnalysis = async (body) => {
  const content = {content:body.get('content')}

  const validation = await axios.post('https://flask-production-782a.up.railway.app/sentiment', content)
  return validation
}

