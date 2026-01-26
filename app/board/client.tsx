'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

interface Post {
  id: number
  title: string
  author: string
  date: string
  views: number
  content?: string
}

const ADMIN_ID = 'adminInPrep2013'
const ADMIN_PW = 'InterP!Web26#Ops@'

const INITIAL_POSTS: Post[] = [
  { id: 25, title: '디지털 SAT, 실제 시험장에서 변어지는 일 요약', author: 'interprep', date: '2023.02.08', views: 5261 },
  { id: 24, title: 'College Board가 SAT시험 다시 바꾸는 이유는 뭣인가!?', author: '인터프렙', date: '2023.02.08', views: 4882 },
  { id: 23, title: 'SAT시험이 미국대학 입시에 여전히 중요한가? [존재 SAT시험이 미국대학 입시에 여전히 중요한가?', author: '인터프렙', date: '2023.02.08', views: 6052 },
  { id: 22, title: '디지털 SAT 초연금 단순정리', author: '인터프렙', date: '2023.02.08', views: 5114 },
  { id: 21, title: '#1 프린스턴대학교 자금 정보', author: 'Interprep', date: '2019.01.30', views: 10667 },
  { id: 20, title: 'UC대학에 입학하기 위한 중요한 요건들', author: 'Interprep', date: '2019.01.07', views: 11488 },
  { id: 19, title: '정점 문학지에 있는 UC 입학의 문', author: 'Interprep', date: '2019.01.02', views: 11764 },
  { id: 18, title: 'SAT/ACT 표준화 점수 정책의 영향은?', author: 'Interprep', date: '2018.12.18', views: 11010 },
  { id: 17, title: '미국 입시 표준화 점수 제조 페치 좌석 좌상 - 미국 대입 준비는 어떻게?', author: 'Interprep', date: '2018.12.10', views: 10702 },
  { id: 16, title: '사커교대학 표준화점수(SAT/ACT) 제조 제도 폐지!!', author: 'Interprep', date: '2018.11.13', views: 10714 },
  { id: 15, title: 'Common App 에세이 주제 완벽 분석', author: '인터프렙', date: '2018.10.25', views: 9342 },
  { id: 14, title: 'AP 시험 전략 및 대학 입시 반영', author: 'Interprep', date: '2018.09.15', views: 8765 },
  { id: 13, title: '컬리지 검색 및 선택 기준', author: '인터프렙', date: '2018.08.20', views: 7823 },
  { id: 12, title: 'GPA의 중요성과 관리 방법', author: 'Interprep', date: '2018.07.10', views: 7456 },
  { id: 11, title: '과외 활동 선택 가이드', author: '인터프렙', date: '2018.06.05', views: 6789 },
  { id: 10, title: '재정 지원 및 장학금 안내', author: 'Interprep', date: '2018.05.18', views: 6234 },
  { id: 9, title: '대학원 지원 준비 과정', author: '인터프렙', date: '2018.04.22', views: 5678 },
  { id: 8, title: '국제학생 비자 및 입시', author: 'Interprep', date: '2018.03.30', views: 5123 },
  { id: 7, title: '조기 결정 대 일반 지원', author: '인터프렙', date: '2018.02.14', views: 4567 },
  { id: 6, title: '캠퍼스 방문 및 면접 팁', author: 'Interprep', date: '2018.01.25', views: 4012 },
  { id: 5, title: '추천서 확보 전략', author: '인터프렙', date: '2017.12.08', views: 3456 },
  { id: 4, title: 'SAT vs ACT 선택 가이드', author: 'Interprep', date: '2017.11.20', views: 3234 },
  { id: 3, title: '대학 입시 타임라인', author: '인터프렙', date: '2017.10.15', views: 2876 },
  { id: 2, title: '9학년부터 준비하기', author: 'Interprep', date: '2017.09.10', views: 2345 },
  { id: 1, title: '미국 대학 입시 완벽 가이드', author: '인터프렙', date: '2017.08.01', views: 1234 },
]

const YOUTUBE_VIDEOS = [
  { title: '그렇게 준비할거면 하지마라! 미국대학입시 제대로 준비하는 법', url: 'https://www.youtube.com/watch?v=NVQm9aaCjw0&feature=youtu.be' },
  { title: '파일럿이 되고 싶다고? 미국으로 가라!', url: 'https://www.youtube.com/watch?v=WmcTTIUPphU&feature=youtu.be' },
  { title: '이거 빠뜨리면 반드시 망한다...- 카운셀러 추천서&평가', url: 'https://www.youtube.com/watch?v=1MlWxLB4VbY&feature=youtu.be' },
  { title: '대한민국 최고 컨설턴트의 미국대학원 진학 꿀팁 왕방출', url: 'https://www.youtube.com/watch?v=Lbjs_O9hNZM' },
  { title: '미국 탑스쿨에 들어가려면 에세이, 이렇게 쓰세요', url: 'https://www.youtube.com/watch?v=w1McOBjCP6c&feature=youtu.be' },
]

