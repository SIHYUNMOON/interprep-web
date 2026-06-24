import type { Metadata } from 'next'
import Home from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return <Home />
}
