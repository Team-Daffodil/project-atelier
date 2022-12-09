import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function DropdownSize() {
  const [value, setvalue] = React.useState('')

  const handleChange = (event) => {
    setvalue(event.target.value)
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
          <MenuItem value={'Small'}>Small</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'Large'}>Large</MenuItem>
          <MenuItem value={'XL'}>XL</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
