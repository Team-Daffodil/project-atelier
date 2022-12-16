import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuarterRating from '../common/QuarterRating.jsx'

let headers = { Authorization: process.env.API_TOKEN }

const OutfitCard = ({ product, i, deleteOutfit }) => {

  const deleteCard = (e) => {
    deleteOutfit(product.id)
  }

  const salePrice = () => {
    return (
      <div>
        Sale: {product.sale}{' '}
        <span style={{ textDecoration: 'line-through' }}>{product.price}</span>
      </div>
    )
  }

  return (
    <div className="outfit-card" id={i}>
      <button onClick={e => deleteCard(e)}>DELETE</button>
      <img className="outfit-card-image" src={product.image}></img>
      <div className="outfit-card-info">
        <div>{product.category}</div>
        <div>{product.name}</div>
        <div>{product.sale ? salePrice() : product.price}</div>
        <QuarterRating rating={product.rating} />
      </div>
    </div>
  )


}

export default OutfitCard