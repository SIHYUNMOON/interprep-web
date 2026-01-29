import { Suspense } from 'react'
import { EditClient } from './client'

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditClient postId={id} />
    </Suspense>
  )
}
