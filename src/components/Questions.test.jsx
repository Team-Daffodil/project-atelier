import React from 'react'
import { render } from '@testing-library/react'
import Questions from './Questions.jsx'

describe('Questions Component', function () {
  it('should have a question', function () {
    let { getByText } = render(<Questions />)
    expect(getByText('Questions & Answers')).toMatchInlineSnapshot(`
      <div
        class="questions-header"
      >
        Questions & Answers
      </div>
    `)
  })
})
