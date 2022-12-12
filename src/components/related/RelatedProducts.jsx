import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedCard from './RelatedCard.jsx'
console.log('DOTENV URL', process.env.API_URL, process.env.API_TOKEN)

let headers = { Authorization: process.env.API_TOKEN }
const RelatedProducts = () => {
  const [relatedID, setRelatedID] = useState([])
  const [related, setRelated] = useState([])
  const [curIndex, setCurIndex] = useState(2)
  const carouselButtons = () => (
    <div>
      <button className="button-related-left" onClick={carouselChangeHandler}>
        LEFT
      </button>
      <button className="button-related-right" onClick={carouselChangeHandler}>
        RIGHT
      </button>
    </div>
  )
  const carouselChangeHandler = (e) => {
    console.log('CAROUSEL direction: ', e.nativeEvent.target.className)
    if (
      (e.nativeEvent.target.className === 'button-related-left') &
      (curIndex > 2)
    ) {
      setCurIndex(curIndex - 1)
    }
    if (
      (e.nativeEvent.target.className === 'button-related-right') &
      (curIndex <= relatedID.length - 4)
    ) {
      setCurIndex(curIndex + 1)
    }
  }

  useEffect(() => {
    axios
      .get(process.env.API_URL + '/products/37317/related', {
        headers,
      })
      .then((response) => {
        setRelatedID(response.data)
      })
  }, [])

  if (relatedID.length) {
    console.log(relatedID)
    return (
      <section className="related-container">
        {relatedID.length > 5 ? carouselButtons() : null}
        <div className="related-header">Related Products</div>
        <div className="related-carousel">
          {relatedID &&
            relatedID.map((item, i) => {
              if ((i >= curIndex - 2) & (i <= curIndex + 2)) {
                return <RelatedCard productId={item} key={item} />
              }
            })}
        </div>
      </section>
    )
  }
}

export default RelatedProducts
