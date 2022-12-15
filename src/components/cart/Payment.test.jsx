import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Payment from './Payment'

test('renders Payment form properly', async () => {
  const { getByLabelText } = render(<Payment />)
  expect(getByLabelText('card number')).toBeVisible()
})
