import type { Metadata } from 'next'
import ContactPage from './client'

export const metadata: Metadata = {
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPageWrapper() {
  return <ContactPage />
}
