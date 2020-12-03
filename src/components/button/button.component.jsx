import React from 'react'
import './button.styles.scss'

function Button({ children, ...otherProps }) {
  return (
    <div className='button' {...otherProps}>
      {children}
    </div>
  )
}

export default Button
