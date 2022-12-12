import React, { useState } from 'react'

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(parseInt(item.quantity))
  const { product } = item

  const handleSelectChange = (e) => {
    e.preventDefault()
    setQuantity(parseInt(e.target.value))
  }

  const renderOptions = (qty) => {
    let options = []
    for (let i = 0; i <= 20; i++) {
      options.push(
        <option value={i} key={product.sku + '-' + i}>
          {i}
        </option>
      )
    }
    return options
  }

  return (
    <div>
      <div>Image</div>
      <div>
        <div>
          {product.name} | {product.price * quantity}
        </div>
        <div>{product.style}</div>
        <div>{product.size}</div>
        <div>
          <select
            name="item-quantity"
            defaultValue={quantity}
            onChange={handleSelectChange}
          >
            {renderOptions(quantity)}
          </select>
        </div>
      </div>
      <div>
        <span>x and heart button</span>
      </div>
    </div>
  )
}

export default CartItem
