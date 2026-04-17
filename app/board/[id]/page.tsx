import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostViewClient } from './client'
import { getPostById } from '@/lib/db'

export const runtime = 'nodejs'

type Post = {
  id: string
  title: string
  author: string
  created_at: string
  views: number
  content_html: string
  category: string
}

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getPostById(id)
  if (!result.ok) {
    return {
      title: 'Temporarily unavailable',
    }
  }

  if (!result.data) {
    return {
      title: 'Not Found',
    }
  }

  const post = result.data

  const textContent = post.content_html
    .replace(/<[^>]*>/g, '')
    .substring(0, 160)

  return {
    title: post.title,
    description: textContent,
    openGraph: {
      title: post.title,
      description: textContent,
      url: `https://interprep.academy/board/${id}`,
    },
  }
}

export default async function PostViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getPostById(id)

  if (!result.ok) {
    console.error('[post] db fetch failed:', { error: 'db_unavailable', route: '/board/[id]', id })
    return (
      <PostViewClient
        postId={id}
        initialData={null}
        initialError="db_unavailable"
        initialLoading={false}
      />
    )
  }

  if (!result.data) {
    notFound()
  }

  const initialData = result.data

  return (
    <PostViewClient
      postId={id}
      initialData={initialData}
      initialLoading={false}
    />
  )
}
