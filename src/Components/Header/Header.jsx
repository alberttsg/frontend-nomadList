import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import './Header.scss'

export const Header = () => {
  return (
    <div className='header'>
      <div>
        <input type='text' placeholder='Buscar en nomad'/>
        <SearchOutlined className='search' />
      </div>
    </div>
  )
}
