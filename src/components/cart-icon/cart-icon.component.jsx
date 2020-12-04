import React from 'react'
import './cart-icon.styles.scss'
import { useSelector, useDispatch } from 'react-redux'

import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

function CartIcon({ cartIsShown }) {
  const dispatch = useDispatch()

  // Determine cart quantity in reducer state
  const itemCount = useSelector(selectCartItemsCount)

  return (
    <div className='cart-icon' onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  )
}

export default CartIcon
