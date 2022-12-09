import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AnswerModal = ({ show, handleClose }) => {
  let toggleClass = show ? 'modal display-block' : 'display-none'
  let headers = { Authorization: process.env.REACT_APP_API_KEY }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    let target = e.nativeEvent.target

    axios.post(
      process.env.REACT_APP_API_URL + 'qa/questions/37325/answers',
      {
        body: target[0].value,
        name: target[1].value,
        email: target[2].value,
      },
      { headers }
    )
  }

  return (
    <div className={toggleClass}>
      <form className="modal-main" onSubmit={onSubmitHandler}>
        <label>
          Answer:
          <input
            style={{ marginLeft: '10px' }}
            placeholder="42"
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
        close
      </button>
    </div>
  )
}
export default AnswerModal
