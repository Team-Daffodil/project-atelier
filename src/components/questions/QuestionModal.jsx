import React, { useEffect, useState } from 'react'
import axios from 'axios'

const QuestionModal = ({ show, handleClose }) => {
  let toggleClass = show ? 'modal display-block' : 'display-none'
  let headers = { Authorization: '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' }
  // axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', {})
  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(e.nativeEvent)
    let target = e.nativeEvent.target
    console.log(target)
    let stupidESLintRules = 'product_id'
    axios
      .post(
        'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions',
        {
          body: target[0].value,
          name: target[1].value,
          email: target[2].value,
          stupidESLintRules: 37325,
        },
        { headers }
      )
      .then((response) => console.log(response))
  }
  return (
    <div className={toggleClass}>
      <form className="modal-main" onSubmit={onSubmitHandler}>
        <label>
          Question:
          <input
            style={{ marginLeft: '10px' }}
            placeholder="What is life?"
            type="text"
          ></input>
        </label>
        <label>
          Name:
          <input placeholder="Jon Smith" type="text"></input>
        </label>
        <label>
          Email:
          <input placeholder="bulbasaur@pokemon.com" type="text"></input>
        </label>
        <input type="submit"></input>
      </form>
      <button className="button-close-question-modal" onClick={handleClose}>
        Close
      </button>
    </div>
  )
}
export default QuestionModal
