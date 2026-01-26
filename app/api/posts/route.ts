import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { isAdminAuthenticatedFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = (searchParams.get('sort') as 'latest' | 'recommended' | 'mostViewed' | 'updated') || 'latest';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    console.log('[v0] GET /api/posts - sort:', sort, 'page:', page, 'pageSize:', pageSize);

    const result = await getPosts(sort, page, pageSize);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] GET /api/posts error:', errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = isAdminAuthenticatedFromRequest(request);
    if (!isAdmin) {
      console.warn('[v0] POST /api/posts - Unauthorized attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, contentHtml } = body;

    if (!title || !contentHtml) {
      console.warn('[v0] POST /api/posts - Missing fields. Title:', !!title, 'Content:', !!contentHtml);
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    console.log('[v0] POST /api/posts - Creating post:', { title: title.substring(0, 50) });

    const post = await createPost(title, contentHtml);
    
    console.log('[v0] POST /api/posts - Post created:', post.id);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] POST /api/posts error:', errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to create post', details: errorMessage },
      { status: 500 }
    );
  }
}
