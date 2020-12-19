import React from 'react'
import { ImageContainer } from './admin-image-preview.styles'
import AddIcon from '@material-ui/icons/Add'

export default function AdminImagePreview({ imageFile, noFileText }) {
  return (
    <ImageContainer>
      {imageFile ? (
        <img src={URL.createObjectURL(imageFile)} alt='featured' />
      ) : (
        <>
          <p>{noFileText ? noFileText : 'Select Image'}</p>
          <AddIcon />
        </>
      )}
    </ImageContainer>
  )
}
