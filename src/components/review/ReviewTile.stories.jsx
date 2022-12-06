import React from 'react'
import ReviewTile from './ReviewTile'

export default {
  component: ReviewTile,
  title: 'ReviewTile',
}

const Template = (args) => <ReviewTile review={args} />

export const Default = Template.bind({})
Default.args = {
  rating: 2,
  summary: 'Great outfit',
  recommend: true,
  response: null,
  body: 'Very comfortable!',
  date: '2022-10-28T00:00:00.000Z',
  reviewerName: 'Brian123',
  helpfulness: 1,
  photos: [
    {
      id: 2456642,
      url: 'http://res.cloudinary.com/dmmzqckuu/image/upload/v1666985076/zcfhcxavufcg3hijsqsc.jpg',
    },
  ],
}
