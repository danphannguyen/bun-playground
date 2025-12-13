import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrite API calls to backend service
  // This allows /api/* requests to be proxied to the backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/:path*`,
      },
    ];
  },

  // For client-side API calls, use NEXT_PUBLIC_API_URL environment variable
  // Default: http://localhost:3001 (development) or http://backend:3001 (Docker)
};

export default nextConfig;
