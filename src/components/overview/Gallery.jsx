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
  const [img, setImg] = useState(images[0].url)
  const [modalImg, setModalImg] = useState(images[0])
  const [slidePos, setSlidePos] = useState([])
  const [mslidePos, setmSlidePos] = useState([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(7)

  const modalHoverHandler = (imageUrl, i) => {
    setModalImg(imageUrl)
    setmSlideNumber(i)
  }

  const hoverHandler = (imageUrl, i) => {
    setImg(imageUrl)
    setSlideNumber(i)
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
    setImg(images[slideNumber - 1].url)
    if (slidePos[slideNumber - 1]) {
      slidePos[slideNumber - 1].classList.add('active')
      for (var j = 0; j < images.length; j++) {
        if (slideNumber - 1 !== j) {
          slidePos[j].classList.remove('active')
        }
      }
    }
  }

  const nextImg = () => {
    slideNumber === images.length
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber + 1)
    setImg(images[slideNumber + 1].url)

    if (slidePos[slideNumber + 1]) {
      slidePos[slideNumber + 1].classList.add('active')
      for (var j = 0; j < slidePos.length; j++) {
        if (slideNumber + 1 !== j) {
          slidePos[j].classList.remove('active')
        }
      }
    }
  }

  const moreHandler = () => {
    setStart(start + 7)
    setEnd(end + 7)
  }
  const backHandler = () => {
    setStart(start - 7)
    setEnd(end - 7)
  }

  useEffect(() => {
    setImages(selectedStyle[0].photos)
    setImg(selectedStyle[0].photos[0].url)
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
            <div className="fullScreenImage">
              <img src={modalImg} alt="" />
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
                      modalHoverHandler(image.thumbnail_url, i)
                    }}
                  >
                    <img src={image.thumbnail_url} alt="" />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div className="gallery-container">
          <div className="left">
            <div className="left_1">
              {start >= 7 ? (
                <button onClick={() => backHandler()}>Back</button>
              ) : null}
              {images.slice(start, end).map((image, i) => {
                return (
                  <div
                    className={
                      i === slideNumber ? 'img_wrap active' : 'img_wrap'
                    }
                    key={images[i].url}
                    onMouseOver={() => {
                      hoverHandler(image.thumbnail_url, i)
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
            <div className="imageview">
              {/* {slideNumber !== 0 ? (
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
              ) : null} */}
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
            </div>
          </div>
          <div className="right"></div>
        </div>
      </>
    )
  } else {
    return <div>Loading</div>
  }
}
