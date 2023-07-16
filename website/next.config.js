/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "source.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
