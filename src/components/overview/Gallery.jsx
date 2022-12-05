import * as React from 'react'
import { useState } from 'react'

export default function Gallery() {
  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg',
    '/images/img5.jpg',
  ]

  return (
    <div className="gallery-container">
      <img src={images[0]} alt="" />
    </div>
  )
}
