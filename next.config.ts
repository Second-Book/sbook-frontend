import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: isProd ? "https" : "http",
        hostname: isProd ? "api.sb.maria.rezvov.com" : "127.0.0.1",
        port: isProd ? "" : "8000",
        pathname: "/media/**",
      },
    ],
    unoptimized: false,
  },
  // Redirect removed - homepage is now implemented at "/"
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/textbooks",
  //       permanent: true,
  //     },
  //   ];
  // },
  // Experimental options to help with Bus error
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
