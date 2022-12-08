import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SearchQuestion = ({ onSearchHandler }) => {
  return (
    <form>
      <input label="Answer" type="text" onChange={onSearchHandler}></input>
    </form>
  )
}
export default SearchQuestion
