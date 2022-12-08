import React, { useState } from 'react'
import ReviewList from './ReviewList'
import ReviewSidePanel from './ReviewSidePanel'

const Review = ({ productId }) => {
  const [rating, setRating] = useState(undefined)

  const handleRatingChange = (val) => {
    if (parseInt(val) === rating) {
      setRating(undefined)
    } else {
      setRating(parseInt(val))
    }
  }

  return (
    <section>
      <h3>{rating && rating}</h3>
      <ReviewSidePanel
        productId={productId}
        handleRatingChange={handleRatingChange}
      />
      <ReviewList productId={productId} rating={rating} />
    </section>
  )
}

export default Review
