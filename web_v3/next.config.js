/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["yummf.sfo3.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
