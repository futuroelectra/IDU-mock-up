'use client'

import { motion } from 'framer-motion'
import HeroCanvasWrapper from './HeroCanvasWrapper'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Three.js Background Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <HeroCanvasWrapper />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-panchang font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 text-body-text"
          >
            Finance in Focus
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-body-text mb-8 space-y-2"
          >
            <div>One platform.</div>
            <div>•</div>
            <div>Every department.</div>
            <div>•</div>
            <div>Total clarity.</div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-body-text/80 max-w-2xl mx-auto mb-10"
          >
            Transform your financial operations with a unified platform that brings every department together. 
            Get the clarity you need to make strategic decisions with confidence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
              Book a Demo
            </button>
            <button className="border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-blue hover:text-white transition-colors">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
