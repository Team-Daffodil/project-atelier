import React from 'react'
import { useState, useEffect } from 'react'
import InfoPanel from './InfoPanel.jsx'
import Description from './Description.jsx'
import Gallery from './Gallery.jsx'
import axios from 'axios'

export default function OverviewWidget() {
  const api = process.env.API_URL
  const fetchheaders = {
    Authorization: process.env.API_TOKEN,
  }
  const [product, setProduct] = useState([])
  const [styles, setAllStyles] = useState([])
  const [selectedStyle, setSelectedStyle] = useState([])

  const fetchProducts = () => {
    return axios
      .get(process.env.API_URL + 'products/37311', { headers: fetchheaders })
      .then((data) => {
        setProduct(data.data)
        return data.data
      })
      .catch((err) => {
        console.log('Error getting products', err)
      })
  }

  const fetchStyles = (id) => {
    return axios
      .get(`${api}products/${id}/styles`, {
        headers: fetchheaders,
      })
      .then((data) => {
        // return data.data.results
        setAllStyles(data.data.results)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchProducts().then((data) => {
      fetchStyles(data.id)
    })
  }, [])
  return (
    <>
      {/* <div className="overview"> */}
      {/* <div className="gallerycart"> */}
      {/* <Gallery /> */}
      <InfoPanel
        fetchStyles={fetchStyles}
        product={product}
        styles={styles}
        setAllStyles={setAllStyles}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />
      {/* </div> */}
      {/* <Description product={product} /> */}
      {/* </div> */}
    </>
  )
}
