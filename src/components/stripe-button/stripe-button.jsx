import React from 'react'

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_ET0H1q6lYdXbZAE41LVZouef00boRujWKw'

  const onToken = token => {
    console.log(token)
    alert('Payment successful')
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Sally Clothing'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton