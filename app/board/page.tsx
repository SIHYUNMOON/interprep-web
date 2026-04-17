import { BoardClient } from './client'
import { getPosts } from '@/lib/db'
import Link from 'next/link'

export const runtime = 'nodejs'
export const metadata = {
  title: '유학 관련 정보 게시판 | 인터프렙',
  description: '인터프렙 유학 관련 정보 게시판, 유학 팁, 대학 입시 정보 등을 확인하세요.',
}

export const revalidate = 60 // Revalidate every 60 seconds

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

export default async function BoardPage() {
  // Fetch initial posts server-side for SSR (bots will see this)
  let initialPosts: Post[] = []
  let initialTotalCount = 0
  let initialTotalPages = 1
  let dbUnavailable = false

  try {
    const result = await getPosts('latest', 1, 10)
    if (!result.ok) {
      dbUnavailable = true
      console.error('[board] db fetch failed:', { error: 'db_unavailable', route: '/board' })
    } else {
      initialPosts = result.data.items as Post[]
      initialTotalCount = result.data.totalCount
      initialTotalPages = result.data.totalPages
    }
  } catch (error) {
    console.error('[board page] Failed to fetch initial posts:', error)
    dbUnavailable = true
  }

  return (
    <>
      {/* Server-rendered fallback for no-JS environments */}
      <noscript>
        <div className="min-h-screen bg-white">
          {/* Static header for no-JS */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-700">인터프렙</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/about" className="text-sm font-medium hover:text-red-700">소개</Link>
                  <Link href="/sat" className="text-sm font-medium hover:text-red-700">SAT</Link>
                  <Link href="/toefl" className="text-sm font-medium hover:text-red-700">TOEFL</Link>
                  <Link href="/board" className="text-sm font-medium text-red-700">게시판</Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-red-700">연락</Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="pt-16">
            <div className="py-16 md:py-20">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-2">
                  유학 관련 정보 게시판
                </h1>
                <p className="text-center text-muted-foreground text-sm mb-8">
                  최신 유학 정보, 대학 입시 팁, 그리고 유학 준비 가이드를 확인하세요
                </p>

                <div className="mb-6">
                  <div className="text-sm text-foreground font-medium mb-4">
                    {dbUnavailable ? '전체 -' : `전체 ${initialTotalCount}`}
                  </div>
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
                        {dbUnavailable ? (
                          <tr>
                            <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                              일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해 주세요. SERVICE_TEMP_UNAVAILABLE
                            </td>
                          </tr>
                        ) : initialPosts.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400">
                              게시물이 없습니다.
                            </td>
                          </tr>
                        ) : (
                          initialPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50/50">
                              <td className="border border-gray-200 px-4 py-3 text-center text-sm text-foreground">{post.id.slice(0, 8)}</td>
                              <td className="border border-gray-200 px-6 py-3 text-sm text-foreground">
                                <Link href={`/board/${post.id}`} className="flex items-center gap-2 hover:text-red-700">
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

                <div className="mt-8 text-center text-sm text-muted-foreground">
                  <p>자바스크립트를 활성화하면 더 많은 기능을 사용할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </main>

          {/* Static footer for no-JS */}
          <footer className="bg-muted border-t border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>ⓒ 2024 인터프렙. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </noscript>

      {/* Client component for JS-enabled users (with all interactive features) */}
      <BoardClient 
        initialPosts={initialPosts}
        initialTotalCount={initialTotalCount}
        initialTotalPages={initialTotalPages}
        initialDbUnavailable={dbUnavailable}
      />
    </>
  )
}
