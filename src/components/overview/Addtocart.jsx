import * as React from 'react'
import Button from '@mui/material/Button'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function Addtocart({
  qtyText,
  name,
  style,
  sizeSelected,
  getSkuInfo,
  setAppState,
  appState,
  setOpen,
  setSizeDropdownText,
}) {
  let info = getSkuInfo()

  const getSku = () => {
    let sku = info.sku.filter((s, i) => {
      if (s.size === sizeSelected) {
        return s.id
      }
    })
    if (sku.length > 0) {
      return sku[0].id
    }
  }
  let sku = getSku()

  let product = {
    product: {
      name: name,
      style: style.name,
      size: sizeSelected,
      price: style.sale_price ? style.sale_price : style.original_price,
      sku: sku,
      photoUrl: style.photos[0].url,
    },
    quantity: Number(qtyText),
  }

  const addCart = () => {
    appState.cart.push(product)
  }
  return (
    <>
      {sizeSelected === '' ? (
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setOpen(true)
            setSizeDropdownText('Please select a size')
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <Button variant="outlined" size="large" onClick={() => addCart()}>
          Add to Cart
        </Button>
      )}

      <Button variant="outlined" size="large" className="favIcon">
        <FavoriteBorderIcon />
      </Button>
    </>
  )
}
