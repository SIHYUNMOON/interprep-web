import type { Metadata } from 'next'
import PhilosophyPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/about/philosophy',
  },
}

export default function PhilosophyPageWrapper() {
  return <PhilosophyPage />
}
