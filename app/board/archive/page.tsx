import type { Metadata } from 'next'
import { getPosts } from '@/lib/db'

export const runtime = 'nodejs'
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Board Archive | Interprep',
    description: 'Complete archive of all Interprep board posts and articles.',
  }
}

export default async function BoardArchivePage() {
  const result = await getPosts('latest', 1, 1000)

  if (!result.ok) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-6">Board Archive</h1>
          <p className="text-sm text-muted-foreground">
            일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해 주세요. SERVICE_TEMP_UNAVAILABLE
          </p>
        </div>
      </main>
    )
  }

  const posts = result.data.items

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-6">Board Archive</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Complete archive of all Interprep board posts and articles.
        </p>
        <ul className="space-y-3">
          {posts.map((post) => {
            const date = new Date(post.created_at)
            const dateText = date.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            const dateIso = Number.isNaN(date.getTime()) ? undefined : date.toISOString().split('T')[0]

            return (
              <li key={post.id} className="flex flex-col gap-1 border-b border-gray-100 pb-3">
                <a href={`/board/${post.id}`} className="text-base font-medium text-foreground hover:text-red-700">
                  {post.title}
                </a>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {post.category || '인터프렙 소개'}
                  </span>
                  {dateIso ? (
                    <time dateTime={dateIso}>{dateText}</time>
                  ) : (
                    <span>{dateText}</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
