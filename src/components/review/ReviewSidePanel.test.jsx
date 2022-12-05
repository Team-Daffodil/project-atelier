import React from 'react'
import * as dotenv from 'dotenv'
dotenv.config()
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewSidePanel from './ReviewSidePanel'
import { mockData } from '../../../sampleData/review_meta'

const server = setupServer(
  rest.get(process.env.API_URL + '/reviews/meta', (req, res, ctx) => {
    const productId = req.url.searchParams.get('product_id')
    if (productId === '1') {
      return res(ctx.json(JSON.parse(mockData)))
    }
    return res(ctx.status(301))
  })
)

beforeAll(() => server.listen())
beforeAll(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and renders side panel with initial GET request', async () => {
  render(<ReviewSidePanel productId={1} />)

  expect(screen.getByText('Loading')).toBeVisible()

  // after loading initial API request
  await waitFor(() => {
    expect(screen.getByText('3.00')).toBeVisible() // overall rating
    expect(screen.getByText('99% of reviews recommended this product')) // overall recommended
  })
})

test('handles GET request errors', async () => {
  render(<ReviewSidePanel productId={99} />)

  expect(screen.getByText('Loading')).toBeVisible()

  await waitFor(() => {
    expect(screen.getByText('Loading')).toBeVisible()
  })
})
