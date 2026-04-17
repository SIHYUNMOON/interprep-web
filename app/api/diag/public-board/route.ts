import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getBooleanEnv(name: string): boolean {
  const value = process.env[name]
  return !!value && value !== '0' && value !== 'false'
}

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString()
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  try {
    // Check environment
    const hasDbUrl = !!process.env.DATABASE_URL
    const isProduction = process.env.NODE_ENV === 'production'
    
    let dbConnection = 'unknown'
    let postsCount = 0
    let samplePostId: string | null = null
    let errorMessage: string | null = null

    // Try to connect and fetch posts
    if (!hasDbUrl) {
      dbConnection = 'fail'
      errorMessage = 'DATABASE_URL not configured'
    } else {
      try {
        const { neon } = await import('@neondatabase/serverless')
        const sql = neon(process.env.DATABASE_URL!)
        
        // Test connection with simple query
        const testResult = await sql`SELECT 1 as test`
        dbConnection = 'ok'
        
        // Get posts count
        const countResult = await sql`
          SELECT COUNT(*) as count FROM posts
        `
        
        postsCount = parseInt((countResult[0] as any).count || '0')
        
        // Get sample ID if posts exist
        if (postsCount > 0) {
          const sampleResult = await sql`
            SELECT id FROM posts LIMIT 1
          `
          if (sampleResult.length > 0) {
            samplePostId = (sampleResult[0] as any).id
          }
        }
      } catch (dbError) {
        dbConnection = 'fail'
        const err = dbError instanceof Error ? dbError.message : String(dbError)
        errorMessage = err.substring(0, 100) // Truncate for security
        console.error('[diag] DB connection failed:', err)
      }
    }

    // Check if we can fetch a specific post (from query param)
    let canFetchKnownId = false
    const knownId = request.nextUrl.searchParams.get('id')
    
    if (knownId && hasDbUrl && dbConnection === 'ok') {
      try {
        const { neon } = await import('@neondatabase/serverless')
        const sql = neon(process.env.DATABASE_URL!)
        const result = await sql`
          SELECT id FROM posts WHERE id = ${knownId}
        `
        canFetchKnownId = result.length > 0
      } catch {
        canFetchKnownId = false
      }
    }

    const response = {
      timestamp,
      runtime: 'nodejs',
      userAgent,
      env: {
        hasDbUrl,
        isProduction,
      },
      dbConnection,
      postsCount,
      samplePostId,
      canFetchKnownId: knownId ? canFetchKnownId : undefined,
      errorMessage,
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        timestamp,
        error: 'Diagnostic check failed',
        message: err.substring(0, 100),
      },
      { status: 500 }
    )
  }
}
