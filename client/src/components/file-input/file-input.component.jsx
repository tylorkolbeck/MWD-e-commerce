import React, { useState } from 'react'
import { Label, InputContainer, DeleteIconContainer } from './file-input.styles'
import Grid from '@material-ui/core/Grid'
import ImagePreview from '../admin-image-preview/admin-image-preview.component'

function FileInput({
  label,
  onChange,
  onDelete,
  preview,
  previewText,
  ...rest
}) {
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)

  const fadeOut = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      handleRemoveItem()
    }, 300)
  }

  const handleRemoveItem = () => {
    setIsFadingOut(false)
    onDelete()
  }

  const handleImageChange = (event) => {
    const image = event.target.files[0]
    setImageSelected(image)
    onChange(image)
  }

  return (
    <Grid container direction='column'>
      <InputContainer className={isFadingOut ? 'item-fadeout' : ''}>
        <Label>
          {preview && (
            <ImagePreview imageFile={imageSelected} noFileText={previewText} />
          )}

          <input
            type='file'
            name='img'
            accept='image/*'
            id='img'
            onChange={handleImageChange}
            {...rest}
          />
        </Label>
        {onDelete && (
          <DeleteIconContainer onClick={() => fadeOut()}>
            Remove
          </DeleteIconContainer>
        )}
      </InputContainer>
    </Grid>
  )
}

export default FileInput
