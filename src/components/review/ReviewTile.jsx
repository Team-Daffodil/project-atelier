import React, { useState } from 'react'
import DateFormatter from '../common/DateFormatter'
import { maxChars } from '../../lib/review'

const ReviewTile = ({ review }) => {
  const [isExpanded, setExpanded] = useState(false)

  const buttonText = () => {
    return isExpanded ? 'Show less' : 'Show more'
  }

  const handleBodyToggle = (e) => {
    e.preventDefault()
    setExpanded(!isExpanded)
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
      <div>
        <p>
          Helpful? Yes{' '}
          {review.helpfulness > 0 && <span>({review.helpfulness})</span>} |
          Report
        </p>
      </div>
    </section>
  )
}

export default ReviewTile
