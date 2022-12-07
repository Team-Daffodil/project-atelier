import React from 'react'
import ReviewList from './ReviewList'

export default {
  component: ReviewList,
  title: 'ReviewList',
}

const Template = (args) => <ReviewList {...args} />

export const Default = Template.bind({})
Default.args = {
  productId: 1,
}
