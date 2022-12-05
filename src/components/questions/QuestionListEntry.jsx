import React, { useEffect, useState } from 'react'
import axios from 'axios'

const helpfulComponent = (count) => {
  return (
    <div>
      Helpful?{' '}
      <button className="button-helpful" style={{ border: 'none' }}>
        <u>Yes</u>
      </button>
      &nbsp;({count}) |{' '}
      <button className="button-helpful" style={{ border: 'none' }}>
        <u>Add Answer</u>
      </button>
    </div>
  )
}

const QuestionListEntry = ({ question, answer }) => {
  console.log('QLE: ', question.question_helpfulness)
  const loadAnswersButton = () => (
    <button className="button-load-answers">Load More Answers</button>
  )
  const loadPhotos = () =>
    answer[0].photos.map((img, i) => (
      <div
        className="img"
        style={{ backgroundImage: 'url(' + img + ')' }}
        key={i}
      ></div>
    ))
  return (
    <li className="question-individual-wrapper">
      <div className="question-individual-question">
        <b>Q:&nbsp;&nbsp;</b> {question.question_body}
        <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
          {question.question_helpfulness
            ? helpfulComponent(question.question_helpfulness)
            : helpfulComponent(0)}
        </div>
      </div>

      <div className="question-individual-answer-wrapper">
        <div>
          <b>A:</b>
        </div>
        <div className="question-individual-answer">
          {answer.length ? answer[0].body : 'NO ANSWER PLZ HALP'}
        </div>
      </div>

      <div className="question-individual-info">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>{question.asker_name}</div>
        &nbsp;
        <div>
          {answer[0]
            ? helpfulComponent(answer[0].helpfulness)
            : helpfulComponent(0)}
        </div>
      </div>
      <ul className="img-answers">{answer[0] ? loadPhotos() : null}</ul>
      {answer.length > 1 ? loadAnswersButton() : null}
    </li>
  )
}

export default QuestionListEntry
