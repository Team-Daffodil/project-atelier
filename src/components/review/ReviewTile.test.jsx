import React from 'react'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { handlers } from '../../lib/apiMockHandlers'
import { mockData } from '../../../sampleData/reviews'
import ReviewTile from './ReviewTile'

const reviewData = JSON.parse(mockData).results[0]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
beforeAll(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and renders ReviewTile', () => {
  render(<ReviewTile review={reviewData} />)
  expect(screen.getByText('Stars: 5')).toBeVisible()
  expect(screen.getByText('(9)')).toBeVisible()
})

test('review body should expand and contract', async () => {
  render(<ReviewTile review={reviewData} />)
  const toggleBtn = screen.getByText('Show more')
  const reviewContent = screen.getByTitle('review-content')

  // check if toggleBtn is visible with 'Show more'
  // check if reviewContent is less than 255 characters.
  expect(toggleBtn).toBeVisible()
  expect(reviewContent.textContent.length).toBeLessThan(255)

  // fire off a click to toggle to expand
  fireEvent.click(toggleBtn)
  await screen.findByText('Show less')

  // Check if toggleBtn has text 'Show less'
  // check if reviewContent is greater than 300 characters.
  expect(toggleBtn).toHaveTextContent('Show less')
  expect(reviewContent.textContent.length).toBeGreaterThan(300)

  // fire off a click to toggle to minimize once again
  fireEvent.click(toggleBtn)
  await screen.findByText('Show more')

  expect(toggleBtn).toHaveTextContent('Show more')
  expect(reviewContent.textContent.length).toBeLessThan(255)
})

test('display response when review.response is not null', () => {
  const { queryByRole } = render(<ReviewTile review={reviewData} />)
  expect(queryByRole('note')).not.toBeInTheDocument()
  const newData = {
    ...reviewData,
    response: 'This is the response',
  }

  const { getByRole } = render(<ReviewTile review={newData} />)
  expect(getByRole('note')).toBeVisible()
  expect(screen.getByText('This is the response')).toBeVisible()
})

test('should send a PUT request when "yes" clicked', async () => {
  const { getByRole } = render(<ReviewTile review={reviewData} />)
  const yesBtn = getByRole('link', { name: 'Yes' })
  fireEvent.click(yesBtn)
  await waitFor(() => screen.getByText('(10)'))
  expect(yesBtn).toHaveStyle('font-weight: 900')
})

test('should send a PUT request when "no" clicked', async () => {
  const { getByRole } = render(<ReviewTile review={reviewData} />)
  const noBtn = getByRole('link', { name: 'No' })
  fireEvent.click(noBtn)
  await waitFor(() => expect(noBtn).toHaveStyle('font-weight: 900'))
})
