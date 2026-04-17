'use client'

import { useEffect, useRef, useState } from 'react'

// Global scroll direction tracker
let globalScrollY = 0
let globalScrollDir: 'down' | 'up' = 'down'
let ticking = false

if (typeof window !== 'undefined') {
  globalScrollY = window.scrollY
  
  const updateScrollDirection = () => {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > globalScrollY) {
      globalScrollDir = 'down'
    } else if (currentScrollY < globalScrollY) {
      globalScrollDir = 'up'
    }
    
    globalScrollY = currentScrollY
    ticking = false
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDirection)
      ticking = true
    }
  })
}

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        if (isIntersecting) {
          // Element is visible in viewport
          
          // If scrolling DOWN: show with animation
          if (globalScrollDir === 'down') {
            setShouldAnimate(true)
            setIsVisible(true)
          }
          // If scrolling UP: show instantly without animation
          else if (globalScrollDir === 'up') {
            setShouldAnimate(false)
            setIsVisible(true)
          }
        } else {
          // Element left viewport - hide it
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible, shouldAnimate }
}
