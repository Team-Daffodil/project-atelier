export const ratingAvg = (ratings, n) => {
  let total = Object.keys(ratings).reduce(
    (acc, key) => (acc += parseInt(key) * parseInt(ratings[key])),
    0
  )
  return (Math.round((total / n) * 4) / 4).toFixed(2)
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
