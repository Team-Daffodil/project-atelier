import React from 'react'

export const ratingAvg = (ratings, n) => {
  let total = Object.keys(ratings).reduce(
    (acc, key) => (acc += parseInt(key) * parseInt(ratings[key])),
    0
  )
  let count = 0
  for (var key in ratings) {
    count += Number(ratings[key])
  }
  return (Math.round((total / count) * 4) / 4).toFixed(2)
}

export const maxChars = (str, max) => {
  let result = str
  if (str.length >= max) {
    result = result.slice(0, max)
  }
  if (str.length > max) {
    result += '...'
  }
  return result
}

export const displayChars = (feature) => {
  let chars = ['Too small', 'Perfect', 'Too big']
  if (feature === 'Quality') {
    chars = ['Poor', 'Perfect']
  }
  return chars.map((char) => <span key={char}>{char}</span>)
}
