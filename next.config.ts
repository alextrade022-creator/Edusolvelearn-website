import type { NextConfig } from 'next';

// Hostinger Premium only serves static files, so the whole site is exported to
// plain HTML at build time. Next's built-in image optimiser needs a server, so
// `next-image-export-optimizer` generates the resized WebP files during the
// build instead (it runs after `next build`, see the build script).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline the (small, ~11 KB gzipped) stylesheet into each page: removes a
  // render-blocking request and speeds up first paint on mobile networks.
  experimental: { inlineCss: true },
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    // Only YouTube thumbnails are loaded from another host; nothing else is allowed.
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0',
  },
};

export default nextConfig;
