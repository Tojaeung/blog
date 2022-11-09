/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['tojaeung-blog-images.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
