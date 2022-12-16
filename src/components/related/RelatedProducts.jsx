import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedCard from './RelatedCard.jsx'
import { IconContext } from 'react-icons'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'

{
  /* <button className="button-related-left" onClick={carouselChangeHandler}>
        <IconContext.Provider value={{color: 'black', size: '40px'}}>
          <SlArrowLeft />
        </IconContext.Provider>
      </button>
      <button className="button-related-right" onClick={carouselChangeHandler}>
        <IconContext.Provider value={{color: 'black', size: '40px'}}>
          <SlArrowRight />
        </IconContext.Provider>
      </button> */
}

// <button className="button-related-left" onClick={carouselChangeHandler}>
//   LEFT
// </button>
// <button className="button-related-right" onClick={carouselChangeHandler}>
//   RIGHT
// </button>
let headers = { Authorization: process.env.API_TOKEN }
const RelatedProducts = ({ addToOutfitHandler, productId }) => {
  const [relatedID, setRelatedID] = useState([])
  const [related, setRelated] = useState([])
  const [curIndex, setCurIndex] = useState(2)
  const carouselButtons = () => (
    <div className="related-arrows">
      <IconContext.Provider value={{ color: 'black', size: '40px' }}>
        <SlArrowLeft
          className="button-related-left"
          onClick={carouselMoveLeftHandler}
        />
      </IconContext.Provider>

      <IconContext.Provider value={{ color: 'black', size: '40px' }}>
        <SlArrowRight
          className="button-related-right"
          onClick={carouselMoveRightHandler}
        />
      </IconContext.Provider>
    </div>
  )
  const carouselMoveLeftHandler = (e) => {
    if (curIndex > 2) {
      setCurIndex(curIndex - 1)
    }
  }
  const carouselMoveRightHandler = (e) => {
    if (curIndex <= relatedID.length - 4) {
      setCurIndex(curIndex + 1)
    }
  }

  useEffect(() => {
    axios
      .get(process.env.API_URL + `/products/${productId}/related`, {
        headers,
      })
      .then((response) => {
        setRelatedID(response.data)
      })
  }, [])

  if (relatedID.length) {
    return (
      <section className="related-container" id="related-section">
        {relatedID.length > 5 ? carouselButtons() : null}
        <div className="related-header">Related Products</div>
        <div className="related-carousel">
          {relatedID &&
            relatedID.map((item, i) => {
              if ((i >= curIndex - 2) & (i <= curIndex + 2)) {
                return (
                  <RelatedCard
                    id={i}
                    productId={item}
                    key={item}
                    addToOutfitHandler={addToOutfitHandler}
                  />
                )
              }
            })}
        </div>
      </section>
    )
  }
}

export default RelatedProducts
