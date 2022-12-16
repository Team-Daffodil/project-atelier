import React from 'react'
import { render } from '@testing-library/react'
import Bar from './Bar'

test('loads bar and displays proper ratio', () => {
  const { getByTestId } = render(<Bar percent={0.5} />)
  const fillBar = getByTestId('fill-bar')
  expect(fillBar).toHaveStyle(`
          background-color: lightgreen;
          width: 50%;
  `)
})

test('bar does not exceed 100', () => {
  const { getByTestId } = render(<Bar percent={1.1} />)
  const fillBar = getByTestId('fill-bar')
  expect(fillBar).toHaveStyle(`
          background-color: lightgreen;
          width: 100%;
  `)
})

test('bar minimum is never lower than 0', () => {
  const { getByTestId } = render(<Bar percent={-0.4} />)
  const fillBar = getByTestId('fill-bar')
  expect(fillBar).toHaveStyle(`
          background-color: lightgreen;
          width: 0%;
  `)
})
