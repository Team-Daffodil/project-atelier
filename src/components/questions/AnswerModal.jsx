import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IconContext } from 'react-icons';
import { CiSquareRemove } from 'react-icons/ci';

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
        <div className='modal-ans-title' style={{width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center'}}>
          <span style={{fontSize: '18px'}}>Submit Your Answer</span>
          <span>Camo Onsie: Consequuntur ea dolorum distinctio quibusdam expedita excepturi cum quaerat eum.</span>
        </div>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Answer:
          <input
            className='modal-input'
            style={{ marginLeft: '10px', height: '40px' }}
            placeholder="42"
            type="text"
          ></input>
        </label>
        <label style={{ marginLeft: '10px', fontSize: '12px'}}>
          Name:
          <input className='modal-input' placeholder="Example: jack543!" type="text"></input>
        </label>
        <div style={{marginLeft: '10px', fontSize: '8px', width: '200px'}}>For privacy reasons, do not use your full name or email address</div>
        <label style={{marginLeft: '10px', fontSize: '12px'}}>
          Email:
          <input className='modal-input' placeholder="bulbasaur@pokemon.com" type="text"></input>
        </label>
        <div style={{marginLeft: '10px', fontSize: '8px', width: '200px'}}>For authentication reasons, you will not be emailed</div>
        <input className='submit-modal' type="submit"></input>
        <IconContext.Provider value={{color: 'red', size: '40px'}}>
          <CiSquareRemove style={{position: 'absolute', top: '1%', right: '1%'}} onClick={() => handleClose()}/>
        </IconContext.Provider>
      </form>

    </div>
  )
}
export default AnswerModal
