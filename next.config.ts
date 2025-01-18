import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/**/*': ['./node_modules/@libsql/**/*', './drizzle/**/*'],
  },
};

export default nextConfig;
