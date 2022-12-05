import * as React from 'react'
import Rating from '@mui/material/Rating'
import { useState } from 'react'
import DropdownSize from './DropdownSize.jsx'
import DropdownQty from './DropdownQty.jsx'
import Addtocart from './Addtocart.jsx'

export default function InfoPanel() {
  const [value, setValue] = useState(2)
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
        <h4>Category</h4>
        <h1>Expanded Product Name</h1>
        <div>$495</div>
      </div>
      <div className="style">
        <div>Style {'>'} Orange Crop Top</div>
        <div>O O O O</div>
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
