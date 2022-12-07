import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import ReviewTile from './ReviewTile'

const reviewData = {
  reviewId: 1,
  rating: 2,
  summary:
    'This is a long review title that should exceed the maximum 60 characters',
  recommend: true,
  response: null,
  body: `Lorem ipsum dolor sit amet. Aut repellendus expedita aut velit possimus et nostrum mollitia eos explicabo omnis et quia vitae quo recusandae repudiandae hic nisi quaerat. Et dolor eveniet non reprehenderit libero 33 tempora cumque. At commodi doloremque eos quisquam Quis sed quia commodi et aliquam accusantium et quia voluptatem et quibusdam cupiditate. Et voluptatem nihil aut dolorem animi aut dignissimos illum et saepe reiciendis At accusantium explicabo in minus nesciunt eum neque inventore.

  Vel debitis recusandae eum sint voluptatem non dolores consequuntur. Eos culpa repellendus sit amet recusandae et nihil quae eum minima veniam id reiciendis sint ea voluptatem eligendi.

  Ut voluptas natus nam harum enim est molestiae possimus. Et rerum animi et voluptatem dolores aut nesciunt consequuntur. Et veniam facilis est maxime facere est nihil quia qui sequi consectetur et odit delectus qui inventore voluptatem eos quos error! Non voluptas facere aut quae dignissimos vel nihil voluptatem et ratione doloremque non enim ducimus.`,
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

const server = setupServer(
  rest.put('*/reviews/:reviewId/helpful', (req, res, ctx) => {
    const { reviewId } = req.params
    if (reviewId === '1') {
      return res(ctx.status(204))
    }
    return res(ctx.status(500))
  }),
  rest.put('*/reviews/:reviewId/report', (req, res, ctx) => {
    const { reviewId } = req.params
    if (reviewId === '1') {
      return res(ctx.status(204))
    }
    return res(ctx.status(500))
  })
)

beforeAll(() => server.listen())
beforeAll(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and renders ReviewTile', () => {
  render(<ReviewTile review={reviewData} />)
  expect(screen.getByText('Stars: 2')).toBeVisible()
  expect(screen.getByText('(1)')).toBeVisible()
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
  await waitFor(() => screen.getByText('(2)'))
  expect(yesBtn).toHaveStyle('font-weight: 900')
})

test('should send a PUT request when "no" clicked', async () => {
  const { getByRole } = render(<ReviewTile review={reviewData} />)
  const noBtn = getByRole('link', { name: 'No' })
  fireEvent.click(noBtn)
  await waitFor(() => expect(noBtn).toHaveStyle('font-weight: 900'))
})
