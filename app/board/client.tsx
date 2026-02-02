'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface Post {
  id: string
  title: string
  author: string
  created_at: string
  views: number
  likes: number
  content_html: string
  category: string
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

interface BoardClientProps {
  initialPosts?: Post[]
  initialTotalCount?: number
  initialTotalPages?: number
  initialDbUnavailable?: boolean
}

export function BoardClient({ 
  initialPosts = [], 
  initialTotalCount = 0, 
  initialTotalPages = 1,
  initialDbUnavailable = false
}: BoardClientProps) {
  const router = useRouter()
  const { isAdminLoggedIn } = useAuth()
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [sortBy, setSortBy] = useState<'latest' | 'recommended' | 'mostViewed' | 'updated'>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const [dbUnavailable, setDbUnavailable] = useState(initialDbUnavailable)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [sortBy, currentPage, selectedCategory])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      // Define default categories in order
      const defaultCategories = [
        '인터프렙 소개',
        '인터프렙 이야기',
        'US College',
        '국내수시',
        'MBA',
        '인터프렙 프로그램',
        '유용한 정보',
        '잉글스토리',
      ]
      
      // Merge default categories with categories from database
      // Remove duplicates and keep the order: defaults first, then additional ones
      const dbCategories = data.categories || []
      const additionalCategories = dbCategories.filter(
        (cat: string) => !defaultCategories.includes(cat)
      )
      
      setCategories([...defaultCategories, ...additionalCategories])
    } catch (error) {
      console.error('[v0] Failed to load categories:', error)
      // Fallback to default categories if API fails
      setCategories([
        '인터프렙 소개',
        '인터프렙 이야기',
        'US College',
        '국내수시',
        'MBA',
        '인터프렙 프로그램',
        '유용한 정보',
        '잉글스토리',
      ])
    }
  }

  const loadPosts = async () => {
    setIsLoadingPosts(true)
    try {
      const params = new URLSearchParams({
        sort: sortBy,
        page: currentPage.toString(),
        pageSize: '10',
      })
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      
      const response = await fetch(`/api/posts?${params}`)
      if (response.status === 503) {
        setDbUnavailable(true)
        setPosts([])
        setTotalPages(1)
        setTotalCount(0)
        return
      }

      const data: PaginatedResponse = await response.json()
      setDbUnavailable(false)
      setPosts(data.items)
      setTotalPages(data.totalPages)
      setTotalCount(data.totalCount)
    } catch (error) {
      console.error('[v0] Failed to load posts:', error)
      setDbUnavailable(true)
      setPosts([])
    } finally {
      setIsLoadingPosts(false)
    }
  }



  const handlePostClick = (post: Post) => {
    router.push(`/board/${post.id}`)
  }

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'mostViewed', label: '조회수 많은순' },
  ] as const

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
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

        <AnimatedSection className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

        <AnimatedSection className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-100 text-foreground hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-700 text-white'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="text-sm text-foreground font-medium">
                  {dbUnavailable ? '전체 -' : `전체 ${totalCount}`}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any)
                    setCurrentPage(1)
                  }}
                  className="px-4 py-2 text-sm border border-gray-200 rounded bg-white text-foreground cursor-pointer hover:border-gray-300 transition-colors"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-16">번호</th>
                        <th className="border border-gray-200 px-6 py-3 text-center font-bold text-foreground bg-pink-50/50">제목</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-32">작성자</th>
                        <th className="border border-gray-200 px-4 py-3 text-center font-bold text-foreground bg-pink-50/50 w-32">작성일</th>
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
                      ) : dbUnavailable ? (
                        <tr>
                          <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                            일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해 주세요. SERVICE_TEMP_UNAVAILABLE
                          </td>
                        </tr>
                      ) : posts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                            게시물이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        posts.map((post) => (
                          <tr
                            key={post.id}
                            className="hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.id.slice(0, 8)}</td>
                            <td className="border border-gray-200 px-6 py-3 text-sm text-foreground">
                              <Link href={`/board/${post.id}`} className="flex items-center gap-2 hover:text-red-700 transition-colors">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
                                  {post.category || '인터프렙 소개'}
                                </span>
                                <span className="truncate">{post.title}</span>
                              </Link>
                            </td>
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (page === 1 || page === totalPages) return true
                      if (Math.abs(page - currentPage) <= 2) return true
                      return false
                    })
                    .map((page, idx, arr) => {
                      // Add ellipsis if there's a gap
                      const showEllipsis = idx > 0 && page - arr[idx - 1] > 1
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && <span className="px-2 text-gray-400">...</span>}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded text-sm transition-colors ${
                              currentPage === page
                                ? 'bg-red-700 text-white'
                                : 'bg-gray-100 text-foreground hover:bg-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      )
                    })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {isAdminLoggedIn && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={() => router.push('/board/write')}
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

      <Footer />
    </div>
  )
}
