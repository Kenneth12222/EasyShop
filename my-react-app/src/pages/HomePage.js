import React from 'react'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import LatestCollection from '../components/LatestCollection'
import ShoppingBanner from '../components/ShoppingBanner'
import SupportService from '../components/SupportService'
import Newsletter from '../components/NewsLetter'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <ProductList />
      <ShoppingBanner />
      <SupportService />
      <Newsletter />
    </div>
  )
}

export default HomePage
