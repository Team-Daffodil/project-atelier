import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuarterRating from '../common/QuarterRating.jsx'
import DeleteOutfit from '../common/DeleteOutfit.jsx'
let headers = { Authorization: process.env.API_TOKEN }

const OutfitCard = ({ product, i, deleteOutfit }) => {

  const deleteCard = (e) => {
    deleteOutfit(product.id)
  }

  const salePrice = () => {
    return (
      <div>
        Sale: {' '}
        <span style={{color: 'red'}}>{product.sale}{' '}</span>
        <span style={{ textDecoration: 'line-through' }}>{product.price}</span>
      </div>
    )
  }

  return (
    <div className="outfit-card" id={i}>
      <DeleteOutfit deleteCard={deleteCard} />
      <img className="outfit-card-image" src={product.image}></img>
      <div className="outfit-card-info">
        <div tyle={{fontSize: '14px', fontWeight: '200', marginBottom: '2px', marginLeft: '10px'}}>{product.category}</div>
        <div style={{fontSize: '15px', fontWeight: '400', marginBottom: '3px', marginLeft: '20px'}}>{product.name}</div>
        <div style={{ marginLeft: '40px'}}><div>{product.sale ? salePrice() : `$${product.price}`}</div></div>
        <div className='card-flowers' style={{ marginTop: '3px', marginLeft: '60px'}}><QuarterRating rating={product.rating} /></div>
      </div>
    </div>
  )


}

export default OutfitCard