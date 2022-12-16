import React from 'react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <nav className={`${sticky ? 'sticky' : ''}`}>
        <div className="nav-inner">
          <span className="logo">
            <img id="logo" src={'../images/dafflogo.png'} />
          </span>
          <div className="links">
            <a href="#">Overview</a>
            <a href="#">Related</a>
            <a href="#review-section">Reviews</a>
            <a href="#">Q&A</a>
          </div>
        </div>
      </nav>
    </>
  )
}
