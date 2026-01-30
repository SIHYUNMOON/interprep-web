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
