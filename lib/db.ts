import { neon } from '@neondatabase/serverless';

// Initialize database connection and tables on first call
let initialized = false;
let db: ReturnType<typeof neon> | null = null;

function getDb() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    db = neon(databaseUrl);
  }
  return db;
}

export async function initializeDatabase() {
  if (initialized) return;
  
  try {
    const sql = getDb();
    
    // Create posts table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        content_html TEXT NOT NULL,
        author TEXT NOT NULL DEFAULT 'Interprep',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now(),
        views INT DEFAULT 0,
        likes INT DEFAULT 0
      );
    `;

    // Create indexes
    await sql`
      CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_posts_views ON posts(views DESC);
    `;

    initialized = true;
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export interface Post {
  id: string;
  title: string;
  content_html: string;
  author: string;
  created_at: string;
  updated_at: string;
  views: number;
  likes: number;
}

export async function getPosts(
  sort: 'latest' | 'recommended' | 'mostViewed' | 'updated' = 'latest',
  page: number = 1,
  pageSize: number = 10
) {
  try {
    await initializeDatabase();
    const sql = getDb();

    let orderBy = 'created_at DESC';
    if (sort === 'recommended' || sort === 'mostViewed') {
      orderBy = 'views DESC';
    } else if (sort === 'updated') {
      orderBy = 'updated_at DESC';
    }

    const offset = (page - 1) * pageSize;

    const result = await sql`
      SELECT * FROM posts
      ORDER BY ${sql.raw(orderBy)}
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const countResult = await sql`
      SELECT COUNT(*) as count FROM posts
    `;

    const totalCount = parseInt((countResult[0] as any).count);
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      items: result as Post[],
      totalCount,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('[v0] Get posts error:', error);
    return {
      items: [],
      totalCount: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }
}

export async function getPostById(id: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    // Increment views atomically
    const result = await sql`
      UPDATE posts
      SET views = views + 1
      WHERE id = ${id}
      RETURNING *
    `;

    return result[0] as Post | undefined;
  } catch (error) {
    console.error('[v0] Get post by id error:', error);
    return undefined;
  }
}

export async function createPost(title: string, contentHtml: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    const result = await sql`
      INSERT INTO posts (title, content_html, author)
      VALUES (${title}, ${contentHtml}, 'Interprep')
      RETURNING *
    `;

    return result[0] as Post;
  } catch (error) {
    console.error('[v0] Create post error:', error);
    throw error;
  }
}

export async function likePost(id: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    const result = await sql`
      UPDATE posts
      SET likes = likes + 1
      WHERE id = ${id}
      RETURNING *
    `;

    return result[0] as Post | undefined;
  } catch (error) {
    console.error('[v0] Like post error:', error);
    return undefined;
  }
}
