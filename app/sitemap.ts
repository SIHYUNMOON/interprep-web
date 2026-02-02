import { MetadataRoute } from 'next'

export const runtime = 'nodejs'

const BASE_URL = 'https://interprep.academy'

// Revalidate every 1 hour
export const revalidate = 3600

async function getPosts(): Promise<Array<{ id: string; updated_at: string }>> {
  try {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      console.warn('[sitemap] DATABASE_URL not set, returning empty posts')
      return []
    }

    // Import neon inside the function to avoid connection issues
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(databaseUrl)
    
    const result = await sql`
      SELECT id, updated_at FROM posts ORDER BY updated_at DESC
    ` as Array<{ id: string; updated_at: string }>

    return result || []
  } catch (error) {
    console.error('[sitemap] Failed to fetch posts:', error)
    // Return empty array instead of failing - sitemap must always return 200
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Array<{ id: string; updated_at: string }> = []
  
  try {
    posts = await getPosts()
    console.log('[sitemap] fetched posts', { count: posts.length })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[sitemap] Failed to get posts:', { error: errorMsg })
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/philosophy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/location`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/presat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/toefl`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/art-english`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/ipass`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/admission-results`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/credit-system`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/board`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
  ]

  // Dynamic post pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/board/${post.id}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...postPages]
}
