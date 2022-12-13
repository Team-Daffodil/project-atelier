import React from 'react'
import { mockData } from '../../../sampleData/cartItems'

import Cart from './Cart'

export default {
  component: Cart,
  title: 'Cart',
}

const Template = (args) => <Cart {...args} />

export const Default = Template.bind({})
Default.args = {
  appState: { cart: mockData },
}
