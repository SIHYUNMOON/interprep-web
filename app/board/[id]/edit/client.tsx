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
import { CalendarIcon, Plus } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const DEFAULT_CATEGORIES = [
  '인터프렙 소개',
  '인터프렙 이야기',
  'US College',
  '국내수시',
  'MBA',
  '인터프렙 프로그램',
  '유용한 정보',
  '잉글스토리',
]

interface Post {
  id: string
  title: string
  content_html: string
  created_at: string
  category: string
}

export function EditClient({ postId }: { postId: string }) {
  const router = useRouter()
  const { getAuthToken } = useAuth()
  const [title, setTitle] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadCategories()
    loadPost()
  }, [postId])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      // Merge default categories with categories from database
      const dbCategories = data.categories || []
      const additionalCategories = dbCategories.filter(
        (cat: string) => !DEFAULT_CATEGORIES.includes(cat)
      )
      
      setCategories([...DEFAULT_CATEGORIES, ...additionalCategories])
    } catch (error) {
      console.error('[v0] Failed to load categories:', error)
      // Fallback to default categories if API fails
      setCategories(DEFAULT_CATEGORIES)
    }
  }

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
      setCategory(post.category || DEFAULT_CATEGORIES[0])
    } catch (error) {
      console.error('[v0] Failed to load post:', error)
      setError('게시글을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()]
      setCategories(updatedCategories)
      setCategory(newCategory.trim())
      setNewCategory('')
      setIsAddingCategory(false)
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
          customDate: customDate?.toISOString(),
          category
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

              {/* Category Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  카테고리
                </label>
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded bg-white text-foreground cursor-pointer hover:border-gray-300 transition-colors disabled:opacity-50"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingCategory(!isAddingCategory)}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <Plus size={16} />
                    새 카테고리
                  </Button>
                </div>
                {isAddingCategory && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="새 카테고리 이름"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddCategory()
                        }
                      }}
                      disabled={isSaving}
                    />
                    <Button onClick={handleAddCategory} size="sm" disabled={isSaving}>
                      추가
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingCategory(false)
                        setNewCategory('')
                      }}
                      variant="outline"
                      size="sm"
                      disabled={isSaving}
                    >
                      취소
                    </Button>
                  </div>
                )}
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
