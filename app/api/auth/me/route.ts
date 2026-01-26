import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated();
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
