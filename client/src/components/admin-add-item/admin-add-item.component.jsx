import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import FormInput from '../form-input/form-input.component'
import SelectInput from '../select-input/select-input.component'
import FileInput from '../file-input/file-input.component'
import Button from '../button/button.component'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCircleIcon from '@material-ui/icons/AddCircle'

// *** SAVE THESE ON THE DATABASE ***
import sizeData from './utils/sizes-data'
import colors from './utils/color-data'

import { selectCollectionNames } from '../../redux/shop/shop.selectors'

import { FormContainer } from './admin-add-item.styles'

function AdminAddItem() {
  const [formState, setFormState] = useState({
    colors: [
      {
        id: '0',
        color: 'Sedona',
        file: ''
      }
    ]
  })
  const collectionNames = useSelector(selectCollectionNames)

  function handleAddAnotherColor() {
    setFormState({
      ...formState,
      colors: [
        ...formState.colors,
        { color: '', file: '', id: formState.colors.length + 1 }
      ]
    })
  }

  function handleRemoveColor(id) {
    setFormState({
      ...formState,
      colors: formState.colors.filter((color) => color.id !== id)
    })
  }

  return (
    <FormContainer>
      <h2 style={{ textAlign: 'center' }}>Create A New Item</h2>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <h3 style={{ marginRight: '20px' }}>Featured Image</h3>
              <FileInput />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput label='Name' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput label='Description' />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormInput label='Price(USD)' />
          </Grid>
          <Grid item xs={3}>
            <SelectInput name='gender'>
              <option value={null}>Gender</option>
              <option value='boy'>Boy</option>
              <option value='boy'>Girl</option>
              <option value='neutral'>Neutral</option>
            </SelectInput>
          </Grid>
          <Grid item xs={6}>
            <SelectInput name='collectionName'>
              <option value={null} default>
                Add To Collection
              </option>
              <option value='new'>New Collection</option>
              {collectionNames.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <FormInput label='Tags(comma seperate)' />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SelectInput name='sizes' label='Sizes' multiple size={6}>
              {sizeData.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Colors</h2>
            <Grid item container alignItems='center'>
              {formState.colors.map((color) => (
                <Grid
                  item
                  container
                  key={`color_${color.id}`}
                  alignItems='center'
                  spacing={3}
                >
                  <Grid item xs={1}>
                    <span onClick={() => handleRemoveColor(color.id)}>
                      <DeleteForeverIcon />
                    </span>
                  </Grid>
                  <Grid item xs={3}>
                    <SelectInput name='collectionName'>
                      <option value={null} default>
                        Color
                      </option>
                      {colors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </SelectInput>
                  </Grid>

                  <Grid item xs={6}>
                    <FileInput label='Associated Image' />
                  </Grid>
                  <Grid item xs={1}>
                    <span onClick={handleAddAnotherColor}>
                      <AddCircleIcon />
                    </span>
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
            <Button type='button' inverted type='submit'>
              Save Item As Draft
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default AdminAddItem
