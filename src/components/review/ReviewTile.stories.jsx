import React from 'react'
import { mockData } from '../../../sampleData/reviews'
import ReviewTile from './ReviewTile'

export default {
  component: ReviewTile,
  title: 'ReviewTile',
}

const reviewData = JSON.parse(mockData).results[0]
const Template = (args) => <ReviewTile review={args} />

export const Default = Template.bind({})
Default.args = {
  ...reviewData,
}

export const WithResponse = Template.bind({})
WithResponse.args = {
  ...Default.args,
  response: 'Thanks Britney11, we are glad you enjoy the shoes!',
}
