import React, { useState } from 'react'
import './CreatePost.scss'
import { PostCreated } from './PostCreated'
import { ServiceCreatePost } from './ServiceCreatePost'

export const CreatePost = () => {

  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    title:'',
    content:''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    ServiceCreatePost({ form })

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
    </div>
  )
}
