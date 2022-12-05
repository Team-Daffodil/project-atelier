import React from 'react'

const Bar = ({ width }) => {
  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <div
        style={{
          backgroundColor: 'lightgreen',
          width: width + '%',
          height: 20,
        }}
      ></div>
    </div>
  )
}

export default Bar
