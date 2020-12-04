import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import useClickOutside from '../../hooks/useClickOutside'
import './cart-dropdown.styles.scss'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

function CartDropdown({ cartIsShown }) {
  const cartItems = useSelector(selectCartItems)
  const history = useHistory()
  const dispatch = useDispatch()
  const { ref } = useClickOutside(cartIsShown, () =>
    dispatch(toggleCartHidden())
  )

  function handleGoToCart() {
    dispatch(toggleCartHidden())
    history.push('/checkout')
  }

  return (
    <div className='cart-dropdown' ref={ref}>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Cart Is Empty</span>
        )}
      </div>
      <Button onClick={handleGoToCart}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
