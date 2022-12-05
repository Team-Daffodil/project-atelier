import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'

export default function Description() {
  const text = `
Material: Super soft and fuzzy sherpa fleece material, this sherpa pullover will definitely keep you warm all day. Oversized sweatshirts for women in soft fuzzy fabric, breathable, cozy, comfortable.
Design: This loose pullover hoodie has 1/4 zip up collar and drawstrings, 2 warm side pockets and adjustable elastic waist that makes it so you can adjust the fit.
Fashion: Easy to pair with boots, skinny leggings, jeans for a stylish looking in spring, autumn and winter.
Feature: Casual sports hoodies. Suitable for a variety of occasions: Casual, Daily wear, Outdoor activity, Dates, Parties, Work, School, Travel, Vacation, Basic etc.`

  return (
    <div className="description-container">
      <div className="desc-facts">
        <div className="desc">{text}</div>
        <div className="facts">
          <span className="fact">
            <CheckIcon />
            <span>100% Polyester</span>
          </span>
          <span className="fact">
            <CheckIcon />
            <span>1% Oversized</span>
          </span>
          <span className="fact">
            <CheckIcon />
            <span>100% Overpriced</span>
          </span>
          <span className="fact">
            <CheckIcon />
            <span>Don't buy</span>
          </span>
        </div>
      </div>
    </div>
  )
}
