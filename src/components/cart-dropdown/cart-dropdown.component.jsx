import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import useClickOutside from '../../hooks/useClickOutside'
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton
} from './cart-dropdown.styles'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CartItem from '../cart-item/cart-item.component'

function CartDropdown({ cartIsShown }) {
  const cartItems = useSelector(selectCartItems)
  const history = useHistory()
  const dispatch = useDispatch()
  const { ref } = useClickOutside(cartIsShown, () =>
    dispatch(toggleCartHidden())
  )

  function handleGoToCart() {
    if (cartIsShown) {
      dispatch(toggleCartHidden())
    }
    history.push('/checkout')
  }

  return (
    <CartDropdownContainer ref={ref}>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Cart Is Empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      <CartDropdownButton onClick={handleGoToCart}>
        GO TO CHECKOUT
      </CartDropdownButton>
    </CartDropdownContainer>
  )
}

export default CartDropdown
