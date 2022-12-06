import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'

export default function Gallery() {
  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg',
    '/images/img5.jpg',
  ]

  const [openModal, setOpenModal] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const [img, setImg] = useState(images[0])
  const [modalImg, setModalImg] = useState(images[0])
  const [slidePos, setSlidePos] = useState([])
  const [mslidePos, setmSlidePos] = useState([])

  const modalHoverHandler = (image, i) => {
    setModalImg(image)
    setSlideNumber(i)

    if (mslidePos[i]) {
      mslidePos[i].classList.add('active')
      for (var j = 0; j < mslidePos.length; j++) {
        if (i !== j) {
          mslidePos[j].classList.remove('active')
        }
      }
    }
  }

  const hoverHandler = (image, i) => {
    setImg(image)
    setSlideNumber(i)

    if (slidePos[i]) {
      slidePos[i].classList.add('active')
      for (var j = 0; j < slidePos.length; j++) {
        if (i !== j) {
          slidePos[j].classList.remove('active')
        }
      }
    }
  }

  const onClickModal = (event) => {
    setOpenModal(true)
    setModalImg(img)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const mprevImg = () => {
    slideNumber === 0 ? setSlideNumber(0) : setSlideNumber(slideNumber - 1)
    setModalImg(images[slideNumber - 1])
    if (mslidePos[slideNumber - 1]) {
      mslidePos[slideNumber - 1].classList.add('active')
      for (var j = 0; j < images.length; j++) {
        if (slideNumber !== j) {
          mslidePos[j].classList.remove('active')
        }
      }
    }
  }
  const mnextImg = () => {
    slideNumber === images.length
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber + 1)
    setModalImg(images[slideNumber + 1])
    if (mslidePos[slideNumber + 1]) {
      mslidePos[slideNumber + 1].classList.add('active')
      for (var j = 0; j < images.length; j++) {
        if (slideNumber !== j) {
          mslidePos[j].classList.remove('active')
        }
      }
    }
  }
  const prevImg = () => {
    slideNumber === 0 ? setSlideNumber(0) : setSlideNumber(slideNumber - 1)
    setImg(images[slideNumber - 1])
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
    setImg(images[slideNumber + 1])

    if (slidePos[slideNumber + 1]) {
      slidePos[slideNumber + 1].classList.add('active')
      for (var j = 0; j < slidePos.length; j++) {
        if (slideNumber + 1 !== j) {
          slidePos[j].classList.remove('active')
        }
      }
    }
  }

  const refs = useRef([])
  refs.current = []

  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

  const mrefs = useRef([])
  mrefs.current = []

  const addMRefs = (el) => {
    if (el && !mrefs.current.includes(el)) {
      mrefs.current.push(el)
    }
  }

  useEffect(() => {
    setSlidePos(refs.current)
    setmSlidePos(mrefs.current)
  }, [])

  return (
    <>
      {openModal && (
        <div className="sliderWrap">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="btnClose"
            onClick={handleCloseModal}
          />
          {slideNumber !== 0 ? (
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="btnPrev"
              onClick={mprevImg}
            />
          ) : null}
          {slideNumber !== images.length - 1 ? (
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
                    i === slideNumber ? 'modalImg_wrap active' : 'modalImg_wrap'
                  }
                  ref={addMRefs}
                  key={images[i]}
                  onMouseOver={(e) => {
                    modalHoverHandler(image, i)
                  }}
                >
                  <img src={image} alt="" />
                </div>
              )
            })}
          </div>
        </div>
      )}
      <div className="gallery-container">
        <div className="left">
          <div className="left_1">
            {images.map((image, i) => {
              return (
                <div
                  className={i === 0 ? 'img_wrap active' : 'img_wrap'}
                  ref={addRefs}
                  key={images[i]}
                  onMouseOver={() => {
                    hoverHandler(image, i)
                  }}
                >
                  <img src={image} alt="" />
                </div>
              )
            })}
            <button>More</button>
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
}
