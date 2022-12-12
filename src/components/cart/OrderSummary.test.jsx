import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockData } from '../../../sampleData/cartItems'

import OrderSummary from './OrderSummary'

test('renders Order summary and prints out proper total', () => {
  const { queryAllByText } = render(<OrderSummary items={mockData} />)
  expect(queryAllByText('$130')).toHaveLength(2)
})

test('when valid coupon code is applied, total gets readjusted accordingly', async () => {
  const { getByLabelText, getByText } = render(
    <OrderSummary items={mockData} />
  )
  const promoInput = getByLabelText('Promo code')
  await fireEvent.change(promoInput, { target: { value: 'take5' } })
  await expect(getByText('Add Promo code')).toBeVisible()

  fireEvent.submit(getByText('Add Promo code'))
  await waitFor(() => {
    expect(getByText('TAKE5')).toBeVisible()
  })
})

// when invalid coupon code is applied, error message is displayed
test('when invalid coupon code is applied, error message is displayed', async () => {
  const { getByLabelText, getByText, getByRole } = render(
    <OrderSummary items={mockData} />
  )
  const promoInput = getByLabelText('Promo code')
  await fireEvent.change(promoInput, { target: { value: 'badpromocode' } })
  await expect(getByText('Add Promo code')).toBeVisible()

  fireEvent.submit(getByText('Add Promo code'))
  await waitFor(() => {
    expect(getByRole('alert')).toBeVisible()
  })
})
