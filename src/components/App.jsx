import React from 'react'
import { useState, useEffect } from 'react'
import Questions from './Questions.jsx'
import RelatedProducts from './related/RelatedProducts.jsx'
import axios from 'axios'
import OverviewWidget from './overview/OverviewWidget'
import Review from './review/Review'

const fetchheaders = {
  Authorization: process.env.API_TOKEN,
}

const PRODUCT_ID = 37311

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
      <h1>Hello world React!</h1>
      {/* <p>AppState: {Object.keys(appState)}</p>
      <OverviewWidget /> */}
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
