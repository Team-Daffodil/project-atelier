import React from 'react'
import { resizeImage } from '../../lib/images'

const ImageThumbs = ({ photos }) => {
  return (
    <ul className="img-answers">
      {photos.map((img, i) => {
        return <img className="img" src={resizeImage(img, 80)} key={i}></img>
      })}
    </ul>
  )
}

export default ImageThumbs
