import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionListEntry from './QuestionListEntry.jsx'

const QuestionList = ({ filter, answerModalHandler, questionModalHandler, productId }) => {
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
    if (scrollSum >= e.scrollHeight - 10) {
      setQuestionCount(questionCount + 2)
    }
  }
  useEffect(() => {
    axios
      .get(
        process.env.API_URL + '/qa/questions' + '?product_id=37325&count=40',
        {
          headers: {
            Authorization: process.env.API_TOKEN,
          },
        }
      )
      .then((response) => {
        setData(response.data.results)
        // console.log('INITIAL QUESTIONS DATA: ', response.data.results)
      })
  }, [])

  if (data.length) {
    let ansQ = []
    for (var i = 0; i < data.length; i++) {
      let tempArray = []
      for (var key in data[i].answers) {
        tempArray.push(data[i].answers[key])
        tempArray.sort((a, b) => {
          return b.helpfulness - a.helpfulness
        })
      }
      ansQ.push(tempArray)
    }

    if ((filter.length >= 3) & (data.length > 4)) {
      return (
        <div className="questions-wrapper">
          {data &&
            data
              .filter((filtered) => {
                console.log('SEARCH FILTER: ', filtered.question_body)
                return filtered.question_body.toLowerCase().includes(filter)
              })
              .map((ele, i) => {
                if (i < 4) {
                  return (
                    <QuestionListEntry
                      question={ele}
                      key={i}
                      answers={ansQ[i]}
                      answerModalHandler={answerModalHandler}
                    />
                  )
                }
              })}
          <div className="questions-closing">
            <button
              className="question-button-more question-buttons"
              onClick={showMoreQuestionsHandler}
            >
              MORE QUESTIONS
            </button>

            <button
              className="question-button-ask question-buttons"
              onClick={() => {
                questionModalHandler()
              }}
            >
              ASK A QUESTION
            </button>
          </div>
        </div>
      )
    }
    if ((data.length < 4) & (data.length > 0)) {
      // if there are less than 4 questions
      return (
        <div className="questions-wrapper">
          {data &&
            data.map((ele, i) => {
              return (
                <QuestionListEntry
                  question={ele}
                  key={i}
                  answers={ansQ[i]}
                  answerModalHandler={answerModalHandler}
                />
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
                  <QuestionListEntry
                    question={ele}
                    key={i}
                    answers={ansQ[i]}
                    answerModalHandler={answerModalHandler}
                  />
                )
              }
            })}
          <div className="questions-closing">
            <button
              className="question-button-more question-buttons"
              onClick={showMoreQuestionsHandler}
            >
              MORE QUESTIONS
            </button>

            <button
              className="question-button-ask question-buttons"
              onClick={() => {
                questionModalHandler()
              }}
            >
              ASK A QUESTION
            </button>
          </div>
        </div>
      )
    } else if ((data.length > 4) & moreQs) {
      // render more than 4 questions after button click
      return (
        <div>
          <div
            className="questions-wrapper"
            style={questionWrapperStyle}
            onScroll={onScrollHandler}
          >
            {data &&
            data.map((ele, i) => {
              if (i < questionCount + 2) {
                return (
                  <QuestionListEntry
                    question={ele}
                    key={i}
                    answers={ansQ[i]}
                    answerModalHandler={answerModalHandler}
                  />
                )
              }
            })}

          </div>
          <div className="questions-closing">
            <button
              className="question-button-ask question-buttons"
              onClick={() => {
                questionModalHandler()
              }}
            >
              ASK A QUESTION
            </button>
          </div>
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
