import React, { useState } from 'react'
import DateFormatter from '../common/DateFormatter'
import { maxChars } from '../../lib/review'
import axios from 'axios'

const headers = {
  Authorization: process.env.API_TOKEN,
  ContentType: 'application/json',
}

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
        const url = process.env.API_URL + `/reviews/${review.reviewId}/helpful`
        axios
          .put(url, { reviewId: review.reviewId }, { headers: headers })
          .then((resp) => {
            setHelpful(true)
            e.target.style.fontWeight = '900'
          })
          .catch((err) => console.log('helpful PUT error:', err))
      } else if (resp === 'no') {
        const url = process.env.API_URL + `/reviews/${review.reviewId}/report`
        axios
          .put(url, { reviewId: review.reviewId }, { headers: headers })
          .then((resp) => {
            setHelpful(false)
            e.target.style.fontWeight = '900'
          })
          .catch((err) => console.log('PUT report err:', err))
      }
    }
  }

  return (
    <section>
      <div>
        <div>Stars: {review.rating}</div>
        <div>
          {review.reviewerName}, <DateFormatter ts={review.date} />
        </div>
      </div>
      <div>
        <h3>{maxChars(review.summary, 60)}</h3>
      </div>
      <div>
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
        <ul>
          {review.photos.map((photo, i) => (
            <li key={i}>
              <a href={photo.url}>Photo {i}</a>
            </li>
          ))}
        </ul>
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
