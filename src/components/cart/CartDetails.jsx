import React from 'react'
import { totalPrice } from '../../lib/cart'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'

const CartDetails = ({ items }) => {
  return (
    <section>
      <h3>Your Cart</h3>
      <p>
        Total ({items.length} items) ${totalPrice(items)}
      </p>
      <div>
        <ul>
          {items.map((item) => (
            <CartItem product={item} />
          ))}
        </ul>
      </div>
      <div>
        <OrderSummary items={items} />
      </div>
    </section>
  )
}
export default CartDetails
