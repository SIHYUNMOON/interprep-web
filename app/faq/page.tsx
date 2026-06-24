import type { Metadata } from 'next'
import FAQPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQPageWrapper() {
  return <FAQPage />
}
