import { Metadata } from 'next'
import IPassClient from './client'

export const metadata: Metadata = {
  title: '인터프렙 iPass | Interprep',
  description: '대학 진학을 위한 최적의 패키지 프로그램',
}

export default function IPassPage() {
  return <IPassClient />
}
