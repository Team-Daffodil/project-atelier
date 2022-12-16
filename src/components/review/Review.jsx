import React, { useState, useEffect } from 'react'
import ReviewList from './ReviewList'
import ReviewSidePanel from './ReviewSidePanel'

const sectionContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: 25,
}

const Review = ({ productId, handleSetReviewData }) => {
  const [rating, setRating] = useState(undefined)
  const [productRating, setProductRating] = useState(undefined)
  const [totalReviews, setTotalReviews] = useState(undefined)

  const handleRatingChange = (val) => {
    if (parseInt(val) === rating) {
      setRating(undefined)
    } else {
      setRating(parseInt(val))
    }
  }

  const handleSetReviewsTotal = (total) => {
    setTotalReviews(total)
  }

  const handleSetRating = (rating) => {
    setProductRating(rating)
  }
  useEffect(() => {
    if (productRating === undefined || totalReviews === undefined) {
      return
    }

    handleSetReviewData({ rating: productRating, totalReviews: totalReviews })
  }, [productRating, totalReviews])

  return (
    <section id="review-section" style={sectionContainerStyle}>
      <h3>Ratings & Review</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ReviewSidePanel
          productId={productId}
          handleRatingChange={handleRatingChange}
          handleSetRating={handleSetRating}
        />
        <ReviewList
          productId={productId}
          rating={rating}
          handleSetReviewsTotal={handleSetReviewsTotal}
        />
      </div>
    </section>
  )
}

export default Review
