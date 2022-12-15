import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockData } from '../../../sampleData/cartItems'

import CartItem from './CartItem'

test('renders CartItem with proper information and quantity', async () => {
  const item = mockData[0]
  const { getByText, getByRole } = render(
    <CartItem item={item} updateCartItemsHandler={jest.fn()} />
  )
  expect(getByText(item.product.style)).toBeVisible()
  expect(getByRole('combobox')).toHaveValue(String(item.quantity))
})

test('expect item total to change when user changes quantity', async () => {
  const item = mockData[0]
  const { getByText, getByRole } = render(
    <CartItem item={item} updateCartItemsHandler={jest.fn()} />
  )
  const selectBox = getByRole('combobox')
  await fireEvent.change(selectBox, { target: { value: '5' } })
  await expect(getByText(/650/)).toBeVisible()
})
