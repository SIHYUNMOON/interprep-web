import type { Metadata } from 'next'
import CreditSystemPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/credit-system',
  },
}

export default function CreditSystemPageWrapper() {
  return <CreditSystemPage />
}
