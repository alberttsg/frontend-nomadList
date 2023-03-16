import React, { useState } from 'react'
import './CreatePost.scss'
import { PostCreated } from './PostCreated'
import { PostEmpty } from './PostEmpty'
import { ServiceCreatePost } from './ServiceCreatePost'

export const CreatePost = () => {

  const [formEpmty, setFormEmpty] = useState(false)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    title:'',
    content:''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if(form.title == '' || form.content == ''){
      setFormEmpty(true)

    setTimeout(()=>{
      setFormEmpty(false)
    }, 2000)
      return
    }

    ServiceCreatePost(form)

    setForm({
      title:'',
      content:''
    })

    setModal(true)

    setTimeout(()=>{
      setModal(false)
    }, 3000)
  }

  return (
    <div className='container-form'>
      <form onSubmit={handleSubmit} className='form'>
        <input placeholder='Title' className='input-title' type='text' name='title' value={form.title} onChange={(e)=>setForm({...form, [e.target.name] : e.target.value})}/>
        <textarea placeholder='Content' className='textArea' name='content' value={form.content} onChange={(e)=>setForm({...form, [e.target.name] : e.target.value})}/>
        <input className='input-submit' type='submit' value='Create'/>
      </form>
      {modal && <PostCreated/>}
      {formEpmty && <PostEmpty/>}
    </div>
  )
}
