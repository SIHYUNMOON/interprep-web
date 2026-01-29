import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

export const runtime = 'nodejs';

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
    console.error('[v0] Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
