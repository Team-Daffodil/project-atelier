import React from 'react'

const ImageThumbs = ({ photos }) => {
  return (
    <ul className="img-answers">
      {photos.map((img, i) => {
        return <img className="img" src={img} key={i}></img>
      })}
    </ul>
  )
}

export default ImageThumbs
