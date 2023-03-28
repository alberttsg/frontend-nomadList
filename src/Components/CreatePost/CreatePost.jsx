import React, { useState } from 'react'
import { UploadImagesModal } from '../UploadImages/UploadImagesModal'
import { BadLanguage } from './BadLanguage'
import { PostCreated } from './PostCreated'
import { PostEmpty } from './PostEmpty'
import { ServiceCreatePost } from './ServiceCreatePost'
import { Button } from 'antd';
import './CreatePost.scss'
import { UploadOutlined } from '@ant-design/icons'

export const CreatePost = ()  => {

  const [formEpmty, setFormEmpty] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalLanguage, setModalLanguage] = useState(false)

  const handleForm = async(e) => {
    e.preventDefault()
    const objectForm = new FormData(e.target)
    const formObj = Object.fromEntries(objectForm)

    if(formObj.title == '' || formObj.content == '' || formObj.image?.name == ''){
      setFormEmpty(true)
      setTimeout(()=>{
        setFormEmpty(false)
      }, 2000)
      return
    }

    const res = await ServiceCreatePost(objectForm)

    if(!res){
      setModalLanguage(true)
      setTimeout(()=>{
      setModalLanguage(false)
    }, 2000)
      return
    }

    setModal(true)
    document.getElementById('form').reset()
    setTimeout(()=>{
      setModal(false)
    }, 3000)
  }

  return (
    <div className='container-form'>
      <form onSubmit={handleForm} id='form' className='form' encType="multipart/form-data" method="post">
        <input placeholder='Title'  className='input-title' type='text' name='title'   />
        <textarea placeholder='Content' className='textArea' name='content' />
        <label type='primary' htmlFor="image" className='ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default'> <UploadOutlined /> Click to Upload</label>
          <input type="file" name='image' className='input-file' id='image' />
        <p>o</p>
        <UploadImagesModal/>
        <Button type='primary' htmlType="submit"> Create Post</Button>
      </form>
      {modal && <PostCreated/>}
      {formEpmty && <PostEmpty/>}
      {modalLanguage && <BadLanguage/>}
    </div>
  )
}
