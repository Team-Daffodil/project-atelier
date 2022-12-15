import React from 'react'

import Delivery from './Delivery'

export default {
  component: Delivery,
  title: 'DeliveryForm',
}

const Template = (args) => <Delivery {...args} />

export const Default = Template.bind({})
Default.args = {}
