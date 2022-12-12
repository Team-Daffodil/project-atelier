import React, { useEffect, useState } from 'react'

import { totalPrice } from '../../lib/cart'

const checkCouponCode = (code) => {
  return new Promise((resolve, reject) => {
    const codes = process.env.VALID_COUPONS.split(',')
    if (codes.includes(code)) {
      return resolve(code)
    }
    return reject('unknown code')
  })
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
    checkCouponCode(promoInput)
      .then((code) => {
        setPromoCodes(promoCodes.concat(code))
      })
      .catch((err) => {
        setBadPromoCode(promoInput)
      })
  }

  useEffect(() => {
    setBadPromoCode(null)
  }, [promoCodes])

  return (
    <div>
      <h3>Order Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>{items.length} ITEMS</td>
            <td>${totalPrice(items)}</td>
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
              <tr key={promo}>
                <td>{promo.toUpperCase()}</td>
                <td>-</td>
              </tr>
            )
          })}
          <tr>
            <td>Total</td>
            <td>${totalPrice(items)}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <form>
          {badPromoCode && (
            <div role="alert">
              <span>Coupon code {badPromoCode} is unknown</span>
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
          {promoInput !== '' && (
            <button onSubmit={handlePromoSubmit} type="submit">
              Add Promo code
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default OrderSummary
