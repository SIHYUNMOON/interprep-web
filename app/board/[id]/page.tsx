import { Suspense } from 'react'
import { PostViewClient } from './client'

export default async function PostViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostViewClient postId={id} />
    </Suspense>
  )
}
