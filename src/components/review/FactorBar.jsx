import React from 'react'

const displayChars = (feature) => {
  let chars = ['Too small', 'Perfect', 'Too big']
  if (feature === 'Quality') {
    chars = ['Poor', 'Perfect']
  }
  return chars.map((char) => <span key={char}>{char}</span>)
}

const FactorBar = ({ feature, num }) => {
  const cssArrow = {
    height: 0,
    width: 0,
    border: '7px solid transparent',
    borderTop: '7px solid',
    borderRight: '7px solid',
    transform: 'rotate(135deg)',
    marginLeft: Math.floor((num / 5) * 100) + '%',
    top: -14,
    left: -7,
    position: 'relative',
  }

  return (
    <div>
      <div style={{ background: 'lightgrey', height: 13, width: '100%' }}></div>
      <div data-testid="arrow" style={cssArrow}></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {displayChars(feature)}
      </div>
    </div>
  )
}

export default FactorBar
