import React, { useState, useEffect } from 'react'
import axios from 'axios'

let headers = { Authorization: process.env.API_TOKEN }

const RelatedCard = ({ productId }) => {
  const [styles, setStyles] = useState({})
  const [product, setProduct] = useState({})
  const salePrice = () => {
    return (
      <div>
        Sale: {styles.sale}{' '}
        <span style={{ textDecoration: 'line-through' }}>{styles.price}</span>
      </div>
    )
  }
  const getProductInfo = (id) => {
    axios
      .get(process.env.API_URL + `/products/${id}/styles`, {
        headers,
      })
      .then((item) => {
        let curItem = item.data.results[0]
        setStyles({
          ...styles,
          sale: curItem.sale_price,
          price: curItem.original_price,
          image: curItem.photos[0].thumbnail_url,
        })
      })
    axios
      .get(process.env.API_URL + `/products/${id}`, {
        headers,
      })
      .then((item) => {
        setProduct({
          ...product,
          category: item.data.category,
          name: item.data.name,
          slogan: item.data.slogan,
        })
      })
  }
  useEffect(() => {
    getProductInfo(productId)
  }, [])

  return (
    <div className="related-card">
      <img className="related-card-image" src={styles.image}></img>
      <div className="related-card-info">
        <div>{product.category}</div>
        <div>{product.name}</div>
        <div>{styles.sale ? salePrice() : styles.price}</div>
      </div>
    </div>
  )
}

export default RelatedCard
