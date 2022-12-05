import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionListEntry from './QuestionListEntry.jsx'

// import * as dotenv from 'dotenv'
// dotenv.config()

const QuestionList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe' +
        '/qa/questions' +
        '?product_id=37314',
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

    return (
      <div className="questions-wrapper">
        {data &&
          data.map((ele, i) => {
            console.log('QUESTION: ', ele)
            return <QuestionListEntry question={ele} key={i} answer={ansQ[i]} />
          })}
      </div>
    )
  } else {
    <div className="questions-wrapper">
      <div>
        NO QUESTIONS ABOUT THIS PRODUCT YET. ASK A QUESTION IF YOU HAVE ONE!
      </div>
    </div>
  }
}

export default QuestionList
