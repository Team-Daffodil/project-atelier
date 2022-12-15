import React from 'react'
import { useState, useEffect } from 'react'
import Questions from './Questions.jsx'
import RelatedProducts from './related/RelatedProducts.jsx'
import axios from 'axios'
import OverviewWidget from './overview/OverviewWidget.jsx'
import Review from './review/Review'

const fetchheaders = {
  Authorization: process.env.API_TOKEN,
}

let PRODUCT_ID = 37311
if (window !== undefined) {
  let segs = window.location.href.split('/')
  PRODUCT_ID = segs[segs.length - 1]
}

const App = () => {
  const [appState, setAppState] = useState({ productId: PRODUCT_ID, cart: [] })

  const handleSetReviewData = (reviewData) => {
    setAppState({
      ...appState,
      ...reviewData,
    })
  }

  useEffect(() => {
    console.log('what is the app state', appState)
  }, [appState])

  return (
    <section id="app">
      <h1>SearchBarPlaceholder</h1>
      <OverviewWidget appState={appState} />
      <RelatedProducts />
      <Questions />
      <Review
        productId={appState.productId}
        handleSetReviewData={handleSetReviewData}
      />
    </section>
  )
}

export default App
