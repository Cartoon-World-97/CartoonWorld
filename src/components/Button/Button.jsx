import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'
const Button = () => {
  return (
    <>
      <Link to="/" className='btn w-95 h-26 button'>Start Now</Link>
    </>
  )
}

export default Button
