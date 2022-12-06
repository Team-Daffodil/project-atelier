import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewTile from './ReviewTile'

const reviewData = {
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

test('loads and renders ReviewTile', () => {
  render(<ReviewTile review={reviewData} />)
  expect(screen.getByText('Stars: 2')).toBeVisible()
  expect(screen.getByText('(1)')).toBeVisible()
})
