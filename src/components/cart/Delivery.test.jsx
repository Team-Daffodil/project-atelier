import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Delivery from './Delivery'

test('renders Delivery form properly', async () => {
  const { getByLabelText } = render(<Delivery />)
  expect(getByLabelText('first name')).toBeVisible()
})
