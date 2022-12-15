import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedCard from './RelatedCard.jsx'
import { IconContext } from 'react-icons'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import OutfitCard from './OutfitCard.jsx'


const Outfit = ({ outfit, deleteOutfit }) => {
  const [curIndex, setCurIndex] = useState(2)
  const carouselButtons = () => (
    <div className='outfit-arrows'>
      <IconContext.Provider value={{ color: 'beige', size: '40px' }}>
        <SlArrowLeft
          className="button-outfit-left"
          onClick={carouselMoveLeftHandler}
        />
      </IconContext.Provider>

      <IconContext.Provider value={{ color: 'beige', size: '40px' }}>
        <SlArrowRight
          className="button-outfit-right"
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
    if (curIndex <= outfit.length - 4) {
      setCurIndex(curIndex + 1)
    }
  }



  return (
    <section className="outfit-container">
      {outfit.length > 5 ? carouselButtons() : null}
      <div className="outfit-header">outfit Products</div>
      <div className="outfit-carousel">
        {outfit &&
          outfit.map((item, i) => {
            if ((i >= curIndex - 2) & (i <= curIndex + 2)) {
              return (
                <OutfitCard
                  product={item}
                  deleteOutfit={deleteOutfit}
                  i={i}
                  key={i}
                />
              )
            }
          })}
      </div>
    </section>
  )

}

export default Outfit