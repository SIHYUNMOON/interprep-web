import type { Metadata } from 'next'
import SATPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/sat',
  },
}

export default function SATPageWrapper() {
  return <SATPage />
}
