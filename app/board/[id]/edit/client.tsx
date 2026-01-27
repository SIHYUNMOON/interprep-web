'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RichEditor } from '@/components/board/rich-editor'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  title: string
  content_html: string
  created_at: string
}

export function EditClient({ postId }: { postId: string }) {
  const router = useRouter()
  const { getAuthToken } = useAuth()
  const [title, setTitle] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadPost()
  }, [postId])

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const post: Post = await response.json()
      setTitle(post.title)
      setContentHtml(post.content_html)
      setCustomDate(new Date(post.created_at))
    } catch (error) {
      console.error('[v0] Failed to load post:', error)
      setError('게시글을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setError('')

    if (!title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }

    if (!contentHtml.trim() || contentHtml === '<p></p>') {
      setError('내용을 입력해주세요.')
      return
    }

    setIsSaving(true)
    try {
      const token = getAuthToken()
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ 
          title, 
          contentHtml,
          customDate: customDate?.toISOString()
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to update post')
      }

      router.push(`/board/${postId}`)
    } catch (err) {
      console.error('[v0] Update error:', err)
      setError('게시물 수정에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              글 수정
            </h1>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  제목
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  disabled={isSaving}
                  autoFocus
                  className="text-lg py-6"
                />
              </div>

              {/* Custom Date Picker */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  작성일
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full md:w-[280px] justify-start text-left font-normal',
                        !customDate && 'text-muted-foreground'
                      )}
                      disabled={isSaving}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customDate ? (
                        customDate.toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      ) : (
                        <span>날짜 선택</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={customDate}
                      onSelect={setCustomDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  내용
                </label>
                <div className="border border-gray-200 rounded-lg">
                  <RichEditor
                    value={contentHtml}
                    onChange={setContentHtml}
                    placeholder="내용을 입력하세요..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <Button
                  onClick={handleSave}
                  className="flex-1 md:flex-none md:min-w-[200px] bg-red-700 hover:bg-red-800 py-6 text-base"
                  disabled={isSaving}
                >
                  {isSaving ? '저장 중...' : '저장'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none md:min-w-[200px] py-6 text-base"
                  onClick={() => router.push(`/board/${postId}`)}
                  disabled={isSaving}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
