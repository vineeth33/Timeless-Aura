import { motion } from 'framer-motion'
import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <section className="about-us">
      <motion.div
        className="about-us-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="about-us-title">Our Vision</h2>
        <p className="about-us-text">
          At Timeless Aura, we believe that a watch is more than just a timepiece; it's a work of art, a testament to craftsmanship, and a companion for life's most precious moments. Our vision is to curate the world's finest timepieces, bringing together tradition and innovation in perfect harmony.
        </p>
        <p className="about-us-text">
          We are passionate about the art of horology and committed to providing our discerning clientele with an unparalleled selection of luxury watches. Each timepiece in our collection is chosen for its exceptional quality, exquisite design, and the story it tells.
        </p>
        <motion.div
          className="about-us-signature"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Timeless Aura
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutUs