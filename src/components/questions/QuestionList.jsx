import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionListEntry from './QuestionListEntry.jsx'

// import * as dotenv from 'dotenv'
// dotenv.config()

const QuestionList = () => {
  const [data, setData] = useState([]) // product data array
  const [moreQs, setMoreQs] = useState(false) // bool toggle to show more than 4 questions
  const [questionCount, setQuestionCount] = useState(4)
  const [showQuestionForm, setShowQuestionForm] = useState(false) // toggle ? modal
  const [showAnswerForm, setShowAnswerForm] = useState(false) // toggle Ans modal
  const [showModal, setShowModal] = useState(false)

  const questionWrapperStyle = { overflowY: 'scroll', height: '666px' }
  const showMoreQuestionsHandler = (event) => {
    setMoreQs(!moreQs)
  }
  const onScrollHandler = (event) => {
    let e = event.nativeEvent.target
    let scrollSum = Math.floor(e.scrollTop + e.offsetHeight)
    console.log('IS THIS WORKING', e.scrollTop, e.offsetHeight)
    if (scrollSum >= e.scrollHeight - 10) {
      setQuestionCount(questionCount + 2)
    }
  }
  useEffect(() => {
    axios
      .get(
        'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe' +
          '/qa/questions' +
          '?product_id=37325&count=100',
        {
          headers: {
            Authorization: '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',
          },
        }
      )
      .then((response) => {
        setData(response.data.results)
        console.log('INITIAL QUESTIONS DATA: ', response.data.results)
      })
  }, [])

  if (data.length) {
    let ansQ = []
    for (var i = 0; i < data.length; i++) {
      let tempArray = []
      for (var key in data[i].answers) {
        tempArray.push(data[i].answers[key])
      }
      ansQ.push(tempArray)
    }
    console.log(
      'ARRAY OF ARRAYS OF ANSWERS EACH SUBARRAY CONTAINS ANSWER FOR QUESTION: ',
      ansQ
    )

    if ((data.length < 4) & (data.length > 0)) {
      // if there are less than 4 questions
      return (
        <div className="questions-wrapper">
          {data &&
            data.map((ele, i) => {
              return (
                <QuestionListEntry question={ele} key={i} answers={ansQ[i]} />
              )
            })}
        </div>
      )
    } else if ((data.length > 4) & !moreQs) {
      // if there are more than 4 questions
      return (
        <div className="questions-wrapper">
          {data &&
            data.map((ele, i) => {
              if (i < 4) {
                return (
                  <QuestionListEntry question={ele} key={i} answers={ansQ[i]} />
                )
              }
            })}
          <button
            className="button-more-questions"
            onClick={showMoreQuestionsHandler}
          >
            MORE QUESTIONS
          </button>
        </div>
      )
    } else if ((data.length > 4) & moreQs) {
      // render more than 4 questions after button click
      return (
        <div
          className="questions-wrapper"
          style={questionWrapperStyle}
          onScroll={onScrollHandler}
        >
          {data &&
            data.map((ele, i) => {
              if (i < questionCount + 2) {
                return (
                  <QuestionListEntry question={ele} key={i} answers={ansQ[i]} />
                )
              }
            })}
        </div>
      )
    }
  } else if (data.length === 0) {
    return (
      <div className="questions-wrapper">
        <div>
          NO QUESTIONS ABOUT THIS PRODUCT YET. ASK A QUESTION IF YOU HAVE ONE!
        </div>
      </div>
    )
  }
}

export default QuestionList
