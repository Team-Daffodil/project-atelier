import React, { useState } from 'react'
import DateFormatter from '../common/DateFormatter'
import { maxChars } from '../../lib/review'
import axios from 'axios'
import styled from 'styled-components'

import ImageThumbs from '../common/ImageThumbs'
import QuarterRating from '../common/QuarterRating'

const headers = {
  Authorization: process.env.API_TOKEN,
  ContentType: 'application/json',
}

const SummaryText = styled.p`
  font-size: 18px;
  font-weight: 700;
`

const ReviewTile = ({ review }) => {
  const [isExpanded, setExpanded] = useState(false)
  const [isHelpful, setHelpful] = useState(null)

  const buttonText = () => {
    return isExpanded ? 'Show less' : 'Show more'
  }

  const handleBodyToggle = (e) => {
    e.preventDefault()
    setExpanded(!isExpanded)
  }

  const handleHelpfulnessClick = (resp) => {
    return (e) => {
      e.preventDefault()
      if (isHelpful !== null) {
        return
      } else if (resp === 'yes') {
        const url = process.env.API_URL + `/reviews/${review.review_id}/helpful`
        axios
          .put(url, { reviewId: review.review_id }, { headers: headers })
          .then((resp) => {
            setHelpful(true)
            e.target.style.fontWeight = '900'
          })
          .catch((err) => console.log('helpful PUT error:', err))
      } else if (resp === 'no') {
        const url = process.env.API_URL + `/reviews/${review.review_id}/report`
        axios
          .put(url, { reviewId: review.review_id }, { headers: headers })
          .then((resp) => {
            setHelpful(false)
            e.target.style.fontWeight = '900'
          })
          .catch((err) => console.log('PUT report err:', err))
      }
    }
  }

  return (
    <section style={{ borderBottom: '1px solid black', marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          Stars: {review.rating}
          {/* <QuarterRating rating={review.rating} /> */}
        </div>
        <div style={{ fontSize: 15 }}>
          {review.reviewer_name}, <DateFormatter ts={review.date} />
        </div>
      </div>
      <div>
        <SummaryText>{maxChars(review.summary, 60)}</SummaryText>
      </div>
      <div style={{ fontSize: 15 }}>
        <p title="review-content">
          {!isExpanded ? maxChars(review.body, 250) : review.body}
        </p>
        {review.body.length > 250 && (
          <a href="#" onClick={handleBodyToggle}>
            {buttonText()}
          </a>
        )}
      </div>
      {review.photos.length && (
        <ImageThumbs photos={review.photos.map((photo) => photo.url)} />
      )}
      {review.recommend && <div>I recommend this product</div>}
      {review.response && (
        <div role="note" style={{ backgroundColor: 'lightgray' }}>
          <p>Reponse:</p>
          <p>{review.response}</p>
        </div>
      )}
      <div>
        <p>
          Helpful?{' '}
          <a href="#" onClick={handleHelpfulnessClick('yes')}>
            Yes
          </a>{' '}
          {review.helpfulness > 0 && (
            <span id="helpfulness-count">
              ({isHelpful ? review.helpfulness + 1 : review.helpfulness})
            </span>
          )}{' '}
          |{' '}
          <a href="#" onClick={handleHelpfulnessClick('no')}>
            No
          </a>
        </p>
      </div>
    </section>
  )
}

export default ReviewTile
