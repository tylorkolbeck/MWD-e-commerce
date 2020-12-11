import React from 'react'
import { Label, InputContainer } from './file-input.styles'

function FileInput({ label, onChange, ...rest }) {
  return (
    <InputContainer>
      <Label htmlFor='img'>{label}</Label>
      <input type='file' name='img' accept='image/*' onChange={onChange} />
    </InputContainer>
  )
}

export default FileInput
