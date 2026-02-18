'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { 
  ssr: false 
})

export default function HeroCanvasWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <HeroCanvas />
}
