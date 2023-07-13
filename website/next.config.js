/** @type {import('next').NextConfig} */
const nextConfig = {
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
