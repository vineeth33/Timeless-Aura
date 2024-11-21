import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation'
import CartModal from './components/CartModal/CartModal'
import CollectionsGallery from './components/CollectionsGallery/CollectionsGallery'
import WatchDetail from './components/CollectionsGallery/WatchDetail'
import ContactForm from './components/ContactForm/ContactForm'
import FeaturedBrands from './components/FeaturedBrands/FeaturedBrands'
import Footer from './components/Footer/Footer'
import LuxuryCarousel from './components/LuxuryCarousel/LuxuryCarousel'
import Navbar from './components/Navbar/Navbar'
import './global.css'

const watches = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner",
    image: "/images/Rolex-submariner.webp",
    description: "Iconic diving watch known for its durability and elegance.",
    detailedDescription: "The Rolex Submariner is a classic diving watch that has become an icon of luxury and adventure. First introduced in 1953, it has been worn by explorers, athletes, and style icons alike. The Submariner features a unidirectional rotatable bezel, Chromalight display, and is water-resistant to 300 meters (1,000 feet).",
    link: "https://www.rolex.com/watches/submariner"
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster",
    image: "/images/omega-speedmaster.webp",
    description: "The first watch worn on the moon, a true piece of history.",
    detailedDescription: "The Omega Speedmaster, often referred to as the 'Moonwatch', was the first watch worn on the moon during the Apollo 11 mission in 1969. This chronograph has been a part of all six lunar landings and continues to be flight-qualified by NASA for all manned space missions. It features a tachymeter scale and manual-winding movement.",
    link: "https://www.omegawatches.com/watches/speedmaster"
  },
  {
    id: 3,
    brand: "Patek Philippe",
    model: "Nautilus",
    image: "/images/patek.jpg",
    description: "Luxury sports watch with a distinctive porthole-shaped case.",
    detailedDescription: "The Patek Philippe Nautilus, designed by the legendary Gérald Genta, was introduced in 1976 and has since become one of the most sought-after luxury sports watches. Its distinctive porthole-shaped case, inspired by maritime portholes, houses some of the finest mechanical movements in the world. The Nautilus combines elegance with ruggedness, making it a versatile timepiece for any occasion.",
    link: "https://www.patek.com/en/collection/nautilus"
  },
  {
    id: 4,
    brand: "Audemars Piguet",
    model: "Royal Oak",
    image: "/images/AP-royaloak.webp",
    description: "Iconic luxury watch known for its octagonal bezel and integrated bracelet.",
    detailedDescription: "The Audemars Piguet Royal Oak, designed by Gérald Genta and introduced in 1972, revolutionized the luxury watch industry by pioneering the concept of the luxury sports watch. Its iconic octagonal bezel secured with visible screws, integrated bracelet, and 'Tapisserie' patterned dial have made it an enduring symbol of craftsmanship and innovation. The Royal Oak is celebrated for its unique blend of high-end aesthetics and robust performance, appealing to those who appreciate bold, timeless design.",
    link: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html"
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [filteredWatches, setFilteredWatches] = useState(watches)
  const [selectedWatch, setSelectedWatch] = useState(null)

  const addToCart = (watch) => {
    setCart([...cart, {
      id: watch.id,
      brand: watch.brand,
      model: watch.model,
      description: watch.description,
      image: watch.image
    }])
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleSearch = useCallback((searchTerm) => {
    const filtered = watches.filter(watch => 
      watch.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      watch.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredWatches(filtered)
  }, [])

  const handleSelectWatch = (watch) => {
    setSelectedWatch(watch)
    // Scroll to the CollectionsGallery section
    const gallerySection = document.getElementById('collections-gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <Navbar 
        cart={cart} 
        toggleCart={toggleCart} 
        watches={watches} 
        onSearch={handleSearch}
        onSelectWatch={handleSelectWatch}
      />
      <main className="content">
        <motion.section
          className="welcome-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <BackgroundAnimation />
          <div className="welcome-content">
            <motion.h1
              className="welcome-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to <span className="highlight">Timeless Aura</span>
            </motion.h1>
            <motion.div
              className="separator"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            ></motion.div>
            <motion.p
              className="welcome-description"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              Discover the epitome of horological excellence
            </motion.p>
            <motion.button
              className="explore-button"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const gallerySection = document.getElementById('collections-gallery')
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Explore Collection
            </motion.button>
          </div>
        </motion.section>
        <LuxuryCarousel />
        <CollectionsGallery 
          id="collections-gallery"
          addToCart={addToCart} 
          watches={filteredWatches}
          selectedWatch={selectedWatch}
        />
        <FeaturedBrands id="featured-brands" />
        <AboutUs id="about-us" />
        <ContactForm id="contact-form" />
      </main>
      <Footer />
      {isCartOpen && (
        <CartModal cart={cart} removeFromCart={removeFromCart} onClose={toggleCart} />
      )}
      {selectedWatch && (
        <WatchDetail
          watch={selectedWatch}
          onClose={() => setSelectedWatch(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  )
}

export default App