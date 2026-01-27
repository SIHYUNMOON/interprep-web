# Production Board Upgrade - Implementation Guide

## Overview
The `/board` page has been upgraded to a production-ready system with Neon PostgreSQL database, Vercel Blob image storage, admin authentication with httpOnly sessions, and a TipTap WYSIWYG editor.

## Architecture

### Database (Neon PostgreSQL)
- **Table**: `posts` with UUID primary key, title, HTML content, author, timestamps, views, and likes
- **Environment**: Uses `DATABASE_URL` from Neon integration
- **Initialization**: Automatic table creation on first API call via `initializeDatabase()`
- **File**: `/lib/db.ts` - Server-only database utilities

### Authentication (Server-Side Sessions)
- **Method**: httpOnly cookies with secure session tokens
- **Credentials**: Environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD` (fallback to hardcoded defaults)
- **File**: `/lib/auth.ts` - Server-side session management
- **Security**: Passwords never exposed to client, validated server-side only

### API Routes

#### Authentication
- `POST /api/auth/login` - Validate credentials and set httpOnly session cookie
- `POST /api/auth/logout` - Clear session cookie
- `GET /api/auth/me` - Check if user is authenticated (returns `{ isAdmin: boolean }`)

#### Posts (with admin protection)
- `GET /api/posts?sort=latest|recommended|mostViewed|updated&page=1&pageSize=10` - List posts with pagination
- `POST /api/posts` (admin only) - Create new post with title and contentHtml
- `GET /api/posts/[id]` - Get post by ID and increment views atomically
- `POST /api/posts/[id]/like` - Increment likes (optional, ready for future UI)

#### Image Upload (admin only)
- `POST /api/uploads/image` - Upload image to Vercel Blob, requires valid admin session
- Returns: `{ url }` - Public URL for the uploaded image
- Security: Validates admin session before allowing upload

### Components

#### RichEditor (`/components/board/rich-editor.tsx`)
- TipTap-based WYSIWYG editor with full toolbar
- Features: Bold, Italic, Underline, Strike, Lists, Blockquote, Code, Alignment, Image upload
- Image upload button integrates with `/api/uploads/image`
- Sanitized HTML output with responsive image sizing

#### Modals
- **LoginModal** (`/components/board/login-modal.tsx`) - Admin login with error handling
- **WriteModal** (`/components/board/write-modal.tsx`) - Post creation with rich editor
- **PostDetailModal** (`/components/board/post-detail-modal.tsx`) - Full post view with sanitized HTML

### Board Client (`/app/board/client.tsx`)
- Server-side session checking on mount
- Real-time post loading from `/api/posts`
- Sorting: latest, recommended, mostViewed, updated
- Pagination with prev/next controls
- Admin-only post creation
- Click to view full post details with automatic view counting

## Environment Setup

### Required Environment Variables
\`\`\`env
DATABASE_URL=postgresql://...  # From Neon integration
ADMIN_USERNAME=adminInPrep2013 # Optional (uses default if not set)
ADMIN_PASSWORD=InterP!Web26#Ops@ # Optional (uses default if not set)
SESSION_SECRET=your-secret-key  # Optional (generates default if not set)
\`\`\`

### Integration Setup
1. **Neon**: Connect your Neon database via Vercel integration panel
2. **Blob**: Connect your Vercel Blob storage via integration panel
3. Environment variables are automatically added to your project

## File Structure

\`\`\`
/app/api/
  /auth/
    login/route.ts         # POST login handler
    logout/route.ts        # POST logout handler
    me/route.ts            # GET auth status
  /posts/
    route.ts               # GET/POST posts list
    [id]/
      route.ts             # GET post detail + view increment
      like/route.ts        # POST like endpoint
  /uploads/
    image/route.ts         # POST image upload to Blob

/app/board/
  page.tsx                 # Server page wrapper
  client.tsx               # Main board component

/components/board/
  rich-editor.tsx          # TipTap editor
  login-modal.tsx          # Login form
  write-modal.tsx          # Post creation
  post-detail-modal.tsx    # Post viewer

/lib/
  db.ts                    # Neon database utilities
  auth.ts                  # Session management
\`\`\`

## Features

### For Visitors
✅ View all posts sorted by latest, recommended, views, or updated date  
✅ Click posts to view full content with images  
✅ Automatic view counting  
✅ Responsive design matching existing SAT page  
✅ YouTube section and entrance animations preserved  

### For Admins
✅ Secure httpOnly session authentication  
✅ Rich text editor with formatting toolbar  
✅ Drag-and-drop image uploads to Vercel Blob  
✅ Automatic HTML sanitization  
✅ Post creation with metadata (author, date, view count)  
✅ Session logout  

## Security Features

1. **Password Protection**: Credentials validated server-side only, never exposed to client
2. **Session Tokens**: httpOnly cookies prevent XSS attacks
3. **CSRF Protection**: sameSite=lax cookie setting
4. **SQL Injection Prevention**: Parameterized queries via Neon
5. **Image Security**: Uploaded images scanned and stored in Vercel Blob
6. **Admin Validation**: All sensitive endpoints require valid session cookie

## Database Schema

\`\`\`sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_html TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Interprep',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  views INT DEFAULT 0,
  likes INT DEFAULT 0
);

CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_views ON posts(views DESC);
\`\`\`

## How to Use

### Starting the App
\`\`\`bash
npm run dev
\`\`\`

The database tables will be automatically created on the first API request.

### Admin Login Flow
1. Click "로그인" button
2. Enter credentials (default: `adminInPrep2013` / `InterP!Web26#Ops@`)
3. Session is stored in httpOnly cookie (24-hour expiry)
4. "글쓰기" button appears for authenticated admins

### Creating a Post
1. Click "글쓰기" button (admin only)
2. Enter title
3. Write content using rich editor
4. Click image button to upload images from computer
5. Click "발행" to publish
6. New post appears at top of list immediately

### Viewing Posts
1. Click any row to open post detail modal
2. Post views increment automatically (first time only)
3. Full HTML content with images displays responsively
4. Click X or outside modal to close

## Deployment Notes

- Database migrations run automatically on first deployment
- No manual SQL setup required
- Vercel Blob URLs are public and permanent
- Session cookies set as secure in production (HTTPS only)
- All secrets stored in Vercel environment variables

## Optional Enhancements

The following are ready for implementation:
- Like button UI (POST `/api/posts/[id]/like` exists)
- Draft saving with `임시저장` button
- Post editing/deletion for admins
- Comment system
- Search functionality
- Rich media embeds (YouTube, etc.)
