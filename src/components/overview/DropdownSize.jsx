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
}) {
  const [value, setvalue] = React.useState('')

  const handleChange = (event) => {
    setvalue(event.target.value)
    setSizeSelected(event.target.value)
  }

  let qty = getSkuInfo()
  let qtyArray = []
  for (const s in qty.quantities) {
    qtyArray.push(s)
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select a size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Select a size"
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
