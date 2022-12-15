import React from 'react'

import { mockData } from '../../../sampleData/cartItems'
import CartDetails from './CartDetails'

export default {
  component: CartDetails,
  title: 'CartDetails',
}

const Template = (args) => <CartDetails {...args} />

export const Default = Template.bind({})
Default.args = {
  items: mockData,
  updateCartItemsHandler: () => {
    console.log('here I am')
  },
}
