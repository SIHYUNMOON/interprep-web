import { Metadata } from 'next'
import { PostViewClient } from './client'

type Post = {
  id: string
  title: string
  author: string
  created_at: string
  views: number
  content_html: string
  category: string
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

export const revalidate = 60

async function fetchPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/posts/${id}`, {
      next: { revalidate },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as Post
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = await fetchPost(id)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

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
  const initialData = await fetchPost(id)

  return (
    <PostViewClient
      postId={id}
      initialData={initialData}
      initialLoading={false}
    />
  )
}
