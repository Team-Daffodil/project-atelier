import React from 'react'
import { IconContext } from 'react-icons'
import { TbFlower } from 'react-icons/tb'
const { useState, useRef } = React

const QuarterRating = ({ rating }) => {
  rating = Math.floor(rating * 4)
  const [currentRating, setCurrentRating] = useState(rating)

  let emptyQ1 = (
    <IconContext.Provider
      value={{ color: 'black', size: '20px', className: 'flower-q1' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let emptyQ2 = (
    <IconContext.Provider
      value={{ color: 'black', size: '20px', className: 'flower-q2' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let emptyQ3 = (
    <IconContext.Provider
      value={{ color: 'black', size: '20px', className: 'flower-q3' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let emptyQ4 = (
    <IconContext.Provider
      value={{ color: 'black', size: '20px', className: 'flower- q4' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let filledQ1 = (
    <IconContext.Provider
      value={{ color: 'rgb(240 243 43)', size: '20px', className: 'flower-q1' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let filledQ2 = (
    <IconContext.Provider
      value={{ color: 'rgb(240 243 43)', size: '20px', className: 'flower-q2' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let filledQ3 = (
    <IconContext.Provider
      value={{ color: 'rgb(240 243 43)', size: '20px', className: 'flower-q3' }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let filledQ4 = (
    <IconContext.Provider
      value={{
        color: 'rgb(240 243 43)',
        size: '20px',
        className: 'flower- q4',
      }}
    >
      <TbFlower />
    </IconContext.Provider>
  )

  let count = 0
  return (
    <div className="rating">
      {[...Array(5).keys()].map((index) => {
        if (index) {
          count += 3
        }
        return (
          <div className="flower-merge" key={Math.random()}>
            <div key={index + 1 + count} id={index + 1 + count}>
              {index + 1 + count <= currentRating ? filledQ1 : emptyQ1}
            </div>
            <div key={index + 2 + count} id={index + 2 + count}>
              {index + 2 + count <= currentRating ? filledQ2 : emptyQ2}
            </div>
            <div key={index + 3 + count} id={index + 3 + count}>
              {index + 3 + count <= currentRating ? filledQ3 : emptyQ3}
            </div>
            <div key={index + 4 + count} id={index + 4 + count}>
              {index + 4 + count <= currentRating ? filledQ4 : emptyQ4}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuarterRating
