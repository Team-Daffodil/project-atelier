import React from 'react'

const calculateFillWidth = (num) => {
  return Math.floor(Math.max(Math.min(num * 100, 100), 0))
}

const Bar = ({ percent }) => {
  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <div
        data-testid="fill-bar"
        style={{
          backgroundColor: 'lightgreen',
          width: calculateFillWidth(percent) + '%',
          height: 13,
        }}
      ></div>
    </div>
  )
}

export default Bar
