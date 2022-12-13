import React, { useEffect, useState } from 'react'
import CartDetails from './CartDetails'

const LoadingPage = () => {
  return <p>Loading...</p>
}

const Delivery = () => {
  return <div>Delivery Page</div>
}

const Payment = () => {
  return <div>Payment Information</div>
}

const Confirmation = () => {
  return <div>Order confirmed</div>
}

const Cart = ({ appState }) => {
  const [active, setActive] = useState(LoadingPage)
  const [cart, setCart] = useState(appState.cart)

  useEffect(() => {
    setActive(<CartDetails items={cart} />)
  }, [])

  const switchPage = (page) => {
    return (e) => {
      e.preventDefault()
      if (page === 'cart') {
        setActive(<CartDetails items={cart} />)
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
    </div>
  )
}

export default Cart
