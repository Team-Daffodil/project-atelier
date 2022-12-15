import React, { useState } from 'react'

const Delivery = () => {
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
    console.log(e.target.value, e.target.name, 'blur')
  }

  return (
    <div>
      <form>
        <section>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              id="first-name"
              name="firstName"
              aria-label="first name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              id="last-name"
              name="lastName"
              aria-label="last name"
              value={form.lastName}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="address1">
            Address 1:
            <input
              type="text"
              id="adress-1"
              name="address1"
              aria-label="address 1"
              value={form.address1}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="address2">
            Address 2:
            <input
              type="text"
              id="address-2"
              name="address-2"
              aria-label="address 2"
              value={form.address2}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="city">
            City:
            <input
              type="text"
              id="city"
              name="city"
              aria-label="city"
              value={form.city}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="state">
            State:
            <input type="state" id="state" name="state" value={form.state} />
          </label>
          <label htmlFor="zip">
            Zip:
            <input
              type="zip"
              id="zip"
              name="zip"
              aria-label="zip"
              value={form.zip}
              onBlur={handleBlur}
            />
          </label>
        </section>
        <section>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              aria-label="email"
              value={form.email}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="phoneNumber">
            Phone Number:
            <input
              type="text"
              id="phone-number"
              name="phone-number"
              aria-label="phone number"
              value={form.phoneNumber}
              onBlur={handleBlur}
            />
          </label>
        </section>
        <section>
          <label htmlFor="billingCheck">
            <input
              type="checkbox"
              id="billing-check"
              name="billingCheck"
              aria-label="billing check"
              value={form.billingCheck}
            />
            My billing address is the same
          </label>
          <label htmlFor="termsCheck">
            <input
              type="checkbox"
              id="terms-check"
              name="termsCheck"
              aria-label="terms check"
              value={form.termsCheck}
            />
            I agree to terms
          </label>
        </section>
      </form>
    </div>
  )
}

export default Delivery
