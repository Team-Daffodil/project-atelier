import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionListEntry from './QuestionListEntry.jsx'

// import * as dotenv from 'dotenv'
// dotenv.config()

const QuestionList = () => {
  const [data, setData] = useState([])
  const [moreQs, setMoreQs] = useState(false)
  const questionWrapperStyle = { overflowY: 'scroll', height: '500px' }
  const showMoreQuestionsHandler = (event) => {
    setMoreQs(!moreQs)
  }
  useEffect(() => {
    fetch(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe' +
        '/qa/questions' +
        '?product_id=37325',
      { headers: { Authorization: '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' } }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
        console.log('INITIAL QUESTIONS DATA: ', data.results)
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

    if (data.length < 4) {
      return (
        <div className="questions-wrapper">
          {data &&
            data.map((ele, i) => {
              return (
                <QuestionListEntry question={ele} key={i} answer={ansQ[i]} />
              )
            })}
        </div>
      )
    } else if ((data.length > 4) & !moreQs) {
      return (
        <div className="questions-wrapper">
          {data &&
            data.map((ele, i) => {
              if (i < 4) {
                return (
                  <QuestionListEntry question={ele} key={i} answer={ansQ[i]} />
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
      return (
        <div
          className="questions-wrapper"
          style={questionWrapperStyle}
          onScroll={(e) => console.log(e.nativeEvent)}
        >
          {data &&
            data.map((ele, i) => {
              if (i < 6) {
                return (
                  <QuestionListEntry question={ele} key={i} answer={ansQ[i]} />
                )
              }
            })}
        </div>
      )
    }
  } else {
    <div className="questions-wrapper">
      <div>
        NO QUESTIONS ABOUT THIS PRODUCT YET. ASK A QUESTION IF YOU HAVE ONE!
      </div>
    </div>
  }
}

export default QuestionList
