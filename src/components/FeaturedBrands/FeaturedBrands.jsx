import { motion } from 'framer-motion'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './FeaturedBrands.css'

const brands = [
  { name: 'Rolex', logo: '/images/rolex-logo.jpg' },
  { name: 'Omega', logo: '/images/omega-logo.jpg' },
  { name: 'Patek Philippe', logo: '/images/patek-logo.jpg' },
  { name: 'Audemars Piguet', logo: '/images/AP-logo.svg' },
  { name: 'Cartier', logo: '/images/cartier-logo.png' },
  { name: 'Jaeger-LeCoultre', logo: '/images/jaeger-logo.svg' },
]

export default function Component() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <section className="featured-brands bg-cream py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="featured-brands-title text-4xl font-serif text-navy mb-12 text-center">Featured Brands</h2>
        <Slider {...settings} className="brands-slider">
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              className="brand-item px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="brand-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="p-6">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo w-full h-32 object-contain mb-4" />
                  <h3 className="brand-name text-xl font-semibold text-navy text-center">{brand.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  )
}