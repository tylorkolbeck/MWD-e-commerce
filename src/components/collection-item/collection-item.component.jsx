import React from 'react'
import './collection-item.styles.scss'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'

import Button from '../button/button.component'

function CollectionItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />
      <div className='collection-footer'>
        <span className='name'>{item.name}</span>
        <span className='price'>{item.price}</span>
      </div>
      <Button inverted onClick={() => dispatch(addItem(item))}>
        Add to cart
      </Button>
    </div>
  )
}

export default CollectionItem
