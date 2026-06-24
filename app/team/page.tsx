import type { Metadata } from 'next'
import TeamPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/team',
  },
}

export default function TeamPageWrapper() {
  return <TeamPage />
}
