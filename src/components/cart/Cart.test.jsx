import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Cart from './Cart'
import { mockData } from '../../../sampleData/cartItems'

const appState = {
  cart: mockData,
}

test('loads and renders Cart properly', async () => {
  const { getByRole } = render(<Cart appState={appState} />)
  expect(getByRole('link', { name: 'Payment' })).toBeVisible()
})

test('can navigate between pages', async () => {
  const { getByRole, getByText } = render(<Cart appState={appState} />)
  await fireEvent.click(getByRole('link', { name: 'Payment' }))
  await expect(getByText('Payment Information')).toBeVisible()
})

test('removing item will change quantity', async () => {
  const { getByText, getByRole } = render(<Cart appState={appState} />)
  const deleteItem = getByRole('link', { name: 'x' })
  await fireEvent.click(deleteItem)
  await expect(getByText('Total (0 items)')).toBeVisible()
})
