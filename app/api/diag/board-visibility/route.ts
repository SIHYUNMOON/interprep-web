import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const botPattern = /(bot|crawler|spider|Googlebot|bingbot|GPTBot|ClaudeBot|facebookexternalhit|WhatsApp|TwitterBot|slackbot)/i;
  return botPattern.test(userAgent);
}

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent');
    const isRequestBot = isBot(userAgent);
    
    // Fetch posts using the same method as /api/posts
    const result = await getPosts('latest', 1, 10);
    
    const response = {
      timestamp: new Date().toISOString(),
      runtime: 'nodejs',
      userAgent: userAgent || 'unknown',
      isBot: isRequestBot,
      postsCount: result.totalCount,
      samplePostId: result.items.length > 0 ? result.items[0].id : null,
      pageInfo: {
        currentPage: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
        itemsReturned: result.items.length,
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[diag] board-visibility error:', errorMessage);
    return NextResponse.json(
      { 
        error: 'Diagnostic check failed', 
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
