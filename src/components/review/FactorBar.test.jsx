import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import FactorBar from './FactorBar'

test('loads and renders FactorBar with the proper arrow position', () => {
  const { getByTestId } = render(<FactorBar feature={'Fit'} num={2} />)
  expect(getByTestId('arrow')).toHaveStyle('margin-left: 40%')
})
