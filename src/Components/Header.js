import React from 'react'
import Button from './Button'

const Header = ({title}) => {
  return (
    <header className='header'>
        <h1><u>{title}</u></h1>
    </header>
  )
}

export default Header