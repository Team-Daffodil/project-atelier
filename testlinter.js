/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs')
var request = require('needle')
var Promise = require('bluebird')
// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result.toString().split('\n')[0])
      }
    })
  })
}

let dog = {
  test: 'nick',
  dog: 'mike',
  test: 'nick',
  dog: 'mike',
  test: 'nick',
  dog: 'mike',
  test: 'nick',
  dog: 'mike',
}

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result.statusCode)
      }
    })
  })
}

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync,
}
