import React from 'react'
import {
  render,
  screen,
  within,
  waitFor,
  fireEvent,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { handlers } from '../../lib/apiMockHandlers'

import ReviewList from './ReviewList'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
beforeAll(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and renders ReviewList with a max of 2 reviews showing', async () => {
  const { getByTitle } = render(<ReviewList productId={1} />)

  await waitFor(() => {
    expect(getByTitle('review-list')).toBeVisible()
  })
  expect(getByTitle('review-list').childElementCount).toEqual(2)
})

test('loads more 2 more reviews when "More Reviews" button clicked', async () => {
  const { getByTitle, getByRole } = render(<ReviewList productId={1} />)

  await waitFor(() => {
    expect(getByTitle('review-list')).toBeVisible()
  })
  const moreBtn = getByRole('link', { name: 'More Reviews' })
  fireEvent.click(moreBtn)
  await expect(getByTitle('review-list').childElementCount).toEqual(4)
})

test('"More Reviews" button disappears when all reviews have been loaded', async () => {
  const { getByTitle, getByRole } = render(<ReviewList productId={1} />)

  await waitFor(() => {
    expect(getByTitle('review-list')).toBeVisible()
  })
  const moreBtn = getByRole('link', { name: 'More Reviews' })
  fireEvent.click(moreBtn)
  fireEvent.click(moreBtn)
  fireEvent.click(moreBtn)
  fireEvent.click(moreBtn)
  fireEvent.click(moreBtn)
  await expect(moreBtn).not.toBeVisible()
})

// test when newest is clicked
test('Reviews display by newest order when "newest" is selected', async () => {
  const { getByLabelText, getByTitle, getByText } = render(
    <ReviewList productId={1} />
  )

  const newestOption = getByLabelText('newest')
  fireEvent.click(newestOption)
  await waitFor(() =>
    expect(getByTitle('review-list').childElementCount).toEqual(2)
  )
  expect(getByText('October 22, 2022')).toBeVisible()
})

test('Reviews display by most helpful order when "helpful" is selected', async () => {
  const { getByLabelText, getByTitle, getByText } = render(
    <ReviewList productId={1} />
  )

  const helpfulOption = getByLabelText('helpful')
  fireEvent.click(helpfulOption)
  await waitFor(() =>
    expect(getByTitle('review-list').childElementCount).toEqual(2)
  )
  expect(getByText('(101)')).toBeVisible()
})
