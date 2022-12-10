import React from 'react'
import Review from './Review'

export default {
  component: Review,
  title: 'Review',
}

const Template = (args) => <Review {...args} handleSetReviewData={() => {}} />

export const Default = Template.bind({})
Default.args = {
  productId: 1,
}
