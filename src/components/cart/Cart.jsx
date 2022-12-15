import React, { useEffect, useState } from 'react'
import CartDetails from './CartDetails'
import Delivery from './Delivery'
import OrderSummary from './OrderSummary'
import Payment from './Payment'

const LoadingPage = () => {
  return <p>Loading...</p>
}

const Confirmation = () => {
  return <div>Order confirmed</div>
}

const Cart = ({ appState }) => {
  const [active, setActive] = useState(LoadingPage)
  const [cart, setCart] = useState(appState.cart)

  const updateCartItemsHandler = (action, updatedItem) => {
    if (action === 'DELETE') {
      const newItems = cart.filter(
        (item) => item.product.sku !== updatedItem.product.sku
      )
      setCart(newItems)
    } else if (action === 'CHANGE_QUANTITY') {
      const newItems = cart.map((item) => {
        if (item.product.sku === updatedItem.product.sku) {
          return updatedItem
        } else {
          return item
        }
      })
      setCart(newItems)
    }
  }

  useEffect(() => {
    setActive(
      <CartDetails
        items={cart}
        updateCartItemsHandler={updateCartItemsHandler}
      />
    )
  }, [])

  useEffect(() => {
    setActive(
      <CartDetails
        items={cart}
        updateCartItemsHandler={updateCartItemsHandler}
      />
    )
  }, [cart])

  const switchPage = (page) => {
    return (e) => {
      e.preventDefault()
      if (page === 'cart') {
        setActive(
          <CartDetails
            items={cart}
            updateCartItemsHandler={updateCartItemsHandler}
          />
        )
      } else if (page === 'delivery') {
        setActive(<Delivery />)
      } else if (page === 'payment') {
        setActive(<Payment />)
      } else if (page === 'confirmation') {
        setActive(<Confirmation />)
      } else {
        // 404
      }
    }
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={switchPage('cart')}>
              Cart
            </a>
          </li>
          <li>
            <a href="#" onClick={switchPage('delivery')}>
              Delivery
            </a>
          </li>
          <li>
            <a href="#" onClick={switchPage('payment')}>
              Payment
            </a>
          </li>
          <li>
            <a href="#" onClick={switchPage('confirmation')}>
              Order Complete
            </a>
          </li>
        </ul>
      </nav>
      {active}
      <OrderSummary items={cart} />
    </div>
  )
}

export default Cart
