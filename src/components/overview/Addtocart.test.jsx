import React from 'react'
import { render, screen } from '@testing-library/react'
import Addtocart from './Addtocart'
import '@testing-library/jest-dom'

let mockData = {
  quantities: {},
  sku: [],
}
let mockStyle = {
  photos: [
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    },
  ],
}

let mocksku = []
test('expect button to be visible', () => {
  const { getByText, getByTestId } = render(
    <Addtocart
      sizeSelected={''}
      getSkuInfo={() => mockData}
      style={mockStyle}
    />
  )
  const cartButton = getByTestId('cart-button')
  expect(cartButton).toBeVisible()
})
test('getSku returns an id', () => {
  const getSku = jest.fn(() => {})
  getSku()
  expect(getSku).toHaveReturned()
})

test('renders <Addtocart>', () => {
  render(
    <Addtocart
      sizeSelected={''}
      getSkuInfo={() => mockData}
      style={mockStyle}
    />
  )
  expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeEnabled()
})
