import React from 'react'

import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeButton from '../../components/stripe-button/stripe-button.component'
import './checkout.styles.scss'
import CartItem from '../../components/cart-item/cart-item.component'

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <div className='total'>
        <span>TOTAL: ${cartTotal}</span>
      </div>
      <div className='test-warning'>
        *Test card number* <br />
        4242 4242 4242 4242 - Exp: 01/25 - CVV: 123
      </div>
      <StripeButton price={cartTotal} />
    </div>
  )
}

export default CheckoutPage
