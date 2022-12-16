import React from 'react'
import { useState, useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function Navbar() {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // const scroll = () => {
  //   const section = document.querySelector('#related-section')
  //   console.log(section)
  //   section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }
  return (
    <>
      <nav className={`${sticky ? 'sticky' : ''}`}>
        <div className="nav-inner">
          <span className="logo">
            <img id="logo" src={'../images/dafflogo.png'} />
          </span>
          <div className="links">
            <a href="#app">Overview</a>
            <a href="#related-section">Related</a>
            <a href="#review-section">Reviews</a>
            <a href="#qna-section">Q&A</a>
          </div>
          <div>
            <AiOutlineShoppingCart
              style={{
                width: 45,
                height: 45,
                color: 'yellow',
                position: 'relative',
                right: 36,
              }}
            />
          </div>
        </div>
      </nav>
    </>
  )
}
