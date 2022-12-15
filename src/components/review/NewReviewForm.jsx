import React from 'react'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'

const renderCharacteristics = (char, id) => {
  return (
    <div>
      <h3>How would you describe the {char.toLowerCase()}?</h3>
      {[1, 2, 3, 4, 5].map((val) => {
        return (
          <label>
            <Field
              type="radio"
              name={'characteristics.' + id}
              value={String(val)}
            />
            {val}
          </label>
        )
      })}
    </div>
  )
}

const NewReviewForm = ({ productInfo }) => {
  const initialValues = {
    rating: '',
    summary: '',
    body: '',
    characteristics: {},
    terms: false,
  }

  const handleSubmit = async (values) => {
    let formValues = values
    Object.keys(formValues.characteristics).map((key) => {
      let n = parseInt(formValues.characteristics[key])
      formValues.characteristics[key] = n
    })
    console.log('submitted:', formValues)
  }

  const handleChange = (e) => {
    console.log('changing:', e)
  }

  const validationSchema = Yup.object({
    rating: Yup.string().required('Rating is required'),
    recommended: Yup.string().required('Choose Yes or No'),
    body: Yup.string().required('Review is required'),
    summary: Yup.string().required('Summary is required'),
    terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  })

  return (
    <div>
      <h3>Write Your Review</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form onChange={handleChange}>
            <div>
              <h3>Your overall rating</h3>
              <label htmlFor="rating">
                <Field id="rating" type="text" name="rating" />
              </label>
              {props.errors.rating && <div>{props.errors.rating}</div>}
            </div>
            <div>
              <h3>Would you recommend this product?</h3>
              <label>
                <Field type="radio" name="recommended" value="Yes" />
                Yes
              </label>
              <label>
                <Field type="radio" name="recommended" value="No" />
                No
              </label>
              {props.errors.recommended && (
                <div>{props.errors.recommended}</div>
              )}
            </div>
            <div>
              <h3>Share your experience</h3>
              <label>
                Tell other people more about the product. What about the
                quality? Or the comfort?
                <Field component="textarea" name="body" id="body" />
              </label>
              <label>
                What's your opinion in one sentence? Example: Best purchase
                ever!
                <Field type="text" name="summary" id="summary" />
              </label>
            </div>
            {Object.keys(productInfo.characteristics).map((key) =>
              renderCharacteristics(key, productInfo.characteristics[key].id)
            )}
            <div>
              <h3>Would you like to add a photo?</h3>
            </div>
            <div>
              <h3>Your information</h3>
            </div>
            <p>
              <label>
                <Field type="checkbox" name="terms" />
                By submitting a review you agree to our{' '}
                <a href="#">Terms and Conditions</a>
              </label>
              {props.errors.terms && <div>{props.errors.terms}</div>}
            </p>
            <button type="submit">Submit Review</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewReviewForm
