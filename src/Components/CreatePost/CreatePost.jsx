import React, { useState } from 'react'
import './CreatePost.scss'
import { PostCreated } from './PostCreated'
import { PostEmpty } from './PostEmpty'
import { ServiceCreatePost } from './ServiceCreatePost'

export const CreatePost = () => {

  const [formEpmty, setFormEmpty] = useState(false)
  const [modal, setModal] = useState(false)
 
  
  const handleForm = (e) => {
    e.preventDefault()
    const objectForm = new FormData(e.target)
    const formObj = Object.fromEntries(objectForm)
    if(formObj.title == '' || formObj.content == '' || formObj.image.name == ''){
      setFormEmpty(true)
      setTimeout(()=>{
        setFormEmpty(false)
      }, 2000)
      return
    }
    ServiceCreatePost(objectForm)
    setModal(true)
    document.getElementById('form').reset();
    setTimeout(()=>{
      setModal(false)
    }, 3000)
  }

  return (
    <div className='container-form'>
      <form onSubmit={handleForm} id='form' className='form' encType="multipart/form-data" method="post">
        <input placeholder='Title'  className='input-title' type='text' name='title'   />
        <textarea placeholder='Content' className='textArea' name='content' />
        <input type="file" name='image' id='image' />
        <input className='input-submit' type='submit' value='Create'/>   
      </form>
      {modal && <PostCreated/>}
      {formEpmty && <PostEmpty/>}
    </div>
  )
}
