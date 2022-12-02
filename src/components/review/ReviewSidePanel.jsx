import React, { useState, useEffect } from 'react'
import { ratingAvg } from '../../lib/review'

const headers = {
  Authorization: process.env.API_TOKEN,
  ContentType: 'application/json',
}

const recommended = (rec) => {
  return Math.round(
    (parseInt(rec.true) / (parseInt(rec.true) + parseInt(rec.false))) * 100
  )
}

const displayChars = (feature) => {
  let chars = ['Too small', 'Perfect', 'Too big']
  if (feature === 'Quality') {
    chars = ['Poor', 'Perfect']
  }
  return chars.map((char) => <span>{char}</span>)
}

const ReviewSidePanel = ({ productId }) => {
  const [data, setData] = useState({})
  const [totalRatings, setTotalRatings] = useState(0)

  useEffect(() => {
    //
    fetch(process.env.API_URL + '/reviews/meta?product_id=' + productId, {
      headers: headers,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('this is my data', data)
        setData(data)
        setTotalRatings(
          Object.values(data.ratings).reduce(
            (acc, val) => acc + parseInt(val),
            0
          )
        )
      })
      .catch((err) => {
        console.log('fetch error:', err)
      })
  }, [])

  return (
    <section>
      <h3>Ratings & Reviews</h3>
      {data.ratings !== undefined ? (
        <div>
          <div>
            <div>{ratingAvg(data.ratings, totalRatings)}</div>
            <div>Stars</div>
          </div>
          <p>
            {recommended(data.recommended)}% of reviews recommended this product
          </p>
          <ul>
            {['5', '4', '3', '2', '1'].map((rating) => {
              return (
                <li>
                  <div>{rating} stars</div>
                  <div>
                    Bar percentage value:{' '}
                    {parseInt(data.ratings[rating]) / totalRatings}
                  </div>
                </li>
              )
            })}
          </ul>
          <div>
            <ul>
              {Object.keys(data.characteristics).map((key) => {
                return (
                  <li key={key}>
                    <label>{key}</label>
                    <div>Bar value: {data.characteristics[key].value}</div>
                    <div>{displayChars(key)}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </section>
  )
}

export default ReviewSidePanel
