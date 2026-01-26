import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = await validateCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await createSession();
    console.log('[v0] Login successful - Session token created:', token ? 'yes' : 'no');

    const response = NextResponse.json({ success: true, token });
    
    // Set cookie with proper settings for v0 preview environment
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Set to false for v0 preview environment
      sameSite: 'lax' as const,
      maxAge: 24 * 60 * 60,
      path: '/',
    };
    
    console.log('[v0] Setting cookie with options:', cookieOptions);
    response.cookies.set('admin_session', token, cookieOptions);
    
    // Also set as header to ensure it's sent
    response.headers.set(
      'Set-Cookie',
      `admin_session=${token}; Path=/; HttpOnly; Max-Age=${24 * 60 * 60}; SameSite=Lax`
    );
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
