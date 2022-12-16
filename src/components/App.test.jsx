import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('App Component', function () {
  it('should have app somewhere visible', function () {
    let { getByText, getByTestId } = render(<App />)
    const app = getByTestId('app')
    expect(app).toBeVisible()
  })
})
