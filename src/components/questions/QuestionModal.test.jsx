import React from 'react'
import {
  render,
  screen,
  within,
  waitFor,
  fireEvent,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import QuestionModal from './QuestionModal.jsx'
import Questions from '../Questions.jsx'

test('modal shows form and a close button', () => {
  const handleClose = jest.fn()
  const closeQuestionForm = jest.fn()
  const { getByPlaceholderText, getByText } = render(
    <QuestionModal handleClose={closeQuestionForm}>
      <label>
        Email:
        <input placeholder="bulbasaur@pokemon.com" type="text"></input>
      </label>
    </QuestionModal>
  )
  expect(getByPlaceholderText('bulbasaur@pokemon.com')).toBeTruthy()
  fireEvent.click(getByText(/close/i))
  expect(closeQuestionForm).toHaveBeenCalledTimes(1)
})
