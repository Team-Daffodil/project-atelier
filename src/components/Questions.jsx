import React from 'react'
import axios from 'axios'

const question1 = 'Why did the chicken cross the road?'
const answer = 'forty-two'
const question2 = 'Where is Waldo?'
const helpfulComponent = (
  <div>
    Helpful?{' '}
    <button className="button-helpful" style={{ border: 'none' }}>
      <u>Yes</u>
    </button>
    &nbsp;(25) |{' '}
    <button className="button-helpful" style={{ border: 'none' }}>
      <u>Add Answer</u>
    </button>
  </div>
)
const user = 'by Banpan, July 4, 1990  |  '
const questions = [
  { id: 64, q: question1, a: answer, photos: [] },
  {
    id: 128,
    q: question2,
    a: answer,
    photos: [
      { id: 1, url: 'photo1.jpg' },
      { id: 2, url: 'photo2.jpg' },
      { id: 3, url: 'photo3.jpg' },
    ],
  },
]

const Questions = () => {
  return (
    <section className="questions-container">
      <h1 className="questions-header-wrapper">
        <div className="questions-header">Questions & Answers</div>
        <div className="questions-search">TEMP DIV FOR SEARCH BAR</div>
      </h1>

      <div className="questions-wrapper">
        {questions.map((ele, i) => {
          return (
            <li className="question-individual-wrapper" key={ele.id}>
              <div className="question-individual-question">
                <b>Q:&nbsp;&nbsp;</b> {ele.q}
                <div style={{ marginLeft: 'auto', fontSize: '12px' }}>
                  {helpfulComponent}
                </div>
              </div>

              <div className="question-individual-answer">
                <b>A:&nbsp;&nbsp;&nbsp;&nbsp;</b> {ele.a}
              </div>

              <div className="question-individual-info">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>{user}</div>
                <div>{helpfulComponent}</div>
              </div>
              <ul className="img-answers">
                {ele.photos.length
                  ? ele.photos.map((img) => (
                    <div className="img" key={img.id}>
                      {img.url}&nbsp;
                    </div>
                  ))
                  : null}
              </ul>
            </li>
          )
        })}
      </div>
      <div className="questions-closing">
        <button className="question-button-more question-buttons">
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
