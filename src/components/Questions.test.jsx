import React from 'react'
import { render } from '@testing-library/react'
import { Questions } from './Questions'

describe('Questions Component', function () {
  it('should have a question', function () {
    let { getByText } = render(<App />)
    expect(getByText('Why did the chicken cross the road?')).toMatchInlineSnapshot(`
      <h1>
        Why did the chicken cross the road?
      </h1>
    `)
  })
})