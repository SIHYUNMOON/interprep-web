import type { Metadata } from 'next'
import AboutPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPageWrapper() {
  return <AboutPage />
}
