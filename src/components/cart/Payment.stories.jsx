import React from 'react'

import Payment from './Payment'

export default {
  component: Payment,
  title: 'Payment',
}

const Template = (args) => <Payment {...args} />

export const Default = Template.bind({})
Default.args = {}
