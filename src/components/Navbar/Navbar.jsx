import React, { useCallback, useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = ({ cart, toggleCart, watches, onSearch, onSelectWatch }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchTerm('')
      onSearch('')
      setRecommendations([])
    }
  }

  const handleSearchChange = useCallback((e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)

    if (term.length > 0) {
      const matchedWatches = watches.filter(watch => 
        watch.brand.toLowerCase().includes(term.toLowerCase()) ||
        watch.model.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5) // Limit to 5 recommendations
      setRecommendations(matchedWatches)
    } else {
      setRecommendations([])
    }
  }, [watches, onSearch])

  const handleRecommendationClick = (watch) => {
    setSearchTerm('')
    setRecommendations([])
    setIsSearchOpen(false)
    onSelectWatch(watch)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            <span className="logo-text">T</span>
            <span className="logo-text-full">imeless Aura</span>
          </a>
        </div>
        <ul className="navbar-links">
          <li>
            <a
              href="#collections"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('collections-gallery')
              }}
            >
              Collections
            </a>
          </li>
          <li>
            <a
              href="#brands"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('featured-brands')
              }}
            >
              Brands
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('about-us')
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact-form')
              }}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="navbar-actions">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <button className="search-btn" aria-label="Search" onClick={handleSearchToggle}>
              <i className="fas fa-search"></i>
            </button>
            {isSearchOpen && (
              <div className="search-input-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search watches..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {recommendations.length > 0 && (
                  <ul className="recommendations">
                    {recommendations.map(watch => (
                      <li key={watch.id} onClick={() => handleRecommendationClick(watch)}>
                        {watch.brand} {watch.model}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <button className="cart-btn" aria-label="Cart" onClick={toggleCart}>
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar