import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeButton from '../../components/stripe-button/stripe-button.component'
import { clearCart } from '../../redux/cart/cart.actions'

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkout.styles'

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatchClearCart = useDispatch()

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <TotalContainer>
        <span>TOTAL: ${cartTotal}</span>
      </TotalContainer>
      <WarningContainer>
        *Test card number* <br />
        4242 4242 4242 4242 - Exp: 01/25 - CVV: 123
      </WarningContainer>
      <StripeButton
        price={cartTotal}
        afterPayment={() => dispatchClearCart(clearCart())}
      />
    </CheckoutPageContainer>
  )
}

export default CheckoutPage
