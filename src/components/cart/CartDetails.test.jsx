import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import CartDetails from './CartDetails'
import { mockData } from '../../../sampleData/cartItems'

const items = mockData
test('loads and renders CartDetails properly', async () => {
  const { getByText } = render(<CartDetails items={items} />)
  expect(getByText('Forest Green & Black')).toBeVisible()
})

test('changing the quantity of a product will update total cart value', async () => {
  const { getByText, getByRole } = render(
    <CartDetails items={items} updateCartItemsHandler={jest.fn()} />
  )
  const selectBox = getByRole('combobox')
  await fireEvent.change(selectBox, { target: { value: '5' } })
  await expect(getByText(/650/)).toBeVisible()
})
