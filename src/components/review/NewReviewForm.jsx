import React from 'react'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'
import { displayChars } from '../../lib/review'

const headers = { Authorization: process.env.API_TOKEN }

const renderCharacteristics = (char, id) => {
  return (
    <div>
      <h3>How would you describe the {char.toLowerCase()}?</h3>
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          {displayChars(char)}
        </div>
        <RadioGroup
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {[1, 2, 3, 4, 5].map((val) => {
            return (
              <label style={{ margin: 0 }}>
                <Field
                  type="radio"
                  name={'characteristics.' + id}
                  value={String(val)}
                />
              </label>
            )
          })}
        </RadioGroup>
      </div>
    </div>
  )
}

const FormContainer = styled.div`
  width: 800px;
  padding: 24px;

  input[type='text'],
  textarea {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    display: block;
    border-radius: 4px;
    border: 2px solid #000;
  }

  input[type='text']:focus,
  textarea:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }

  input.error {
    border-color: red;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    margin-right: 24px;
  }

  .input-feedback {
    color: red;
    margin-top: 0.25rem;
  }

  input[type='checkbox'],
  input[type='radio'] {
    appearance: none;
    height: 24px;
    width: 24px;
    background: #fff;
    border: 2px solid black;
    margin: 0 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline-offset: 5px;
    outline-color: black;

    &:disabled {
      opacity: 0.7;
      background: black;
      cursor: not-allowed;
    }

    &:after {
      content: '';
      transform: scale(0);
      transition: 120ms transform ease-in-out;
    }

    &:checked:after {
      transform: scale(1);
    }
  }

  input[type='checkbox'] {
    border-radius: 5px;

    &:after {
      width: 16px;
      height: 16px;
    }

    &:checked {
      border: none;
      background-color: red;

      &:after {
        content: url("data:image/svg+xml, <svg viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fill='white' d='M15.25.847a1.51 1.51 0 0 1 .405 2.096L8.106 14.11a1.944 1.944 0 0 1-2.94.329L.6 10.156a1.51 1.51 0 1 1 2.067-2.202l3.645 3.42 6.841-10.122a1.51 1.51 0 0 1 2.098-.405Z'/></svg>");
      }
    }
  }

  input[type='radio'] {
    border-radius: 20px;

    &:after {
      width: 14px;
      height: 14px;
      border-radius: 7px;
    }

    &:checked {
      border-color: red;

      &:after {
        background-color: red;
      }
    }
  }
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: 'row';
`

const NewReviewForm = ({ productInfo, setModalIsOpen }) => {
  const initialValues = {
    rating: '',
    summary: '',
    body: '',
    characteristics: {},
    terms: false,
  }

  const handleSubmit = async (values) => {
    let formValues = { characteristics: {} }
    Object.keys(formValues.characteristics).map((key) => {
      let n = parseInt(formValues.characteristics[key])
      formValues.characteristics[key] = n
    })
    formValues['product_id'] = parseInt(productInfo.product_id)
    formValues.rating = parseInt(values.rating)
    formValues.recommend = values.recommend === 'Yes' ? true : false
    formValues.name = 'abc123'
    formValues.email = 'fake@fake.com'
    formValues.photos = []
    formValues.body = values.body
    formValues.summary = values.summary
    axios
      .post(process.env.API_URL + '/reviews', formValues, { headers: headers })
      .then((data) => console.log('success:', data))
      .catch((err) => console.log(err))
  }

  const validationSchema = Yup.object({
    rating: Yup.string().required('Rating is required'),
    recommend: Yup.string().required('Choose Yes or No'),
    body: Yup.string()
      .min(60, 'review has to be a minimum of 60 characters')
      .max(1000, 'review is too long')
      .required('Review is required'),
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
          <Form>
            <FormContainer>
              <div>
                <h3>Your overall rating</h3>
                <label htmlFor="rating">
                  <Field id="rating" type="text" name="rating" />
                </label>
                {props.errors.rating && <div>{props.errors.rating}</div>}
              </div>
              <div>
                <h3>Would you recommend this product?</h3>
                <RadioGroup>
                  <label>
                    <Field type="radio" name="recommend" value="Yes" />
                    Yes
                  </label>
                  <label>
                    <Field type="radio" name="recommend" value="No" />
                    No
                  </label>
                </RadioGroup>
                {props.errors.recommended && (
                  <div>{props.errors.recommended}</div>
                )}
              </div>
              <div>
                <h3>Share your experience</h3>
                <label style={{ display: 'block' }}>
                  <p>
                    Tell other people more about the product. What about the
                    quality? Or the comfort?
                  </p>
                  <Field
                    component="textarea"
                    name="body"
                    id="body"
                    rows={8}
                    placeholder="Your Review"
                  />
                </label>
                <label style={{ display: 'block' }}>
                  <p>
                    What's your opinion in one sentence? Example: Best purchase
                    ever!
                  </p>
                  <Field
                    type="text"
                    name="summary"
                    id="summary"
                    placeholder="Review in Short *"
                  />
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
                <label style={{ display: 'block' }}>
                  <p>
                    Example: DaDog54. Be mindful of your own privacy, don't use
                    your full name or email address.
                  </p>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username *"
                  />
                </label>
                <label style={{ display: 'block' }}>
                  <p>
                    Enter your email for confirmation only - we won't send you
                    any promotional emails
                  </p>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email *"
                  />
                </label>
              </div>
              <p>
                <label>
                  <Field type="checkbox" name="terms" />
                  <span style={{ paddingRight: 8 }}>
                    By submitting a review you agree to our{' '}
                    <a href="#"> Terms and Conditions</a>
                  </span>
                </label>
                {props.errors.terms && <div>{props.errors.terms}</div>}
              </p>
              <button
                className="button-more-questions question-buttons"
                onClick={() => {
                  setModalIsOpen(false)
                }}
              >
                CANCEL
              </button>
              <button
                className="question-button-ask question-buttons"
                type="submit"
              >
                SUBMIT REVIEW
              </button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewReviewForm
