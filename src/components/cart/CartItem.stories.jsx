import React from 'react'
import { mockData } from '../../../sampleData/cartItems'
import CartItem from './CartItem'

export default {
  component: CartItem,
  title: 'CartItem',
}

const Template = (args) => <CartItem {...args} />
export const Default = Template.bind({})
const cartData = mockData[0]
Default.args = {
  item: cartData,
}
