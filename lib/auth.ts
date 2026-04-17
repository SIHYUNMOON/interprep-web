import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'adminInPrep2013';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'InterP!Web26#Ops@';
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'interprep-secret-key-2026';

interface SessionData {
  isAdmin: boolean;
  timestamp: number;
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function hashCredentials(username: string, password: string): string {
  return crypto
    .createHash('sha256')
    .update(`${username}:${password}:${SESSION_SECRET}`)
    .digest('hex');
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days - extended session duration
    path: '/',
  };
}

export async function createSession(): Promise<string> {
  const token = generateSessionToken();
  
  console.log('[v0] Session token generated:', token.substring(0, 10) + '...');
  console.log('[v0] Cookie options - secure:', process.env.NODE_ENV === 'production');

  return token;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  console.log('[v0] getSession - Cookie name:', SESSION_COOKIE_NAME, 'Session exists:', !!session);
  return session;
}

export function getSessionFromRequest(request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie');
  console.log('[v0] getSessionFromRequest - Cookie header:', cookieHeader);
  
  if (!cookieHeader) {
    console.log('[v0] getSessionFromRequest - No cookie header');
    return undefined;
  }
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith(`${SESSION_COOKIE_NAME}=`));
  
  if (!sessionCookie) {
    console.log('[v0] getSessionFromRequest - Session cookie not found in:', cookies);
    return undefined;
  }
  
  const session = sessionCookie.split('=')[1];
  console.log('[v0] getSessionFromRequest - Session found:', session ? 'yes' : 'no');
  return session;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getSession();
  console.log('[v0] isAdminAuthenticated - Session value:', session ? 'exists' : 'missing');
  return !!session;
}

export function isAdminAuthenticatedFromRequest(request: Request): boolean {
  const session = getSessionFromRequest(request);
  console.log('[v0] isAdminAuthenticatedFromRequest - Session:', session ? 'exists' : 'missing');
  return !!session;
}

export function verifyAdminToken(token: string): boolean {
  // Verify the token is a valid session token
  // In this implementation, we check if it's a valid hex string of the right length
  if (!token || token.length !== 64) {
    return false;
  }
  // Check if it's a valid hex string
  return /^[0-9a-f]{64}$/i.test(token);
}
