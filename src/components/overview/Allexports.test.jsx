import * as components from './Allexports.js'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

let mockData = {
  quantities: {},
  sku: [],
}
let mockStyle = {
  photos: [
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    },
  ],
}
let mockdescription = {
  id: 37315,
  campus: 'hr-rfe',
  name: 'Heir Force Ones',
  slogan: 'A sneaker dynasty',
  description:
    'Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I\'m just a sneaker pro, I love Pumas and shell toes, but can\'t nothin compare to a fresh crispy white pearl',
  category: 'Kicks',
  default_price: '99.00',
  created_at: '2021-08-13T14:37:33.145Z',
  updated_at: '2021-08-13T14:37:33.145Z',
  features: [
    {
      feature: 'Sole',
      value: 'Rubber',
    },
    {
      feature: 'Material',
      value: 'FullControlSkin',
    },
    {
      feature: 'Mid-Sole',
      value: 'ControlSupport Arch Bridge',
    },
    {
      feature: 'Stitching',
      value: 'Double Stitch',
    },
  ],
}
let mockselectedstyles = [
  {
    style_id: 221023,
    name: 'White & White',
    original_price: '99.00',
    sale_price: null,
    'default?': true,
    photos: [
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      },
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      },
    ],
    skus: {
      1281158: {
        quantity: 14,
        size: '7',
      },
      1281159: {
        quantity: 25,
        size: '7.5',
      },
      1281160: {
        quantity: 9,
        size: '8',
      },
      1281161: {
        quantity: 2,
        size: '8.5',
      },
      1281162: {
        quantity: 18,
        size: '9',
      },
      1281163: {
        quantity: 12,
        size: '9.5',
      },
      1281164: {
        quantity: 10,
        size: '10',
      },
      1281165: {
        quantity: 18,
        size: '10.5',
      },
      1281166: {
        quantity: 11,
        size: '11',
      },
      1281167: {
        quantity: 35,
        size: '11.5',
      },
      1281168: {
        quantity: 25,
        size: '12',
      },
    },
  },
]
Object.keys(components).forEach((componentName) => {
  const Component = components[componentName]
  describe(`Component: ${componentName}`, () => {
    test(`${componentName} renders`, () => {
      render(
        <Component
          getSkuInfo={() => mockData}
          style={mockStyle}
          item={mockdescription}
          styles={[]}
          selectedStyle={mockselectedstyles}
        />
      )
    })
  })
})
