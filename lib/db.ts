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
    console.log('[v0] Database initialized successfully');
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
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

export async function getPosts(
  sort: 'latest' | 'recommended' | 'mostViewed' | 'updated' = 'latest',
  page: number = 1,
  pageSize: number = 10,
  category?: string
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
