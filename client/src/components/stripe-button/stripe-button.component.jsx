import React from 'react'
import StripeCheckOut from 'react-stripe-checkout'
import axios from 'axios'

function StripeButton({ price, afterPayment }) {
  const priceForStripe = price * 100
  const publishKey =
    'pk_test_51HuUrfCIRgCo5psrhwfsB0c92hrZxJpuD5zV7xBKhr5OLgBedQQsgf6PPCFEZsfYt0R19i5IAYfqEkYkCF297WiA00l9f5K7fg'

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then((response) => {
        console.log('PAYMENT SUCCESS')
      })
      .catch((error) => {
        console.log('PAYMENT ERROR: ', JSON.parse(error))
      })
    afterPayment()
  }

  return (
    <StripeCheckOut
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishKey}
    />
  )
}

export default StripeButton
