import React from 'react'
import ReviewSidePanel from './ReviewSidePanel'

export default {
  component: ReviewSidePanel,
  title: 'ReviewSidePanel',
}

const Template = (args) => (
  <ReviewSidePanel {...args} handleSetRating={() => {}} />
)

export const Default = Template.bind({})
Default.args = {
  productId: 1,
}