export function BoardClient() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [loginInput, setLoginInput] = useState({ id: '', pw: '' })
  const [writeInput, setWriteInput] = useState({ title: '', content: '' })
  const [sortBy, setSortBy] = useState<'latest' | 'recommended' | 'views' | 'updated'>('latest')
  const [currentPage, setCurrentPage] = useState(1)

  // Check localStorage for admin login on mount
  useEffect(() => {
    const saved = localStorage.getItem('adminLoggedIn')
    if (saved === 'true') {
      setIsAdminLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    if (loginInput.id === ADMIN_ID && loginInput.pw === ADMIN_PW) {
      setIsAdminLoggedIn(true)
      localStorage.setItem('adminLoggedIn', 'true')
      setShowLoginModal(false)
      setLoginInput({ id: '', pw: '' })
    } else {
      alert('ID 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')
  }

  const handleWritePost = () => {
    if (!writeInput.title.trim() || !writeInput.content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    const newPost: Post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      title: writeInput.title,
      author: 'interprep',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      views: 0,
      content: writeInput.content,
    }

    setPosts([newPost, ...posts])
    setShowWriteModal(false)
    setWriteInput({ title: '', content: '' })
  }

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'recommended':
        return b.views - a.views
      case 'views':
        return b.views - a.views
      case 'updated':
        return new Date(b.date.replace(/\./g, '-')).getTime() - new Date(a.date.replace(/\./g, '-')).getTime()
      case 'latest':
      default:
        return b.id - a.id
    }
  })

  const postsPerPage = 10
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const paginatedPosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        {/* Page Title */}
        <AnimatedSection className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-2">
              유학 관련 정보 게시판
            </h1>
            <p className="text-center text-muted-foreground text-sm">
              최신 유학 정보, 대학 입시 팁, 그리고 유학 준비 가이드를 확인하세요
            </p>
          </div>
        </AnimatedSection>

        {/* YouTube Section */}
        <AnimatedSection className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: YouTube Embed */}
              <div className="lg:col-span-2">
                <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/Bia9Zx7NFDE"
                    title="Interprep YouTube Featured Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Right: Video List */}
              <div className="bg-black rounded-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Interprep TV - 유학관련 영상 리스트
                </h3>
                <div className="space-y-4">
                  {YOUTUBE_VIDEOS.map((video, idx) => (
                    <a
                      key={idx}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white text-sm leading-relaxed hover:underline transition-all"
                    >
                      {video.title}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-6">
                  *클릭하면 유튜브로 연결됩니다.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Board Section */}
        <AnimatedSection className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Top Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-foreground font-medium">
                  전체 {posts.length}
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1) }}
                    className="px-4 py-2 text-sm border border-gray-200 rounded bg-white text-foreground cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    <option value="latest">최신순</option>
                    <option value="recommended">추천순</option>
                    <option value="views">조회수 많은순</option>
                    <option value="updated">업데이트순</option>
                  </select>

                  {isAdminLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      로그아웃
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      로그인
                    </button>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-16">번호</th>
                        <th className="border border-gray-200 px-6 py-3 text-center font-bold text-foreground bg-pink-50/50">제목</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-24">작성자</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-24">작성일</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-20">조회</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPosts.map((post, idx) => (
                        <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.id}</td>
                          <td className="border border-gray-200 px-6 py-3 text-sm text-foreground cursor-pointer hover:text-blue-600 transition-colors">{post.title}</td>
                          <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.author}</td>
                          <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.date}</td>
                          <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-red-700 text-white'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > 5 && (
                  <button className="px-3 py-1 text-sm text-foreground hover:text-blue-600">
                    마지막
                  </button>
                )}
              </div>

              {/* Write Button */}
              {isAdminLoggedIn && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setShowWriteModal(true)}
                    className="px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors font-medium"
                  >
                    글쓰기
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">관리자 로그인</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">ID</label>
                <input
                  type="text"
                  value={loginInput.id}
                  onChange={(e) => setLoginInput({ ...loginInput, id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="ID를 입력하세요"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">비밀번호</label>
                <input
                  type="password"
                  value={loginInput.pw}
                  onChange={(e) => setLoginInput({ ...loginInput, pw: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="비밀번호를 입력하세요"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors font-medium"
                >
                  로그인
                </button>
                <button
                  onClick={() => { setShowLoginModal(false); setLoginInput({ id: '', pw: '' }) }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-foreground rounded hover:bg-gray-50 transition-colors font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write Modal */}
      {showWriteModal && isAdminLoggedIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">글쓰기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">제목</label>
                <input
                  type="text"
                  value={writeInput.title}
                  onChange={(e) => setWriteInput({ ...writeInput, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">내용</label>
                <textarea
                  value={writeInput.content}
                  onChange={(e) => setWriteInput({ ...writeInput, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700 resize-none h-48"
                  placeholder="내용을 입력하세요"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleWritePost}
                  className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors font-medium"
                >
                  등록
                </button>
                <button
                  onClick={() => { setShowWriteModal(false); setWriteInput({ title: '', content: '' }) }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-foreground rounded hover:bg-gray-50 transition-colors font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
