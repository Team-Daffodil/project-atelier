import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ratingAvg } from '../../lib/review'
import QuarterRating from '../common/QuarterRating.jsx'
import AddOutfit from '../common/AddOutfit.jsx'

let headers = { Authorization: process.env.API_TOKEN }
let ESLINTBULLSHIT = 'product_id'
const RelatedCard = ({ productId, addToOutfitHandler }) => {
  const [styles, setStyles] = useState({})
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState(null)
  const salePrice = () => {
    return (
      <div class='style'>
        <>Sale: {' '}</>
        <span style={{color: 'red'}}>{styles.sale}{' '}</span>
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
    axios
      .get(process.env.API_URL + '/reviews/meta', { params: {'product_id': id},
        headers,
      })
      .then((item) => {
        setRating(ratingAvg(item.data.ratings))

      })
  }

  useEffect(() => {
    getProductInfo(productId)
  }, [])

  if (rating) {
    return (
      <div className="related-card" id={productId}>
        <AddOutfit product={product} styles={styles} rating={rating} productId={productId} addToOutfitHandler={addToOutfitHandler}/>
        <img className="related-card-image" src={styles.image}></img>
        <div className="related-card-info">
          <div>{product.category}</div>
          <div>{product.name}</div>
          <div>{styles.sale ? salePrice() : styles.price}</div>
          <QuarterRating rating={rating} key={productId}/>
        </div>
      </div>
    )
  }

}

export default RelatedCard
