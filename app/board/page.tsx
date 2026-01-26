import { BoardClient } from './client'

export const metadata = {
  title: '유학 관련 정보 게시판 | 인터프렙',
  description: '인터프렙 유학 관련 정보 게시판, 유학 팁, 대학 입시 정보 등을 확인하세요.',
}

export default function BoardPage() {
  return <BoardClient />
}
