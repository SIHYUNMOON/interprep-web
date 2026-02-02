import { neon } from '@neondatabase/serverless';

// Initialize database connection and tables on first call
let initialized = false;
let db: ReturnType<typeof neon> | null = null;

export function getDb() {
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
    
    // Create pgcrypto extension for UUID generation
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
    
    // Create posts table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        content_html TEXT NOT NULL,
        author TEXT NOT NULL DEFAULT 'Interprep',
        thumbnail_url TEXT,
        published BOOLEAN DEFAULT true,
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
    console.log('[board] Database initialized successfully');
  } catch (error) {
    console.error('[board] Database initialization error:', error instanceof Error ? error.message : String(error));
    throw error;
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
  category: string;
}

export type DbResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: 'db_unavailable' };

function shouldSimulateDbFailure() {
  return process.env.SIMULATE_DB_FAIL === '1';
}

export async function getPosts(
  sort: 'latest' | 'recommended' | 'mostViewed' | 'updated' = 'latest',
  page: number = 1,
  pageSize: number = 10,
  category?: string
): Promise<DbResult<{
  items: Post[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}>> {
  if (shouldSimulateDbFailure()) {
    console.error('[board] db fetch failed:', { error: 'SIMULATE_DB_FAIL enabled', sort, page, pageSize, category });
    return { ok: false, error: 'db_unavailable' } as const;
  }

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

    let result;
    let countResult;
    
    if (category) {
      // Filter by category
      if (orderBy === 'created_at DESC') {
        result = await sql`
          SELECT * FROM posts
          WHERE category = ${category}
          ORDER BY created_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else if (orderBy === 'views DESC') {
        result = await sql`
          SELECT * FROM posts
          WHERE category = ${category}
          ORDER BY views DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else if (orderBy === 'updated_at DESC') {
        result = await sql`
          SELECT * FROM posts
          WHERE category = ${category}
          ORDER BY updated_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else {
        result = await sql`
          SELECT * FROM posts
          WHERE category = ${category}
          ORDER BY created_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      }
      
      countResult = await sql`
        SELECT COUNT(*) as count FROM posts
        WHERE category = ${category}
      `;
    } else {
      // No category filter
      if (orderBy === 'created_at DESC') {
        result = await sql`
          SELECT * FROM posts
          ORDER BY created_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else if (orderBy === 'views DESC') {
        result = await sql`
          SELECT * FROM posts
          ORDER BY views DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else if (orderBy === 'updated_at DESC') {
        result = await sql`
          SELECT * FROM posts
          ORDER BY updated_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      } else {
        result = await sql`
          SELECT * FROM posts
          ORDER BY created_at DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `;
      }
      
      countResult = await sql`
        SELECT COUNT(*) as count FROM posts
      `;
    }

    const totalCount = parseInt((countResult[0] as any).count);
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log('[board] getPosts success', { page, pageSize, totalCount, sort, category });
    
    return {
      ok: true,
      data: {
        items: result as Post[],
        totalCount,
        page,
        pageSize,
        totalPages,
      },
    } as const;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[board] db fetch failed:', { error: errorMsg, sort, page, pageSize, category });
    return { ok: false, error: 'db_unavailable' } as const;
  }
}

export async function getPostById(id: string): Promise<DbResult<Post | null>> {
  if (shouldSimulateDbFailure()) {
    console.error('[post] db fetch failed:', { error: 'SIMULATE_DB_FAIL enabled', id });
    return { ok: false, error: 'db_unavailable' } as const;
  }

  try {
    await initializeDatabase();
    const sql = getDb();

    // Fetch post WITHOUT incrementing views
    const result = await sql`
      SELECT * FROM posts
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      console.log('[board] getPostById: post not found', { id });
      return { ok: true, data: null } as const;
    }

    console.log('[board] getPostById success', { id });
    return { ok: true, data: result[0] as Post } as const;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[post] db fetch failed:', { error: errorMsg, id });
    return { ok: false, error: 'db_unavailable' } as const;
  }
}

export async function incrementPostViews(id: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    // Atomically increment views in database
    const result = await sql`
      UPDATE posts
      SET views = views + 1
      WHERE id = ${id}
      RETURNING *
    `;

    return result[0] as Post | undefined;
  } catch (error) {
    console.error('[v0] Increment post views error:', error);
    return undefined;
  }
}

export async function createPost(title: string, contentHtml: string, customDate?: string, category?: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    const finalCategory = category || '인터프렙 소개';
    
    let result;
    if (customDate) {
      result = await sql`
        INSERT INTO posts (title, content_html, author, created_at, category)
        VALUES (${title}, ${contentHtml}, 'interprep official', ${customDate}, ${finalCategory})
        RETURNING *
      `;
    } else {
      result = await sql`
        INSERT INTO posts (title, content_html, author, category)
        VALUES (${title}, ${contentHtml}, 'interprep official', ${finalCategory})
        RETURNING *
      `;
    }

    return result[0] as Post;
  } catch (error) {
    console.error('[v0] Create post error:', error);
    throw error;
  }
}

export async function updatePost(id: string, title: string, contentHtml: string, customDate?: string, category?: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    let result;
    if (customDate && category) {
      result = await sql`
        UPDATE posts
        SET title = ${title}, 
            content_html = ${contentHtml}, 
            updated_at = now(),
            created_at = ${customDate},
            category = ${category}
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (customDate) {
      result = await sql`
        UPDATE posts
        SET title = ${title}, 
            content_html = ${contentHtml}, 
            updated_at = now(),
            created_at = ${customDate}
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (category) {
      result = await sql`
        UPDATE posts
        SET title = ${title}, 
            content_html = ${contentHtml}, 
            updated_at = now(),
            category = ${category}
        WHERE id = ${id}
        RETURNING *
      `;
    } else {
      result = await sql`
        UPDATE posts
        SET title = ${title}, 
            content_html = ${contentHtml}, 
            updated_at = now()
        WHERE id = ${id}
        RETURNING *
      `;
    }

    return result[0] as Post | undefined;
  } catch (error) {
    console.error('[v0] Update post error:', error);
    throw error;
  }
}

export async function deletePost(id: string) {
  try {
    await initializeDatabase();
    const sql = getDb();

    const result = await sql`
      DELETE FROM posts
      WHERE id = ${id}
      RETURNING id
    `;

    return result.length > 0;
  } catch (error) {
    console.error('[v0] Delete post error:', error);
    return false;
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
