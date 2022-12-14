import React, { useEffect, useState } from 'react'

import { totalPrice } from '../../lib/cart'

const checkCouponCode = (code) => {
  return new Promise((resolve, reject) => {
    const codes = process.env.VALID_COUPONS.split(',')
    codes.forEach((line) => {
      if (line.startsWith(code)) {
        let [code, discount] = line.split(':')
        discount = parseInt(discount) / 100
        return resolve({ code, discount })
      }
    })
    return reject('unknown code')
  })
}

const totalDiscounts = (promoCodes) => {
  return promoCodes.reduce((acc, promo) => (acc += promo.discount), 0)
}

const OrderSummary = ({ items }) => {
  const [promoCodes, setPromoCodes] = useState([])
  const [promoInput, setPromoInput] = useState('')
  const [badPromoCode, setBadPromoCode] = useState(null)

  const handlePromoInput = (e) => {
    setPromoInput(e.target.value)
  }

  const handlePromoSubmit = (e) => {
    e.preventDefault()
    const promo = promoInput.toLowerCase()
    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCodes[i].code === promo) {
        setBadPromoCode(
          `Coupon code ${promo.toUpperCase()} has already been added`
        )
        return
      }
    }

    checkCouponCode(promo)
      .then((code) => {
        setPromoCodes(promoCodes.concat(code))
      })
      .catch((err) => {
        setBadPromoCode(`Coupon coee ${promo.toUpperCase()} is unknown`)
      })
  }

  const totalCartValue = () => {
    return Math.max(
      Math.round(
        (totalPrice(items) - totalPrice(items) * totalDiscounts(promoCodes)) *
          100
      ) / 100,
      0
    )
  }

  useEffect(() => {
    setBadPromoCode(null)
    // setCartValueHandler(totalCartValue())
  }, [promoCodes])

  return (
    <div>
      <h3>Order Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>{items.length} ITEMS</td>
            <td>${totalPrice(items).toFixed(2)}</td>
          </tr>
          <tr>
            <td>DELIVERY</td>
            <td>FREE</td>
          </tr>
          <tr>
            <td>Sales Tax</td>
            <td>-</td>
          </tr>
          {promoCodes.map((promo) => {
            return (
              <tr key={promo.code}>
                <td>{promo.code.toUpperCase()}</td>
                <td>-{(promo.discount * totalPrice(items)).toFixed(2)}</td>
              </tr>
            )
          })}
          <tr>
            <td>Total</td>
            <td>${totalCartValue().toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <form onSubmit={handlePromoSubmit}>
          {badPromoCode && (
            <div role="alert">
              <span>{badPromoCode}</span>
            </div>
          )}
          <label htmlFor="promo-input">Promo code</label>
          <input
            id="promo-input"
            type="text"
            placeholder="Enter your promo code"
            value={promoInput}
            onChange={handlePromoInput}
          />
          {promoInput !== '' && <button type="submit">Add Promo code</button>}
        </form>
      </div>
    </div>
  )
}

export default OrderSummary
