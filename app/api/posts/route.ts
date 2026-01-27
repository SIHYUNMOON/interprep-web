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
    const category = searchParams.get('category') || undefined;

    console.log('[v0] GET /api/posts - sort:', sort, 'page:', page, 'pageSize:', pageSize, 'category:', category);

    const result = await getPosts(sort, page, pageSize, category);
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
    // Check Authorization header first
    const authHeader = request.headers.get('authorization');
    console.log('[v0] POST /api/posts - Authorization header:', authHeader ? 'present' : 'missing');
    
    let isAuthenticated = false;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('[v0] Token from Authorization header:', token ? 'present' : 'missing');
      if (token) {
        isAuthenticated = true;
        console.log('[v0] Authenticated via Authorization header');
      }
    } else {
      // Fall back to cookie-based auth
      isAuthenticated = isAdminAuthenticatedFromRequest(request);
      console.log('[v0] Is admin authenticated (cookie):', isAuthenticated);
    }
    
    if (!isAuthenticated) {
      console.warn('[v0] POST /api/posts - Unauthorized attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, contentHtml, customDate, category } = body;

    if (!title || !contentHtml) {
      console.warn('[v0] POST /api/posts - Missing fields. Title:', !!title, 'Content:', !!contentHtml);
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    console.log('[v0] POST /api/posts - Creating post:', { title: title.substring(0, 50), category });

    const post = await createPost(title, contentHtml, customDate, category);
    
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
