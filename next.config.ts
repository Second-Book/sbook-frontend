import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: isProd ? "http" : "http",
        hostname: isProd ? "api.sb.maria.rezvov.com" : "127.0.0.1",
        port: isProd ? "" : "8000",
        pathname: "/media/__sized__/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/textbooks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
