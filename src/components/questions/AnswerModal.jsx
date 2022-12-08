import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AnswerModal = ({ show }) => {
  let toggleClass = show ? 'modal display-block' : 'display-none'

  return (
    <form className={toggleClass}>
      <input label="Answer" type="text"></input>
    </form>
  )
}
export default AnswerModal
