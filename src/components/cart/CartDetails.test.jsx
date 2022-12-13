import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import CartDetails from './CartDetails'
import { mockData } from '../../../sampleData/cartItems'

const items = mockData
test('loads and renders CartDetails properly', async () => {
  const { getByText } = render(<CartDetails items={items} />)
  expect(getByText('Forest Green & Black')).toBeVisible()
})

test('changing the quantity of a product will update total cart value', async () => {
  const { getAllByText, getByRole } = render(<CartDetails items={items} />)
  const selectBox = getByRole('combobox')
  await fireEvent.change(selectBox, { target: { value: '5' } })
  await expect(getAllByText(/650/).length).toBe(3)
})

test('removing item will change quantity', async () => {
  const { getByText, getByRole } = render(<CartDetails items={items} />)
  const deleteItem = getByRole('link', { name: 'x' })
  await fireEvent.click(deleteItem)
  await expect(getByText('0 ITEMS')).toBeVisible()
})
