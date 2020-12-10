import React from 'react'
import {
  CartIconContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles'
import { useSelector, useDispatch } from 'react-redux'

import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

function CartIcon() {
  const dispatch = useDispatch()

  // Determine cart quantity in reducer state
  const itemCount = useSelector(selectCartItemsCount)

  return (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  )
}

export default CartIcon
