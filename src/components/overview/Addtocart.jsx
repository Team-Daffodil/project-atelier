import * as React from 'react'
import Button from '@mui/material/Button'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function Addtocart({ qtyText }) {
  return (
    <>
      {qtyText === 'Select Size' ? (
        <Button variant="outlined" size="large" disabled={true}>
          Add to Cart
        </Button>
      ) : (
        <Button variant="outlined" size="large">
          Add to Cart
        </Button>
      )}

      <Button variant="outlined" size="large" className="favIcon">
        <FavoriteBorderIcon />
      </Button>
    </>
  )
}
