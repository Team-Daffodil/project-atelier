import React from 'react'
import { mockData } from '../../../sampleData/review_meta'
import NewReviewForm from './NewReviewForm'

export default {
  component: NewReviewForm,
  title: 'NewReviewForm',
}

const Template = (args) => <NewReviewForm {...args} />

export const Default = Template.bind({})
Default.args = { productInfo: JSON.parse(mockData) }
