/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'https://raisinrich.co.in/', 'raisinrich.co.in', 'example.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
