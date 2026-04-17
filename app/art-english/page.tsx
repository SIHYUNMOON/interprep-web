import type { Metadata } from 'next'
import ArtEnglishPageClient from './client'

export const metadata: Metadata = {
  title: 'Art + English Immersion | Interprep',
  description: 'Art + English Immersion 프로그램 - 미술 전공을 위한 영어 준비 - Interprep',
}

export default function ArtEnglishPage() {
  return <ArtEnglishPageClient />
}
