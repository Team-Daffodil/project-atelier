import React from 'react'
import axios from 'axios'
import QuestionList from './questions/QuestionList.jsx'

const { useState, useEffect } = React

const Questions = () => {
  return (
    <section className="questions-container">
      <h1 className="questions-header-wrapper">
        <div className="questions-header">Questions & Answers</div>
        <div className="questions-search">TEMP DIV FOR SEARCH BAR</div>
      </h1>

      <QuestionList />

      <div className="questions-closing">
        <button
          className="question-button-more question-buttons"
          onClick={() => alert('BANANA')}
        >
          MORE ANSWERED QUESTIONS
        </button>
        <button className="question-button-ask question-buttons">
          ASK A QUESTION
        </button>
      </div>
    </section>
  )
}

export default Questions
