import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'

export default function DropdownSize({
  getSkuInfo,
  sizeSelected,
  setSizeSelected,
  open,
  setOpen,
  sizeDropdownText,
}) {
  const [value, setvalue] = React.useState('')

  const handleChange = (event) => {
    setvalue(event.target.value)
    setSizeSelected(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  let qty = getSkuInfo()
  let uArray = []
  let qtyArray = []
  for (const s in qty.quantities) {
    uArray.push(s)
  }
  if (Number(uArray[0]) !== NaN) {
    for (const s in uArray) {
      qtyArray.push(Number(uArray[s]))
    }
    qtyArray.sort(function (a, b) {
      return a - b
    })
  } else {
    uArray.forEach((s) => qtyArray.push(s))
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {sizeDropdownText}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Select a size"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          {qtyArray.map((size) => {
            return (
              <MenuItem key={Math.random() * 1000} value={size}>
                {size}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
