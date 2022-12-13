import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'

const CartDetails = ({ items }) => {
  const [cartItems, setCartItems] = useState(items)
  const [cartValue, setCartValue] = useState(0)

  const setCartValueHandler = (val) => {
    setCartValue(val)
  }

  const updateCartItemsHandler = (action, updatedItem) => {
    if (action === 'DELETE') {
      const newItems = cartItems.filter(
        (item) => item.product.sku !== updatedItem.product.sku
      )
      setCartItems(newItems)
    } else if (action === 'CHANGE_QUANTITY') {
      const newItems = cartItems.map((item) => {
        if (item.product.sku === updatedItem.product.sku) {
          return updatedItem
        } else {
          return item
        }
      })
      setCartItems(newItems)
    }
  }

  return (
    <section>
      <h3>Your Cart</h3>
      <p>Total ({cartItems.length} items)</p>
      <div>
        <ul>
          {cartItems.map((item) => (
            <CartItem
              item={item}
              updateCartItemsHandler={updateCartItemsHandler}
              key={item.product.sku}
            />
          ))}
        </ul>
      </div>
      <div>
        <OrderSummary
          items={cartItems}
          setCartValueHandler={setCartValueHandler}
        />
      </div>
    </section>
  )
}
export default CartDetails
