import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'

const CartDetails = ({ items, updateCartItemsHandler }) => {
  return (
    <section>
      <h3>Your Cart</h3>
      <p>Total ({items.length} items)</p>
      <div>
        <ul>
          {items.map((item) => (
            <CartItem
              item={item}
              updateCartItemsHandler={updateCartItemsHandler}
              key={item.product.sku}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
export default CartDetails
