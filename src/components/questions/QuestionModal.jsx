import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IconContext } from 'react-icons';
import { CiSquareRemove } from 'react-icons/ci';

const QuestionModal = ({ show, handleClose, children }) => {
  let toggleClass = show ? 'modal display-block' : 'display-none'
  let headers = { Authorization: process.env.REACT_APP_API_KEY }
  // axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', {})
  const onSubmitHandler = (e) => {
    e.preventDefault()
    let target = e.nativeEvent.target
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
        <div className='modal-ans-title' style={{width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center'}}>
          <span style={{fontSize: '18px'}}>Ask Your Question</span>
        </div>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Question:
          <input
            style={{ marginLeft: '10px', fontSize: '12px' }}
            placeholder="What is life?"
            type="text"
          ></input>
        </label>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Name:
          <input style={{ marginLeft: '10px', fontSize: '12px' }} placeholder="Jon Smith" type="text"></input>
        </label>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Email:
          <input style={{ marginLeft: '10px', fontSize: '12px' }} placeholder="bulbasaur@pokemon.com" type="text"></input>
        </label>
        <input className='submit-modal' type="submit"></input>
        <IconContext.Provider value={{color: 'red', size: '40px'}}>
          <CiSquareRemove style={{position: 'absolute', top: '1%', right: '1%'}} onClick={() => handleClose()}/>
        </IconContext.Provider>
      </form>
    </div>
  )
}
export default QuestionModal
