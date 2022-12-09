import React, { useState, useEffect } from 'react'
import { ratingAvg } from '../../lib/review'
import axios from 'axios'
import Bar from './Bar'
import FactorBar from './FactorBar'

const headers = {
  Authorization: process.env.API_TOKEN,
  ContentType: 'application/json',
}

const recommended = (rec) => {
  return Math.round(
    (parseInt(rec.true) / (parseInt(rec.true) + parseInt(rec.false))) * 100
  )
}

const fetchProductData = async (id) => {
  let params = new URLSearchParams()
  params.set('product_id', id)

  return await axios.get(
    process.env.API_URL + '/reviews/meta?' + params.toString(),
    {
      headers: headers,
    }
  )

  // TODO: handle error here
  // https://rapidapi.com/guides/fetch-api-async-await
}

const ReviewSidePanel = ({ productId, handleRatingChange }) => {
  const [data, setData] = useState({})
  const [totalRatings, setTotalRatings] = useState(0)

  useEffect(() => {
    fetchProductData(productId)
      .then((data) => {
        setData(data.data)
        setTotalRatings(
          Object.values(data.data.ratings).reduce(
            (acc, val) => acc + parseInt(val),
            0
          )
        )
      })
      .catch((err) => {
        console.log('fetch error:', err.response.status)
      })
  }, [])

  const handleRatingClick = (val) => {
    return (e) => {
      e.preventDefault()
      handleRatingChange(val)
    }
  }

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
                <li key={rating + 'stars'}>
                  <div>
                    <a href="#" onClick={handleRatingClick(rating)}>
                      {rating} stars
                    </a>
                  </div>
                  <div>
                    <Bar
                      percent={parseInt(data.ratings[rating]) / totalRatings}
                    />
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
                    <FactorBar
                      feature={key}
                      num={data.characteristics[key].value}
                    />
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
