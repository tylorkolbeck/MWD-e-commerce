import React from 'react'

function FirebaseImage({ name, onChange, ...rest }) {
  return (
    <div>
      <input
        type='file'
        name={name}
        accept='image/*'
        onChange={onChange}
        {...rest}
      ></input>
    </div>
  )
}

export default FirebaseImage
