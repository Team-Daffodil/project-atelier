import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './components/App.jsx'

const element = document.getElementById('app')
const root = ReactDOM.createRoot(element)
root.render(<App />)
console.log('hi')
