import React from 'react'

const DateFormatter = ({ ts }) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  const date = new Date(ts)
  return <span>{date.toLocaleString('en-US', options)}</span>
}

export default DateFormatter
