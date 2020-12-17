import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import generateUID from '../../utils/generateUID'
import Grid from '@material-ui/core/Grid'

import FormInput from '../form-input/form-input.component'
import SelectInput from '../select-input/select-input.component'
import FileInput from '../file-input/file-input.component'
import Button from '../button/button.component'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import {
  firebaseImageUpload,
  addItemToCollection
} from '../../firebase/firebase.utils'
import { createUrlsForImageFiles } from './utils/utils'

// *** SAVE THESE ON THE DATABASE ***
import sizeData from './utils/sizes-data'
import colorsData from './utils/color-data'

import { selectCollectionNames } from '../../redux/shop/shop.selectors'

import { FormContainer, SpanButton } from './admin-add-item.styles'

function AdminAddItem() {
  const [itemImages, setItemImages] = useState({
    featuredImage: [],
    colorsAndAssociatedImages: [],
    additionalImages: []
  })
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    gender: '',
    collection: '',
    tags: '',
    newCollection: '',
    sizes: []
  })

  const [formLoading, setFormLoading] = useState(false)

  const collectionNames = useSelector(selectCollectionNames)

  function handleAddAnotherColor() {
    setItemImages({
      ...itemImages,
      colorsAndAssociatedImages: [
        ...itemImages.colorsAndAssociatedImages,
        {
          id: generateUID(),
          file: null,
          colorText: '',
          hexColor: '',
          url: (file) => firebaseImageUpload(file)
        }
      ]
    })
  }

  function handleRemoveColor(id) {
    setItemImages({
      ...itemImages,
      colorsAndAssociatedImages: itemImages.colorsAndAssociatedImages.filter(
        (image) => image.id !== id
      )
    })
  }

  function updateColorAndAssociatedImageInState(imageId, field, value) {
    const newImages = itemImages.colorsAndAssociatedImages.map((image) => {
      if (image.id === imageId) {
        return {
          ...image,
          [field]: value
        }
      }
      return image
    })

    setItemImages({ ...itemImages, colorsAndAssociatedImages: newImages })
  }

  function addFeaturedImage(file) {
    setItemImages({
      ...itemImages,
      featuredImage: [
        {
          id: generateUID(),
          file: file,
          url: () => firebaseImageUpload(file)
        }
      ]
    })
  }

  function handleFormInput(event) {
    const { value, name, selectedOptions, multiple } = event.target

    if (value === 'newCollection') {
      setFormState({ ...formState, collection: value, newCollection: value })
      return
    }

    if (selectedOptions && multiple) {
      let value = Array.from(selectedOptions, (option) => option.value)
      setFormState({ ...formState, [name]: value })
    } else {
      if (Array.isArray(value)) {
        setFormState({ ...formState, [name]: value[0] })
      } else {
        setFormState({ ...formState, [name]: value })
      }
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    setFormLoading(true)

    const {
      name,
      description,
      price,
      gender,
      collection,
      tags,
      sizes,
      newCollection
    } = formState

    Promise.all([
      createUrlsForImageFiles(itemImages.featuredImage),
      createUrlsForImageFiles(itemImages.colorsAndAssociatedImages),
      createUrlsForImageFiles(itemImages.additionalImages)
    ]).then((imageGroups) => {
      const [
        featuredImage,
        colorsAndAssociatedImages,
        additionalImages
      ] = imageGroups

      const finalItemObject = {
        featuredImage,
        colorsAndAssociatedImages,
        additionalImages,
        name,
        description,
        collection: newCollection ? newCollection : collection,
        price,
        gender,
        tags: tags ? tags.split() : tags,
        sizes
      }

      addItemToCollection(finalItemObject.collection, finalItemObject)
        .then((item) => {
          setFormLoading(false)
          setFormState({
            name: '',
            description: '',
            price: '',
            gender: '',
            collection: '',
            tags: '',
            newCollection: '',
            sizes: []
          })

          setItemImages({
            featuredImage: [],
            colorsAndAssociatedImages: [],
            additionalImages: []
          })
        })
        .catch((error) => {
          setFormLoading(false)
          console.log(error)
        })

      // add the new item to state so we do not have to do another fetch here
    })
  }

  if (!formLoading)
    return (
      <FormContainer>
        <h2 style={{ textAlign: 'center' }}>Create A New Item</h2>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <h3 style={{ marginRight: '20px' }}>Featured Image</h3>
              <FileInput
                onChange={(event) => addFeaturedImage(event.target.files[0])}
                multiple={false}
                required
              />

              <Grid item xs={12}>
                <div>
                  {itemImages.featuredImage.file && (
                    <img
                      src={URL.createObjectURL(
                        itemImages.featuredImage[0].file
                      )}
                      alt='featured'
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInput
                label='Name'
                name='name'
                onChange={handleFormInput}
                value={formState.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label='Description'
                name='description'
                onChange={handleFormInput}
                value={formState.description}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormInput
                label='Price(USD)'
                name='price'
                onChange={handleFormInput}
                value={formState.price}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                name='gender'
                onChange={handleFormInput}
                value={formState.gender}
                required
              >
                <option value={null}>Gender</option>
                <option value='boy'>Boy</option>
                <option value='boy'>Girl</option>
                <option value='neutral'>Neutral</option>
              </SelectInput>
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                name='collection'
                onChange={handleFormInput}
                value={formState.collection}
                required
              >
                <option value={null} default>
                  Add To Collection
                </option>
                <option value='newCollection'>New Collection</option>
                {collectionNames.map((c) => (
                  <option key={`collection_name_${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
            </Grid>
            {/* If this is a new collection show input to name the collection */}
            {formState.collection === 'newCollection' && (
              <Grid item xs={3}>
                <FormInput
                  name='newCollection'
                  value={formState.newCollection}
                  onChange={handleFormInput}
                  label='Collection Name'
                  required
                />
              </Grid>
            )}
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormInput
                label='Tags(comma seperated)'
                name='tags'
                onChange={handleFormInput}
                value={formState.tags}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                name='sizes'
                label='Sizes'
                size={6}
                multiple
                onChange={handleFormInput}
                value={formState.sizes}
                required
              >
                {sizeData.map((c) => (
                  <option key={`size_${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>
                Colors{' '}
                <SpanButton onClick={handleAddAnotherColor}>
                  <AddCircleIcon />
                </SpanButton>
              </h2>
              <Grid item container alignItems='center'>
                {itemImages.colorsAndAssociatedImages.map((color) => (
                  <Grid
                    item
                    container
                    key={color.id}
                    alignItems='center'
                    spacing={3}
                  >
                    <Grid item xs={1}>
                      <SpanButton onClick={() => handleRemoveColor(color.id)}>
                        <DeleteForeverIcon />
                      </SpanButton>
                    </Grid>
                    <Grid item xs={3}>
                      <SelectInput
                        name='collectionName'
                        value={color.colorText}
                        required
                        onChange={(event) =>
                          updateColorAndAssociatedImageInState(
                            color.id,
                            'colorText',
                            event.target.value
                          )
                        }
                      >
                        <option value={null} default>
                          Color
                        </option>
                        {colorsData.map((c) => {
                          return (
                            <option key={`color_option_${c}`} value={c}>
                              {c}
                            </option>
                          )
                        })}
                      </SelectInput>
                    </Grid>

                    <Grid item xs={6}>
                      <FileInput
                        name='colorImage'
                        label='Associated Image'
                        onChange={(event) =>
                          updateColorAndAssociatedImageInState(
                            color.id,
                            'file',
                            event.target.files[0]
                          )
                        }
                      />
                    </Grid>
                    <Grid item>
                      <SpanButton onClick={handleAddAnotherColor}>
                        Add Another
                      </SpanButton>
                    </Grid>
                    <Grid item xs={12}>
                      {color.file && (
                        <img
                          src={URL.createObjectURL(color.file)}
                          style={{ height: '100px', width: 'auto' }}
                          alt='Featured'
                        />
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: '40px' }}>
            <Grid item>
              <Button type='submit'>Add Item To Shop</Button>
            </Grid>
            <Grid item>
              <Button type='button' inverted>
                Save Item As Draft
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    )
  else
    return (
      <div style={{ height: '300px' }}>
        <h1>Loading...</h1>
      </div>
    )
}

export default AdminAddItem
