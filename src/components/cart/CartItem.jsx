import React, { useState } from 'react'

const CartItem = ({ item, updateCartItemsHandler }) => {
  const [quantity, setQuantity] = useState(parseInt(item.quantity))
  const { product } = item

  const handleSelectChange = (e) => {
    e.preventDefault()
    const newQty = parseInt(e.target.value)
    setQuantity(newQty)
    let updatedItem = {
      product: product,
      quantity: newQty,
    }
    updateCartItemsHandler('CHANGE_QUANTITY', updatedItem)
  }

  const handleDeleteItem = (e) => {
    e.preventDefault()
    updateCartItemsHandler('DELETE', { product: product })
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
        <span>
          <a href="#" onClick={handleDeleteItem}>
            x
          </a>{' '}
          and heart button
        </span>
      </div>
    </div>
  )
}

export default CartItem
