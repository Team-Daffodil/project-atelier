import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DateFormatter from '../common/DateFormatter.jsx'

const helpfulComponent = (count) => {
  count = count || 0
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

const QuestionListEntry = ({ question, answers }) => {
  const [answerCount, setAnswerCount] = useState(4)
  const [showAnswers, setShowAnswers] = useState(false)
  console.log('QLE: ', answers)
  const showMoreAnswersHandler = () => {
    setShowAnswers(true)
    setAnswerCount(answerCount + 2)
  }
  const loadPhotos = () =>
    answers[0].photos.map((img, i) => (
      <div
        className="img"
        style={{ backgroundImage: 'url(' + img + ')' }}
        key={i}
      ></div>
    ))

  if (answers.length < 3) {
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
            {answers.length ? answers[0].body : 'NO ANSWER PLZ HALP'}
          </div>
        </div>

        <div className="question-individual-answer-wrapper">
          <div>
            <b>A:</b>
          </div>
          <div className="question-individual-answer">
            {answers.length ? answers[1].body : null}
          </div>
        </div>
        <div className="question-individual-info">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>{question.asker_name}</div>
          &nbsp;
          <div>
            {answers[0]
              ? helpfulComponent(answers[0].helpfulness)
              : helpfulComponent(0)}
          </div>
        </div>
        <ul className="img-answers">{answers[0] ? loadPhotos() : null}</ul>
      </li>
    )
  } else if (answers.length >= 3 && !showAnswers) {
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
          <div className="question-individual-answer">
            <b style={{ fontSize: '13px' }}>A:</b>
            {answers.length ? answers[0].body : 'NO ANSWER PLZ HALP'}
          </div>
          <div></div>
        </div>

        <div className="question-individual-answer-wrapper">
          <div className="question-individual-answer">
            <b style={{ fontSize: '13px' }}>A:</b>
            {answers.length ? answers[1].body : null}
          </div>
          <div className="question-individual-answer"></div>
        </div>

        <div className="question-individual-info">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>{question.asker_name}</div>
          &nbsp;
          <div>
            {answers[0]
              ? helpfulComponent(answers[0].helpfulness)
              : helpfulComponent(0)}
          </div>
        </div>
        <ul className="img-answers">{answers[0] ? loadPhotos() : null}</ul>
        <button
          className="button-load-answers"
          onClick={showMoreAnswersHandler}
        >
          SHOW MORE ANSWERS
        </button>
      </li>
    )
  } else if (answers.length >= 3 && showAnswers) {
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
          <div></div>

          {answers.length &&
            answers.map((ele, i) => {
              if (i <= answerCount) {
                console.log('ANSWER COUNT: ', ele)
                return (
                  <div className="question-individual-answer" key={i}>
                    <b>A:</b>
                    <div className="answer-body"> {ele.body} </div>
                    <div className="answer-name"> {ele.answerer_name}</div>
                    {DateFormatter(ele.date)}
                    <ul className="img-answers">
                      {answers[0] ? loadPhotos() : null}
                    </ul>
                    {helpfulComponent(ele.helpfulness)}
                  </div>
                )
              }
            })}
        </div>
      </li>
    )
  }
}

export default QuestionListEntry
