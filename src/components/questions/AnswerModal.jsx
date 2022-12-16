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
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Answer:
          <input
            style={{ marginLeft: '10px', height: '40px' }}
            placeholder="42"
            type="text"
          ></input>
        </label>
        <label style={{ marginLeft: '10px', fontSize: '12px'}}>
          Name:
          <input placeholder="Example: jack543!" type="text"></input>
        </label>
        <div style={{marginLeft: '10px', fontSize: '12px'}}>For privacy reasons, do not use your full name or email address</div>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Email:
          <input placeholder="bulbasaur@pokemon.com" type="text"></input>
        </label>
        <div style={{marginLeft: '10px', fontSize: '12px'}}>For authentication reasons, you will not be emailed</div>
        <input type="submit"></input>
      </form>
      <button className="button-close-question-modal" style={{width: '40px', height: '20px'}} onClick={handleClose}>
        close
      </button>
    </div>
  )
}
export default AnswerModal
