import React from 'react'
import axios from 'axios'
import QuestionList from './questions/QuestionList.jsx'
import QuestionModal from './questions/QuestionModal.jsx'
import AnswerModal from './questions/AnswerModal.jsx'
import SearchQuestion from './questions/SearchQuestion.jsx'

const { useState, useEffect } = React

const Questions = () => {
  const [questionModal, setQuestionModal] = useState(false)
  const [answerModal, setAnswerModal] = useState(false)
  const closeQuestionForm = () => {
    setQuestionModal(false)
  }
  const closeAnswerForm = () => {
    setAnswerModal(false)
  }

  return (
    <section className="questions-container">
      <h1 className="questions-header-wrapper">
        <div className="questions-header">Questions & Answers</div>
        <SearchQuestion />
      </h1>

      <QuestionList />
      <QuestionModal show={questionModal} handleClose={closeQuestionForm} />
      <AnswerModal show={answerModal} handleClose={closeAnswerForm} />

      <div className="questions-closing">
        <button
          className="question-button-ask question-buttons"
          onClick={() => {
            setQuestionModal(true)
          }}
        >
          ASK A QUESTION
        </button>
      </div>
    </section>
  )
}

export default Questions
