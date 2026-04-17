import type { Metadata } from 'next'
import PreSATPageClient from './client'

export const metadata: Metadata = {
  title: 'Pre-SAT | Interprep',
  description: 'SAT를 위한 첫 걸음, Pre-SAT 프로그램 - Interprep',
}

export default function PreSATPage() {
  return <PreSATPageClient />
}
