import React from 'react'
import { useState, useEffect } from 'react'
import Questions from './Questions.jsx'
import axios from 'axios'
import OverviewWidget from './overview/OverviewWidget.jsx'

const fetchheaders = {
  Authorization: process.env.API_TOKEN,
}
const App = () => {
  return (
    <section id="app">
      <h1>Hello world React!</h1>
      {/* <OverviewWidget /> */}
      <Questions />
    </section>
  )
}

export default App
