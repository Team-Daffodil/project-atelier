import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'

export default function DropdownSize({
  getSkuInfo,
  sizeSelected,
  qtyText,
  setqtyText,
}) {
  const [value, setvalue] = React.useState('')
  const [open, setOpen] = useState(false)

  const handleChange = (event) => {
    setvalue(event.target.value)
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleMenu = (e) => {
    console.log(e.target.innerHTML)
    setqtyText(e.target.innerHTML)
    setOpen(false)
  }

  const qtyCreator = (value) => {
    let a = []
    if (value > 15) {
      for (let i = 1; i <= 15; i++) {
        a.push(i)
      }
    } else if (value <= 15 && value > 0) {
      for (let i = 1; i <= value; i++) {
        a.push(i)
      }
    } else {
      return []
    }
    return a
  }
  let qty = getSkuInfo()
  let qtyToDisplay = qty[sizeSelected]

  // return (
  //   <Box sx={{ width: 100 }}>
  //     <FormControl fullWidth>
  //       <InputLabel id="demo-simple-select-label">
  //         {!qtyToDisplay ? '-' : null}
  //       </InputLabel>
  //       <Select
  //         labelId="demo-simple-select-label"
  //         id="demo-simple-select"
  //         value={value}
  //         label="Select a qty"
  //         onChange={handleChange}
  //       >
  //         {qtyToDisplay
  //           ? qtyCreator(qtyToDisplay).map((num) => {
  //               return (
  //                 <MenuItem key={num * Math.random()} value={num}>
  //                   {num}
  //                 </MenuItem>
  //               )
  //             })
  //           : null}
  //       </Select>
  //     </FormControl>
  //   </Box>
  // )
  return (
    <div className="dropdown">
      {!qtyToDisplay ? (
        <button className="displayQty" disabled={true}>
          {!qty ? 'Out of Stock' : '-'}
        </button>
      ) : (
        <button className="displayQty1" onClick={handleOpen}>
          {qtyText}
        </button>
      )}
      {open ? (
        <ul className="menu">
          {qtyCreator(qtyToDisplay).map((num, i) => {
            // i === 0 ? setqtyText('1') : null

            return (
              <li className="menu-item" key={Math.random() * num}>
                <button
                  onClick={(e) => {
                    handleMenu(e)
                  }}
                >
                  {num}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
