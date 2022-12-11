import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedCard from './RelatedCard.jsx'

let headers = { Authorization: process.env.REACT_APP_API_TOKEN }
const RelatedProducts = () => {
  const [relatedID, setRelatedID] = useState([])
  const [related, setRelated] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/products/37325/related', {
        headers,
      })
      .then((response) => {
        setRelatedID(response.data)
      })
  }, [])

  if (relatedID.length) {
    console.log(relatedID)
    return (
      <section className="related-container">
        {relatedID &&
          relatedID.map((item) => {
            return <RelatedCard productId={item} key={item} />
          })}
      </section>
    )
  }
}

export default RelatedProducts
