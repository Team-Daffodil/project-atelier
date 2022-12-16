import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SearchQuestion = ({ onSearchHandler }) => {
  return (
    <form className='questions-search'>
      <input className='question-search-input' label="Answer" type="text" onChange={onSearchHandler}></input>
    </form>
  )
}
export default SearchQuestion
