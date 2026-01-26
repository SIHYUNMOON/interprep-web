import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdminAuthenticated } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] POST /api/uploads/image - Starting image upload');
    console.log('[v0] BLOB_READ_WRITE_TOKEN exists:', !!process.env.BLOB_READ_WRITE_TOKEN);
    
    const isAdmin = await isAdminAuthenticated();
    console.log('[v0] Is admin authenticated:', isAdmin);
    
    if (!isAdmin) {
      console.warn('[v0] POST /api/uploads/image - Unauthorized attempt');
      return NextResponse.json(
        { error: 'Unauthorized - Please log in first' },
        { status: 401 }
      );
    }

    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      console.warn('[v0] POST /api/uploads/image - Invalid content-type:', contentType);
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.warn('[v0] POST /api/uploads/image - No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      console.warn('[v0] POST /api/uploads/image - Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Supported: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.warn('[v0] POST /api/uploads/image - File too large:', file.size);
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const filename = `board-image-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    console.log('[v0] POST /api/uploads/image - Uploading:', filename, 'Size:', file.size);

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: file.type,
    });

    console.log('[v0] POST /api/uploads/image - Upload successful:', blob.url);

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] POST /api/uploads/image error:', errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to upload image', details: errorMessage },
      { status: 500 }
    );
  }
}
