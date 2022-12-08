import React from 'react'
import {
  render,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { handlers } from '../../lib/apiMockHandlers'
import Review from './Review'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
beforeAll(() => server.resetHandlers())
afterAll(() => server.close())

test('loads Review component', async () => {
  const { getAllByTestId } = render(<Review productId={1} />)
  await waitFor(() => {
    expect(getAllByTestId('review-tile')).toBeTruthy()
  })
  expect(getAllByTestId('review-tile')).toHaveLength(2)
})

test('filters by Star rating when clicking various ratings', async () => {
  const {
    getByRole,
    getAllByTestId: queryAllByTestId,
    getByText,
  } = render(<Review productId={1} />)

  await waitFor(() => {
    expect(queryAllByTestId('review-tile')).toBeTruthy()
  })

  // There is 1 '2 star' review
  const twoStarBtn = getByRole('link', { name: '2 stars' })
  fireEvent.click(twoStarBtn)
  await waitFor(() => {
    expect(queryAllByTestId('review-tile')).toHaveLength(1)
  })
  expect(getByText('Defective shoe')).toBeVisible()

  // There is 0 '4 star' review
  const fourStarBtn = getByRole('link', { name: '4 stars' })
  fireEvent.click(fourStarBtn)
  await waitForElementToBeRemoved(() => getByText('Defective shoe'))

  expect(getByText(/0 reviews/)).toBeInTheDocument()
})

test('toggles star rating on and off if user clicks the same Star rating', async () => {
  const {
    getByRole,
    getAllByTestId: queryAllByTestId,
    getByText,
  } = render(<Review productId={1} />)

  await waitFor(() => {
    expect(queryAllByTestId('review-tile')).toBeTruthy()
  })

  const twoStarBtn = getByRole('link', { name: '2 stars' })
  fireEvent.click(twoStarBtn)
  await waitFor(() => {
    expect(queryAllByTestId('review-tile')).toHaveLength(1)
  })

  expect(getByText('Defective shoe')).toBeVisible()
  fireEvent.click(twoStarBtn)
  await waitFor(() => {
    expect(queryAllByTestId('review-tile')).toHaveLength(2)
  })
  expect(getByText(/11 reviews/)).toBeInTheDocument()
})
