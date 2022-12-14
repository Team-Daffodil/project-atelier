import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'

export default function Gallery({ selectedStyle }) {
  const [images, setImages] = useState(selectedStyle[0].photos)
  const [openModal, setOpenModal] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const [mslideNumber, setmSlideNumber] = useState(0)
  const [img, setImg] = useState(images[slideNumber].url)
  const [modalImg, setModalImg] = useState(images[0])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(7)
  const [subIndx, setSubIndx] = useState(0)

  const modalHoverHandler = (imageUrl, i) => {
    setModalImg(imageUrl)
    setmSlideNumber(i)
  }

  const hoverHandler = (imageUrl, i) => {
    setImg(imageUrl)
    setSubIndx(i)
    if (start >= 7) {
      setSlideNumber(i + 7)
    } else {
      setSlideNumber(i)
    }
  }

  const onClickModal = (event) => {
    setOpenModal(true)
    setModalImg(img)
    setmSlideNumber(slideNumber)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const mprevImg = () => {
    mslideNumber === 0 ? setmSlideNumber(0) : setmSlideNumber(mslideNumber - 1)
    if (images[mslideNumber - 1]) {
      setModalImg(images[mslideNumber - 1].url)
    }
  }

  const mnextImg = () => {
    mslideNumber === images.length - 1
      ? setmSlideNumber(images.length - 1)
      : setmSlideNumber(mslideNumber + 1)
    if (images[mslideNumber + 1]) {
      setModalImg(images[mslideNumber + 1].url)
    }
  }

  const prevImg = () => {
    slideNumber === 0 ? setSlideNumber(0) : setSlideNumber(slideNumber - 1)
    if (start >= 7) {
      setSubIndx(slideNumber - 7 - 1)
    } else {
      setSubIndx(subIndx - 1)
    }
    if (images[slideNumber - 1]) {
      if (subIndx - 1 < 0) {
        setStart(start - 7)
        setEnd(end - 7)
        setImg(images[slideNumber - 1].url)
        setSubIndx(slideNumber - 1)
      } else {
        setImg(images[slideNumber - 1].url)
      }
    }
  }

  const nextImg = () => {
    slideNumber === images.length - 1
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber + 1)
    console.log('start and end', start, end)
    console.log(slideNumber, 'slidenumber')
    console.log(subIndx)
    if (start >= 7) {
      setSubIndx(slideNumber - 7 + 1)
    } else {
      setSubIndx(subIndx + 1)
    }
    if (images[slideNumber + 1]) {
      if (slideNumber + 1 >= end) {
        setStart(start + 7)
        setEnd(end + 7)
        setSubIndx(0)
        setImg(images[slideNumber + 1].url)
      } else {
        setImg(images[slideNumber + 1].url)
      }
    }
  }

  const moreHandler = () => {
    setStart(start + 7)
    setEnd(end + 7)
    setSubIndx(0)
  }
  const backHandler = () => {
    setStart(start - 7)
    setEnd(end - 7)
  }

  useEffect(() => {
    setImages(selectedStyle[0].photos)
    setImg(selectedStyle[0].photos[slideNumber].url)
  }, [selectedStyle])

  if (images.length > 0) {
    return (
      <>
        {openModal && (
          <div className="sliderWrap">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="btnClose"
              onClick={handleCloseModal}
            />
            {mslideNumber !== 0 ? (
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className="btnPrev"
                onClick={mprevImg}
              />
            ) : null}
            {mslideNumber !== images.length - 1 ? (
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                className="btnNext"
                onClick={mnextImg}
              />
            ) : null}
            <div
              className="fullScreenImage"
              onMouseMove={(e) => {
                const x = e.clientX - e.target.offsetLeft
                const y = e.clientY - e.target.offsetTop
                let ModalImg = document.getElementById('ModalImg')
                ModalImg.style.transformOrigin = `${x}px ${y}px`
                ModalImg.style.transform = 'scale(2)'
              }}
              onMouseLeave={() => {
                let ModalImg = document.getElementById('ModalImg')
                ModalImg.style.transformOrigin = 'center'
                ModalImg.style.transform = 'scale(1)'
              }}
            >
              <img src={modalImg} id="ModalImg" alt="" />
            </div>
            <div className="bottom">
              {images.map((image, i) => {
                return (
                  <div
                    className={
                      i === mslideNumber
                        ? 'modalImg_wrap active'
                        : 'modalImg_wrap'
                    }
                    key={images[i].url}
                    onMouseOver={(e) => {
                      modalHoverHandler(image.url, i)
                    }}
                  >
                    <img src={image.thumbnail_url} alt="" />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div className="left_1">
          {start >= 7 ? (
            <button onClick={() => backHandler()}>Back</button>
          ) : null}
          {images.slice(start, end).map((image, i) => {
            return (
              <div
                className={i === subIndx ? 'img_wrap active' : 'img_wrap'}
                key={images[i].url}
                onMouseOver={() => {
                  hoverHandler(image.url, i)
                }}
              >
                <img src={image.thumbnail_url} alt="" />
              </div>
            )
          })}
          {images.slice(start, end).length >= 7 ? (
            <button onClick={() => moreHandler()}>More</button>
          ) : null}
        </div>
        <div className="gallery-container">
          <div className="imageview">
            <div className="left_2" onClick={() => onClickModal()}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Products',
                    isFluidWidth: true,
                    src: img,
                  },
                  largeImage: {
                    src: img,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
            {slideNumber !== 0 ? (
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className="btnPrev"
                onClick={prevImg}
              />
            ) : null}
            {slideNumber !== images.length - 1 ? (
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                className="btnNext"
                onClick={nextImg}
              />
            ) : null}
          </div>
        </div>
      </>
    )
  } else {
    return <div>Loading</div>
  }
}
