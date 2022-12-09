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
  const [sizeSelected, setSizeSelected] = useState('')
  const [qtyText, setqtyText] = useState('Select Qty')

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

  const getSkuInfo = () => {
    let result = []
    if (selectedStyle.length > 0) {
      let style = selectedStyle[0].skus
      let options = Object.keys(style)

      if (options.length > 0) {
        options.forEach((option) => {
          let quantity = style[option].quantity
          let size = style[option].size
          result.push({ id: option, quantity: quantity, size: size })
        })
      }
      let quantities = {}
      for (let i = 0; i < result.length; i++) {
        if (!quantities[result[i].size]) {
          quantities[result[i].size] = result[i].quantity
        } else {
          quantities[result[i].size] += result[i].quantity
        }
      }
      return quantities
    }
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
              ? '$' + selectedStyle[0].sale_price
              : '$' + selectedStyle[0].original_price}
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
          <DropdownSize
            getSkuInfo={getSkuInfo}
            setSizeSelected={setSizeSelected}
          />
          <DropdownQty
            getSkuInfo={getSkuInfo}
            sizeSelected={sizeSelected}
            qtyText={qtyText}
            setqtyText={setqtyText}
          />
        </div>
        <div className="cart">
          <Addtocart qtyText={qtyText} />
        </div>
      </div>
    )
  }
  return <div>Loading</div>
}
