import React, { useState } from 'react'

const Payment = () => {
  const [form, setForm] = useState({})
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      name: value,
    })
  }

  const handleBlur = (e) => {
    //
  }

  return (
    <div>
      Payment Information
      <form>
        <label htmlFor="cardNumber">
          Card Number:
          <input
            type="text"
            id="card-number"
            name="cardNumber"
            aria-label="card number"
            value={form.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="nameOnCard">
          Name on Card:
          <input
            type="text"
            id="name-on-card"
            name="nameOnCard"
            aria-label="name on card"
            value={form.nameOnCard}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="expiry">
          Expirary Date:
          <input
            type="text"
            id="expiry"
            name="expiry"
            aria-label="expiry"
            value={form.expiry}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="cvv">
          CVV:
          <input
            type="cvv"
            id="cvv"
            name="cvv"
            aria-label="cvv"
            value={form.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
      </form>
    </div>
  )
}

export default Payment
