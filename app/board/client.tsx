'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { LoginModal } from '@/components/board/login-modal'
import { WriteModal } from '@/components/board/write-modal'
import { PostDetailModal } from '@/components/board/post-detail-modal'
import { Button } from '@/components/ui/button'
import { Eye, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface Post {
  id: string
  title: string
  author: string
  created_at: string
  views: number
  likes: number
  content_html: string
}

interface PaginatedResponse {
  items: Post[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

const YOUTUBE_VIDEOS = [
  { title: '그렇게 준비할거면 하지마라! 미국대학입시 제대로 준비하는 법', url: 'https://www.youtube.com/watch?v=NVQm9aaCjw0&feature=youtu.be' },
  { title: '파일럿이 되고 싶다고? 미국으로 가라!', url: 'https://www.youtube.com/watch?v=WmcTTIUPphU&feature=youtu.be' },
  { title: '이거 빠뜨리면 반드시 망한다...- 카운셀러 추천서&평가', url: 'https://www.youtube.com/watch?v=1MlWxLB4VbY&feature=youtu.be' },
  { title: '대한민국 최고 컨설턴트의 미국대학원 진학 꿀팁 왕방출', url: 'https://www.youtube.com/watch?v=Lbjs_O9hNZM' },
  { title: '미국 탑스쿨에 들어가려면 에세이, 이렇게 쓰세요', url: 'https://www.youtube.com/watch?v=w1McOBjCP6c&feature=youtu.be' },
]

export function BoardClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState<'latest' | 'recommended' | 'mostViewed' | 'updated'>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  // Check admin auth on mount
  useEffect(() => {
    checkAdminStatus()
  }, [])

  // Load posts when sort or page changes
  useEffect(() => {
    loadPosts()
  }, [sortBy, currentPage])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()
      setIsAdminLoggedIn(data.isAdmin)
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAdminLoggedIn(false)
    }
  }

  const loadPosts = async () => {
    setIsLoadingPosts(true)
    try {
      const response = await fetch(
        `/api/posts?sort=${sortBy}&page=${currentPage}&pageSize=10`
      )
      const data: PaginatedResponse = await response.json()
      setPosts(data.items)
      setTotalPages(data.totalPages)
      setTotalCount(data.totalCount)
    } catch (error) {
      console.error('Failed to load posts:', error)
      setPosts([])
    } finally {
      setIsLoadingPosts(false)
    }
  }

  const handleLogin = async (username: string, password: string) => {
    setIsLoadingAuth(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      setIsAdminLoggedIn(true)
      setShowLoginModal(false)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAdminLoggedIn(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handlePublish = async (title: string, contentHtml: string) => {
    setIsPublishing(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, contentHtml }),
      })

      if (!response.ok) {
        throw new Error('Failed to publish post')
      }

      setShowWriteModal(false)
      setCurrentPage(1)
      setTotalCount(totalCount + 1)
      await loadPosts()
    } catch (error) {
      console.error('Publish error:', error)
      throw error
    } finally {
      setIsPublishing(false)
    }
  }

  const handlePostClick = async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`)
      const fullPost = await response.json()
      setSelectedPost(fullPost)
    } catch (error) {
      console.error('Failed to load post:', error)
    }
  }

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'recommended', label: '추천순' },
    { value: 'mostViewed', label: '조회수 많은순' },
    { value: 'updated', label: '업데이트순' },
  ] as const

  const postsPerPage = 10
  const paginatedPosts = posts

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
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="text-sm text-foreground font-medium">
                  전체 {totalCount}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1) }}
                    className="px-4 py-2 text-sm border border-gray-200 rounded bg-white text-foreground cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>

                  {isAdminLoggedIn ? (
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="text-red-700 border-red-200 hover:bg-red-50"
                    >
                      로그아웃
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowLoginModal(true)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      로그인
                    </Button>
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
                        <th className="border border-gray-200 px-6 py-3 text-left font-bold text-foreground bg-pink-50/50">제목</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-24">작성자</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-24">작성일</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-20">조회</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingPosts ? (
                        <tr>
                          <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                            로딩 중...
                          </td>
                        </tr>
                      ) : paginatedPosts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                            게시물이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        paginatedPosts.map((post) => (
                          <tr 
                            key={post.id} 
                            className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                            onClick={() => handlePostClick(post)}
                          >
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.id.slice(0, 8)}</td>
                            <td className="border border-gray-200 px-6 py-3 text-sm text-foreground truncate">{post.title}</td>
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.author}</td>
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">
                              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.views}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, currentPage - 2)
                    return start + i
                  }).map((page) => (
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

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {/* Write Button */}
              {isAdminLoggedIn && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={() => setShowWriteModal(true)}
                    className="bg-red-700 hover:bg-red-800 gap-2"
                  >
                    <Plus size={18} />
                    글쓰기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        isLoading={isLoadingAuth}
      />

      <WriteModal
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        onPublish={handlePublish}
        isLoading={isPublishing}
      />

      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />

      <Footer />
    </div>
  )
}
