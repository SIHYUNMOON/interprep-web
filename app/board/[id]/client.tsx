'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Copy, Share2, Edit, Trash2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Post {
  id: string
  title: string
  author: string
  created_at: string
  views: number
  content_html: string
  category: string
}

export function PostViewClient({
  postId,
  initialData,
  initialError,
  initialLoading = true,
}: {
  postId: string
  initialData?: Post | null
  initialError?: 'db_unavailable' | null
  initialLoading?: boolean
}) {
  const router = useRouter()
  const { isAdminLoggedIn, getAuthToken } = useAuth()
  const [post, setPost] = useState<Post | null>(initialData ?? null)
  const [isLoading, setIsLoading] = useState(initialData ? false : initialLoading)
  const [errorType, setErrorType] = useState<'db_unavailable' | null>(initialError ?? null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const viewPingedRef = useRef<Record<string, boolean>>({})

  useEffect(() => {
    if (initialData && initialData.id === postId) {
      setPost(initialData)
      setIsLoading(false)
      setErrorType(null)
      pingView(postId)
      return
    }

    setIsLoading(true)
    loadPost()
  }, [postId])

  const pingView = (id: string) => {
    if (viewPingedRef.current[id]) {
      return
    }

    viewPingedRef.current[id] = true
    fetch(`/api/posts/${id}/view`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {
      // Silently fail if view tracking fails
    })
  }

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (response.status === 503) {
        setErrorType('db_unavailable')
        setPost(null)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      setPost(data)
      setErrorType(null)

      pingView(postId)
    } catch (error) {
      console.error('[v0] Failed to load post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyUrl = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('URL이 복사되었습니다.')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: window.location.href,
        })
      } catch (error) {
        console.error('[v0] Share error:', error)
      }
    } else {
      handleCopyUrl()
    }
  }

  const handleEdit = () => {
    router.push(`/board/${postId}/edit`)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const token = getAuthToken()
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      router.push('/board')
    } catch (error) {
      console.error('[v0] Delete error:', error)
      alert('게시글 삭제에 실패했습니다.')
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (errorType === 'db_unavailable') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground">일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해 주세요. SERVICE_TEMP_UNAVAILABLE</p>
              <Button
                onClick={() => router.push('/board')}
                className="mt-4"
              >
                목록으로 돌아가기
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
              <Button
                onClick={() => router.push('/board')}
                className="mt-4"
              >
                목록으로 돌아가기
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <article className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-bold">
                  {post.author[0]}
                </div>
                <span className="text-sm font-medium text-foreground">{post.author}</span>
              </div>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="gap-2"
                >
                  <Copy size={16} />
                  URL 복사
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 size={16} />
                  공유
                </Button>
              </div>

              {isAdminLoggedIn && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="gap-2"
                  >
                    <Edit size={16} />
                    수정
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    삭제
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div
              className="mb-12 text-foreground [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:min-h-[1.5em] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />

            {/* Bottom actions */}
            <div className="flex justify-center pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => router.push('/board')}
              >
                목록으로
              </Button>
            </div>
          </div>
        </article>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 게시글이 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  )
}
