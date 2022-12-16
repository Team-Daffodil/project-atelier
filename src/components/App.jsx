import React from 'react'
import { useState, useEffect } from 'react'
import Questions from './Questions.jsx'
import RelatedProducts from './related/RelatedProducts.jsx'
import axios from 'axios'
import OverviewWidget from './overview/OverviewWidget.jsx'
import Review from './review/Review'
import Navbar from './navbar/Navbar.jsx'
import Outfit from './related/Outfit.jsx'

const fetchheaders = {
  Authorization: process.env.API_TOKEN,
}

let PRODUCT_ID = 37313
if (window !== undefined) {
  let segs = window.location.href.split('?')
  if (segs.length > 1) {
    PRODUCT_ID = segs[segs.length - 1]
  }
}

const App = () => {
  const [appState, setAppState] = useState({ productId: PRODUCT_ID })
  const [outfit, setOutfit] = useState([])
  const handleSetReviewData = (reviewData) => {
    setAppState({
      ...appState,
      ...reviewData,
    })
  }
  const deleteOutfit = (id) => {
    console.log('SOMETHING')
    setOutfit(
      outfit.filter((item) => {
        if (item.id !== id) {
          return item
        }
      })
    )
  }
  const addToOutfitHandler = (event, product, styles, rating, productId) => {
    console.log(event.nativeEvent)
    console.log('ADD TO OUTFIT: ', product, styles, rating)
    let tempObj = {}
    tempObj.category = product.category
    tempObj.name = product.name
    tempObj.sale = styles.sale
    tempObj.price = styles.price
    tempObj.image = styles.image
    tempObj.rating = rating
    tempObj.id = productId
    tempObj.added = true
    setOutfit([...outfit, tempObj])
  }

  useEffect(() => {
    console.log('what is the app state', appState)
  }, [appState])

  return (
    <section id="app" data-testid="app">
      <Navbar />
      <OverviewWidget appState={appState} />
      <RelatedProducts productId={appState.productId} addToOutfitHandler={addToOutfitHandler} />
      <Outfit outfit={outfit} deleteOutfit={deleteOutfit} />
      <Questions />
      <Review
        productId={appState.productId}
        handleSetReviewData={handleSetReviewData}
      />
    </section>
  )
}

export default App
