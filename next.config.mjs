/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopack: false,
  },
  // IMPORTANT: Static sitemap and robots.txt files in /public/
  // These are served directly and MUST NOT be rewritten, redirected, or blocked
  // by middleware, rewrites, or any route handlers.
  // Routes used:
  // - /robots.txt → /public/robots.txt
  // - /sitemap.xml → /public/sitemap.xml
  // - /sitemap-pages.xml → /public/sitemap-pages.xml
  // - /sitemap-board.xml → /public/sitemap-board.xml
  //
  // No dynamic route handlers (no app/sitemap.ts, etc.)
  // Ensure middleware.ts excludes these paths with config.matcher
}

export default nextConfig

