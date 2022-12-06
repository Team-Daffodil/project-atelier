import React from 'react'
import DateFormatter from '../common/DateFormatter'
import { maxChars } from '../../lib/review'

const ReviewTile = ({ review }) => {
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
        <p>{maxChars(review.body, 250)}</p>
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
