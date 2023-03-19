import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './Header.scss'
import { ServiceSearch } from './ServiceSearch.js'

export const Header = () => {

  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState([])
  const [display, setDisplay] = useState('display')

  // const setState = (e) => {
  //   setSearch(e.target.value)
  //   console.log(search)
  // }

  // const searchFunction = async (e) => {

  //   setSearch(e.target.value)
  //   console.log(search)
  //   const res = await ServiceSearch(search)
  //   console.log(res.data)

  //   if(res.data.length > 6){
  //     res.data.splice(6, res.data.length)
  //   }

  //   setSearched(res.data)
  //   setDisplay('x')

  // }

  useEffect(()=>{

    const usersSearch = async () =>{
      const res = await ServiceSearch(search)
      console.log(res.data.length)

      if(res.data.length > 7){
        res.data.splice(7, res.data.length)
      }

      setSearched(res.data)
    }
    usersSearch()

  },[search])

  const onBlur = (e) =>{
    setDisplay('display')
    e.target.value = ''
  }

  return (
    <div className='header'>
      <div className='divInput'>
        <input type='text' placeholder='Busca gente en nomad' onChange={(e)=>setSearch(e.target.value)} onFocus={()=>setDisplay('x')} onBlur={onBlur}/>
      </div>
      <div className='divSearch' id={display}>
      {searched.map((e, index)=>(
        <div className='searched' key={`searched ${index}`}>
          <div className='divImg'>
            {e.avatar ? <img src={e.avatar}/> : <img src={'https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg'}/>}
          </div>
          <div>
            {e.displayName}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
