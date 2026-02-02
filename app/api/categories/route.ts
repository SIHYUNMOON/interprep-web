import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

export const runtime = 'nodejs';

function envHasDbUrl() {
  return Boolean(
    process.env.DATABASE_URL ?? 
    process.env.NEON_DATABASE_URL ?? 
    process.env.POSTGRES_URL
  );
}

export async function GET() {
  try {
    await initializeDatabase();
    const sql = getDb();

    // Get all unique categories from posts
    const result = await sql`
      SELECT DISTINCT category 
      FROM posts 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category
    `;

    const categories = result.map((row: any) => row.category);

    return NextResponse.json({ categories });
  } catch (error) {
    const hasDbUrl = envHasDbUrl();
    console.error('[api/categories] db failed', {
      code: 'db_unavailable',
      hasDbUrl,
      runtime: 'nodejs',
      error: error instanceof Error ? error.message : String(error)
    });
    return NextResponse.json(
      { error: 'db_unavailable', code: 'db_unavailable' },
      { status: 503 }
    );
  }
}
