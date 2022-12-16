import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ReviewTile from './ReviewTile'

const headers = { Authorization: process.env.API_TOKEN }

const elemHeight = 800
const scrollDelta = 10

const ReviewList = ({ productId, rating, handleSetReviewsTotal }) => {
  const [reviews, setReviews] = useState([])
  const [visibleReviews, setVisibleReviews] = useState([])
  const [sortParam, setSortParam] = useState('relevant')

  const appendVisible = () => {
    const len = visibleReviews.length
    if (len === reviews.length) {
      return
    }

    setVisibleReviews(visibleReviews.concat(reviews.slice(len, len + 2)))
  }

  useEffect(() => {
    let params = new URLSearchParams({
      sort: sortParam,
      count: 1000,
      page: 1,
    })
    params.set('product_id', productId)

    axios
      .get(process.env.API_URL + '/reviews?' + params.toString(), {
        headers: headers,
      })
      .then(({ data }) => {
        let reviews = data.results.filter((review) => {
          return rating === undefined || review.rating === rating
        })
        setReviews(reviews)
        handleSetReviewsTotal(reviews.length)
      })
      .catch((err) => console.log('err:', err))
  }, [sortParam, rating])

  useEffect(() => {
    setVisibleReviews(reviews.slice(0, 2))
  }, [reviews])

  const handleMoreClick = (e) => {
    e.preventDefault()
    appendVisible()
  }

  const handleSortOptionChange = (e) => {
    setVisibleReviews([])
    setSortParam(e.target.value)
  }

  const handleScroll = (e) => {
    if (visibleReviews.length === reviews.length) {
      return
    }

    const { scrollHeight, scrollTop } = e.target
    if (scrollHeight - (scrollTop + scrollDelta) <= elemHeight) {
      setTimeout(() => appendVisible(), 500)
    }
  }

  return (
    <section
      style={{ height: elemHeight, overflowY: 'auto', flexGrow: 1 }}
      onScroll={handleScroll}
    >
      <nav aria-labelledby="reviews-navigation">
        <span>{reviews.length} reviews, sorted by:</span>
        <label htmlFor="relevance">
          <input
            type="radio"
            id="relevant"
            name="sort-by"
            value="relevant"
            checked={sortParam === 'relevant'}
            onChange={handleSortOptionChange}
          />
          relevance
        </label>
        <label htmlFor="newest">
          <input
            type="radio"
            id="newest"
            name="sort-by"
            value="newest"
            checked={sortParam === 'newest'}
            onChange={handleSortOptionChange}
          />
          newest
        </label>
        <label htmlFor="helpful">
          <input
            type="radio"
            id="helpful"
            name="sort-by"
            value="helpful"
            checked={sortParam === 'helpful'}
            onChange={handleSortOptionChange}
          />
          helpful
        </label>
      </nav>
      {reviews.length > 0 && (
        <ul title="review-list" style={{ listStyle: 'none', padding: 0 }}>
          {visibleReviews.map((review) => (
            <li data-testid="review-tile" key={review.review_id}>
              <ReviewTile review={review} />
            </li>
          ))}
        </ul>
      )}
      <div>
        {visibleReviews.length < reviews.length && (
          <button
            className="button-more-questions question-buttons"
            onClick={handleMoreClick}
          >
            MORE REVIEWS
          </button>
          // <a href="#" onClick={handleMoreClick}>
          //   More Reviews
          // </a>
        )}
        <button className="question-button-ask question-buttons">
          ADD REVIEW
        </button>
      </div>
    </section>
  )
}

export default ReviewList
