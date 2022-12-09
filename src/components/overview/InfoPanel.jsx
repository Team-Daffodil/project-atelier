import * as React from 'react'
import Rating from '@mui/material/Rating'
import { useState, useEffect } from 'react'
import DropdownSize from './DropdownSize.jsx'
import DropdownQty from './DropdownQty.jsx'
import Addtocart from './Addtocart.jsx'
import axios from 'axios'

export default function InfoPanel({
  fetchStyles,
  product,
  styles,
  setAllStyles,
  selectedStyle,
  setSelectedStyle,
}) {
  const [value, setValue] = useState(2)
  const getDefaultStyle = () => {
    if (styles.length > 0) {
      let defaultStyle = styles.filter((el) => el['default?'] === true)
      setSelectedStyle(defaultStyle)
    }
  }
  const handlePicClick = (e) => {
    let id = e.target.id
    let newSelect = styles.filter((style) => {
      return Number(style.style_id) === Number(id)
    })
    setSelectedStyle(newSelect)
  }

  useEffect(() => {
    getDefaultStyle()
  }, [styles])

  if (product.id && styles.length > 0 && selectedStyle.length > 0) {
    return (
      <div className="info-container">
        <div className="reviews">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          />
          <div className="read">Read all reviews (25)</div>
        </div>
        <div className="productInfo">
          <h4>{product.category}</h4>
          <h1>{product.name}</h1>
          <div>
            {selectedStyle[0].sale_price
              ? selectedStyle[0].sale_price
              : selectedStyle[0].original_price}
          </div>
        </div>
        <div className="style">
          <div>
            Style {'>'}
            {selectedStyle[0].name}
          </div>
          <div className="stylethumbnails">
            {styles.map((style, i) => {
              let thumbnail = style.photos[0].thumbnail_url
              return (
                <div className="thumbnailborder" key={thumbnail}>
                  <img
                    id={style.style_id}
                    src={thumbnail}
                    key={thumbnail}
                    onClick={(e) => handlePicClick(e)}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="sizeselector">
          <DropdownSize />
          <DropdownQty />
        </div>
        <div className="cart">
          <Addtocart />
        </div>
      </div>
    )
  }
  return <div>Loading</div>
}
