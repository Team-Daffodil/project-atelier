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
  const [filter, setFilter] = useState('')
  const closeQuestionForm = () => {
    setQuestionModal(false)
  }
  const closeAnswerForm = () => {
    setAnswerModal(false)
  }
  const onSearchHandler = (e) => {
    setFilter(e.nativeEvent.target.value)
  }
  const answerModalHandler = () => {
    setAnswerModal(true)
  }
  const questionModalHandler = () => {
    setQuestionModal(true)
  }
  // c366465b6f6f186dbab8efe90b774b5288e447b8
  return (
    <section className="questions-container">
      <h1 className="questions-header-wrapper">
        <div className="questions-header">Questions & Answers</div>
        <SearchQuestion onSearchHandler={onSearchHandler} />
      </h1>

      <QuestionList filter={filter} answerModalHandler={answerModalHandler} questionModalHandler={questionModalHandler}/>
      <QuestionModal show={questionModal} handleClose={closeQuestionForm} />
      <AnswerModal show={answerModal} handleClose={closeAnswerForm} />


    </section>
  )
}

export default Questions
