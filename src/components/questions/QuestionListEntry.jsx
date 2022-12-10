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
    </div>
  )
}

const QuestionListEntry = ({ question, answers, answerModalHandler }) => {
  const addAnswer = () => {
    return (
      <button
        className="button-helpful"
        style={{ border: 'none' }}
        onClick={answerModalHandler}
      >
        <u>Add Answer</u>
      </button>
    )
  }
  const [answerCount, setAnswerCount] = useState(4)
  const [showAnswers, setShowAnswers] = useState(false)
  const showMoreAnswersHandler = () => {
    setShowAnswers(true)
    setAnswerCount(answerCount + 2)
  }
  const loadPhotos = (photos) => {
    return photos.map((img, i) => {
      return <img className="img" src={img} key={i}></img>
    })
  }

  if (answers.length < 3) {
    return (
      <li className="question-individual-wrapper">
        <div className="question-individual-question">
          <div className="question-body">
            <b style={{ fontSize: '13px', marginRight: '5px' }}>
              Q:&nbsp;&nbsp;
            </b>{' '}
            {question.question_body}
            <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
              {question.question_helpfulness
                ? helpfulComponent(question.question_helpfulness)
                : helpfulComponent(0)}
              {addAnswer()}
            </div>
          </div>

          <div className="question-user">
            <div>from {question.asker_name}</div>
            <div>on </div>
            <DateFormatter ts={question.question_date} />
          </div>
        </div>

        <div className="question-individual-answer-wrapper">
          <div>
            <b style={{ fontSize: '13px', marginRight: '5px' }}>A:</b>
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
          {addAnswer()}
        </div>
        <ul className="img-answers">
          {answers[0] ? loadPhotos(answers[0].photos) : null}
        </ul>
      </li>
    )
  } else if (answers.length >= 3 && !showAnswers) {
    return (
      <li className="question-individual-wrapper">
        <div className="question-individual-question">
          <div className="question-body">
            <b style={{ fontSize: '13px', marginRight: '5px' }}>
              Q:&nbsp;&nbsp;
            </b>{' '}
            {question.question_body}
            <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
              {question.question_helpfulness
                ? helpfulComponent(question.question_helpfulness)
                : helpfulComponent(0)}
            </div>
            {addAnswer()}
          </div>

          <div className="question-user">
            <div>from {question.asker_name}</div>
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>on </div>
            <DateFormatter ts={question.question_date} />
          </div>
        </div>

        <div className="question-individual-answer-wrapper">
          <div className="question-individual-answer">
            <b style={{ fontSize: '13px', marginRight: '5px' }}>A:</b>
            {answers.length ? answers[1].body : null}
          </div>
          <div className="question-individual-answer"></div>
        </div>

        <div className="question-individual-info">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          <div>
            {answers[0]
              ? helpfulComponent(answers[0].helpfulness)
              : helpfulComponent(0)}
          </div>
          {addAnswer()}
        </div>
        <ul className="img-answers">
          {answers[0] ? loadPhotos(answers[0].photos) : null}
        </ul>
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
          <div className="question-body">
            <b>Q:&nbsp;&nbsp;</b> {question.question_body}
            <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
              {question.question_helpfulness
                ? helpfulComponent(question.question_helpfulness)
                : helpfulComponent(0)}
            </div>
            {addAnswer()}
          </div>

          <div className="question-user">
            <div>{question.asker_name}</div>
            <DateFormatter ts={question.question_date} />
          </div>
        </div>

        <div className="question-individual-answer-wrapper">
          <div></div>

          {answers.length &&
            answers.map((ele, i) => {
              if (i <= answerCount) {
                return (
                  <div className="question-individual-answer" key={i}>
                    <b>A:</b>
                    <div className="answer-body"> {ele.body} </div>
                    <div className="answer-name"> {ele.answerer_name}</div>
                    <DateFormatter ts={ele.date} />
                    <ul className="img-answers">
                      {ele.photos.length !== 0 ? loadPhotos(ele.photos) : null}
                    </ul>
                    {helpfulComponent(ele.helpfulness)}
                    {addAnswer()}
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
