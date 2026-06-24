import type { Metadata } from 'next'
import AdmissionResultsPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/admission-results',
  },
}

export default function AdmissionResultsPageWrapper() {
  return <AdmissionResultsPage />
}
