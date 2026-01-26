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

export async function createSession(): Promise<string> {
  const token = generateSessionToken();
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });

  return token;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}
