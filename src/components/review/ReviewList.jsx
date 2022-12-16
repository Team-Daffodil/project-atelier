import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import ReviewTile from './ReviewTile'
import Modal from './NewFormModal'
import NewReviewForm from './NewReviewForm'

const headers = { Authorization: process.env.API_TOKEN }

const elemHeight = 800
const scrollDelta = 10

const RadioGroup = styled.div`
  margin-left: 12px;
  display: flex;

  label {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 12px;

    &:hover {
      background-color: #dfdfdf;
    }
  }

  input[type='checkbox'],
  input[type='radio'] {
    appearance: none;
    height: 18px;
    width: 18px;
    background: #fff;
    border: 2px solid ${(props) => props.subtle};
    margin: 0 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline-offset: 5px;
    outline-color: ${(props) => props.subtle};

    &:disabled {
      opacity: 0.7;
      background: ${(props) => props.subtle};
      cursor: not-allowed;
    }

    &:after {
      content: '';
      display: block;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
    }

    &:checked:after {
      transform: scale(1);
    }
  }

  input[type='checkbox'] {
    border-radius: 5px;

    &:after {
      width: 16px;
      height: 16px;
    }

    &:checked {
      border: none;
      background-color: ${(props) => props.primary};

      &:after {
        content: url("data:image/svg+xml, <svg viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fill='white' d='M15.25.847a1.51 1.51 0 0 1 .405 2.096L8.106 14.11a1.944 1.944 0 0 1-2.94.329L.6 10.156a1.51 1.51 0 1 1 2.067-2.202l3.645 3.42 6.841-10.122a1.51 1.51 0 0 1 2.098-.405Z'/></svg>");
      }
    }
  }

  input[type='radio'] {
    border-radius: 12px;

    &:after {
      width: 10px;
      height: 10px;
      border-radius: 4px;
    }

    &:checked {
      border-color: ${(props) => props.primary};

      &:after {
        background-color: ${(props) => props.primary};
      }
    }
  }

  button:hover {
    cursor: pointer;
  }
`
const ReviewList = ({
  productId,
  rating,
  productInfo,
  handleSetReviewsTotal,
}) => {
  const [reviews, setReviews] = useState([])
  const [visibleReviews, setVisibleReviews] = useState([])
  const [sortParam, setSortParam] = useState('relevant')
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
    <section style={{ flexGrow: 1 }}>
      <div
        style={{
          height: elemHeight - 100,
          maxHeight: elemHeight,
          overflowY: 'auto',
          width: '100%',
        }}
        onScroll={handleScroll}
      >
        <div
          aria-labelledby="reviews-navigation"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <span>{reviews.length} reviews, sorted by:</span>
          <RadioGroup primary={'red'} subtle={'black'}>
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
          </RadioGroup>
        </div>
        {reviews.length > 0 && (
          <ul title="review-list" style={{ listStyle: 'none', padding: 0 }}>
            {visibleReviews.map((review) => (
              <li data-testid="review-tile" key={review.review_id}>
                <ReviewTile review={review} />
              </li>
            ))}
          </ul>
        )}
        <div></div>
      </div>
      <div>
        {visibleReviews.length < reviews.length && (
          <button
            className="button-more-questions question-buttons"
            onClick={handleMoreClick}
            style={{ cursor: 'pointer' }}
          >
            MORE REVIEWS
          </button>
          // <a href="#" onClick={handleMoreClick}>
          //   More Reviews
          // </a>
        )}
        <button
          className="question-button-ask question-buttons"
          onClick={() => setModalIsOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          ADD REVIEW
        </button>
        {modalIsOpen && (
          <Modal setModalIsOpen={setModalIsOpen}>
            <NewReviewForm
              productInfo={productInfo}
              setModalIsOpen={setModalIsOpen}
            />
          </Modal>
        )}
      </div>
    </section>
  )
}

export default ReviewList
