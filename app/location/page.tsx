import type { Metadata } from 'next'
import LocationPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/location',
  },
}

export default function LocationPageWrapper() {
  return <LocationPage />
}
