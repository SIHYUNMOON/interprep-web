import { NextRequest, NextResponse } from 'next/server';
import { incrementPostViews } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Skip if admin is authenticated
    const isAdmin = getSessionFromRequest(request);
    if (isAdmin) {
      return NextResponse.json({ ok: true, incremented: false, skipped: 'admin' });
    }

    // Check 24-hour cookie-based unique view
    const cookieName = `viewed_post_${id}`;
    const alreadyViewed = request.cookies.get(cookieName)?.value === '1';

    const res = NextResponse.json({ ok: true, incremented: !alreadyViewed });

    // If not viewed before, increment views and set cookie
    if (!alreadyViewed) {
      await incrementPostViews(id);

      res.cookies.set({
        name: cookieName,
        value: '1',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    return res;
  } catch (error) {
    console.error('View tracking error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to track view' },
      { status: 500 }
    );
  }
}
