import React, { useState, useEffect } from 'react'
import { ratingAvg } from '../../lib/review'
import axios from 'axios'
import styled from 'styled-components'

import Bar from './Bar'
import FactorBar from './FactorBar'
import QuarterRating from '../common/QuarterRating'

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

const Section = styled.section`
  width: 420px;
  flex-grow: 0;
  padding: 16px;
  box-sizing: border-box;

  & ul {
    list-style: none;
    padding: 0;
  }
`

const StarBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  &:hover {
    font-weight: 700;
  }

  a {
    font-size: 13px;
  }
`

const ReviewSidePanel = ({
  productId,
  handleRatingChange,
  handleSetRating,
  handleSetProductInfo,
}) => {
  const [data, setData] = useState({})
  const [totalRatings, setTotalRatings] = useState(0)

  useEffect(() => {
    fetchProductData(productId)
      .then((data) => {
        setData(data.data)
        handleSetProductInfo(data.data)
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

  useEffect(() => {
    if (totalRatings === 0 || data === undefined) {
      return
    }
    handleSetRating(ratingAvg(data.ratings, totalRatings))
  }, [totalRatings, data])

  return (
    <Section>
      {data.ratings !== undefined ? (
        <div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <strong
                style={{ fontSize: 48, fontWeight: 700, marginRight: 18 }}
              >
                {ratingAvg(data.ratings, totalRatings)}
              </strong>
              <QuarterRating rating={ratingAvg(data.ratings, totalRatings)} />
            </div>
            <div>
              {/* <QuarterRating rating={parseInt(data.ratings, totalRatings)} /> */}
            </div>
          </div>
          <p>
            {recommended(data.recommended)}% of reviews recommended this product
          </p>
          <ul>
            {['5', '4', '3', '2', '1'].map((rating) => {
              return (
                <li key={rating + 'stars'}>
                  <StarBarContainer>
                    <div
                      style={{
                        width: 50,
                        paddingRight: 4,
                        flexGrow: 0,
                      }}
                    >
                      <a href="#" onClick={handleRatingClick(rating)}>
                        {rating} stars
                      </a>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <Bar
                        percent={parseInt(data.ratings[rating]) / totalRatings}
                      />
                    </div>
                  </StarBarContainer>
                </li>
              )
            })}
          </ul>
          <div>
            <ul>
              {Object.keys(data.characteristics).map((key) => {
                return (
                  <li key={key} style={{ fontSize: 15, marginBottom: 12 }}>
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
    </Section>
  )
}

export default ReviewSidePanel
