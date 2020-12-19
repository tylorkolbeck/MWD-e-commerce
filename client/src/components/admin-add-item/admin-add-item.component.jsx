import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import generateUID from '../../utils/generateUID'
import Grid from '@material-ui/core/Grid'

import FormInput from '../form-input/form-input.component'
import SelectInput from '../select-input/select-input.component'
import FileInput from '../file-input/file-input.component'
import Button from '../button/button.component'
import AdminImagePreview from '../admin-image-preview/admin-image-preview.component'
import SectionHeader from '../section-header/section-header.component'

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

  function handleAddAdditionalImage() {
    setItemImages({
      ...itemImages,
      additionalImages: [
        ...itemImages.additionalImages,
        {
          id: generateUID(),
          file: null,
          url: (file) => firebaseImageUpload(file)
        }
      ]
    })
  }

  function handleRemoveAssociatedImage(id) {
    setItemImages({
      ...itemImages,
      additionalImages: itemImages.additionalImages.filter(
        (image) => image.id !== id
      )
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

  function updateImageInCategory(imageCategory, imageId, field, value) {
    const newImages = itemImages[imageCategory].map((image) => {
      if (image.id === imageId) {
        return {
          ...image,
          [field]: value
        }
      }
      return image
    })

    setItemImages({ ...itemImages, [imageCategory]: newImages })
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

    if (selectedOptions && multiple) {
      let value = Array.from(selectedOptions, (option) => option.value)
      setFormState({ ...formState, [name]: value })
    } else {
      console.log(value)
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
        <SectionHeader text='Product Details' />
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            {/* Featured Image */}
            <Grid item>
              <FileInput
                onChange={addFeaturedImage}
                multiple={false}
                required
                preview
                previewText='Select Featured Image'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormInput
                label='Name'
                name='name'
                onChange={handleFormInput}
                value={formState.name}
                required
              />

              <FormInput
                label='Description'
                name='description'
                onChange={handleFormInput}
                value={formState.description}
                required
              />

              <FormInput
                label='Price(USD)'
                name='price'
                onChange={handleFormInput}
                value={formState.price}
                required
              />

              <FormInput
                label='Tags(comma seperated)'
                name='tags'
                onChange={handleFormInput}
                value={formState.tags}
              />

              <Grid item container spacing={2}>
                <Grid item xs={6}>
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

                <Grid item xs={6}>
                  <SelectInput
                    label='Gender'
                    name='gender'
                    onChange={handleFormInput}
                    value={formState.gender}
                    required
                  >
                    <option value=''>Gender</option>
                    <option value='boy'>Boy</option>
                    <option value='girl'>Girl</option>
                    <option value='neutral'>Neutral</option>
                  </SelectInput>

                  <SelectInput
                    name='collection'
                    label='Collection'
                    onChange={handleFormInput}
                    value={formState.collection}
                    required
                    disabled={formState.newCollection ? true : false}
                  >
                    <option value={null} default>
                      Add To Collection
                    </option>
                    {collectionNames.map((c) => (
                      <option key={`collection_name_${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </SelectInput>

                  <FormInput
                    name='newCollection'
                    value={formState.newCollection}
                    onChange={handleFormInput}
                    label='New Collection'
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* COLORS AND ASSOCIATED COLORS */}
            <Grid item container>
              <SectionHeader text='Colors and Associated Images' />

              <Grid item container spacing={2}>
                {itemImages.colorsAndAssociatedImages.map((color) => (
                  <Grid item container xs={12} md={3} key={color.id}>
                    <Grid item>
                      {/* <AdminImagePreview imageFile={color.file} /> */}
                      <FileInput
                        preview
                        previewText='Select Color Image'
                        name='colorImage'
                        onDelete={() => handleRemoveColor(color.id)}
                        onChange={(file) =>
                          updateImageInCategory(
                            'colorsAndAssociatedImages',
                            color.id,
                            'file',
                            file
                          )
                        }
                      />
                      <SelectInput
                        name='collectionName'
                        value={color.colorText}
                        required
                        onChange={(event) =>
                          updateImageInCategory(
                            'colorsAndAssociatedImages',
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
                  </Grid>
                ))}
              </Grid>

              <Grid item>
                <Button onClick={handleAddAnotherColor} inverted type='button'>
                  Add Color
                </Button>
              </Grid>
            </Grid>

            {/* PRODUCT IMAGES */}
            <Grid item container>
              <SectionHeader text='Product Images' />

              <Grid item container spacing={2}>
                {itemImages.additionalImages.map((image) => {
                  return (
                    <Grid
                      item
                      style={{ display: 'flex', alignItems: 'center' }}
                      xs={12}
                      md={3}
                      key={image.id}
                    >
                      <Grid item container direction='column'>
                        {/* <Grid item>
                          <AdminImagePreview imageFile={image.file} />
                        </Grid> */}
                        <Grid item>
                          <FileInput
                            preview
                            name='colorImage'
                            onDelete={() =>
                              handleRemoveAssociatedImage(image.id)
                            }
                            onChange={(file) =>
                              updateImageInCategory(
                                'additionalImages',
                                image.id,
                                'file',
                                file
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })}

                <Grid item xs={12}>
                  <Button
                    onClick={handleAddAdditionalImage}
                    inverted
                    type='button'
                  >
                    Add Image
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT BUTTONS */}
            <Grid item container>
              <Button type='submit' mr>
                Add Item To Shop
              </Button>
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
