/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración de TypeScript y ESLint
  typescript: {
    // En producción, ignorar errores de archivos fuera del proyecto
    ignoreBuildErrors: process.env.NODE_ENV === 'production' ? false : false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configurar webpack para excluir archivos fuera del proyecto
  webpack: (config, { isServer }) => {
    // Excluir archivos de AppData y otros directorios del sistema del watch
    if (config.watchOptions) {
      config.watchOptions.ignored = [
        ...(Array.isArray(config.watchOptions.ignored) ? config.watchOptions.ignored : []),
        '**/node_modules/**',
        '**/.next/**',
        '**/AppData/**',
        '**/Cursor/**',
        '**/.cursor/**',
      ];
    } else {
      config.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/AppData/**',
          '**/Cursor/**',
          '**/.cursor/**',
        ],
      };
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
