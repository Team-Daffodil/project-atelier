import React from 'react'
import { mockData } from '../../../sampleData/cartItems'
import OrderSummary from './OrderSummary'

export default {
  component: OrderSummary,
  title: 'OrderSummary',
}

const Template = (args) => <OrderSummary {...args} />

export const Default = Template.bind({})
Default.args = {
  items: mockData,
}
