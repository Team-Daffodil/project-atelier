import React, { useState, useEffect } from 'react'
import axios from 'axios'

let headers = { Authorization: process.env.REACT_APP_API_TOKEN }
const RelatedProducts = () => {
  const [relatedID, setRelatedID] = useState([])
  const [related, setRelated] = useState([])
  const tempArray = []
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/products/37325/related', {
        headers,
      })
      .then((response) => {
        console.log('FIRST GET RELATED PRODUCT IDs: ', response.data)
        response.data.forEach((item) => {
          axios
            .get(process.env.REACT_APP_API_URL + `/products/${item}`, {
              headers,
            })
            .then((product) => {
              console.log(
                'ITER GET WITH INDIVIDUAL PRODUCT DATA: ',
                product.data
              )
              setRelated([...related, product.data]) // promises are async so I only get the last promise to resolve and update the state array
            })
        })
      })
  }, [])

  return <div>RELATED</div>
}

export default RelatedProducts
