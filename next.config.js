/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "admin",
    mongodb_password: "b9wb6ROIp6GduVYy",
    mongodb_clustername: "cluster0",
    mongodb_database: "dev-database",
  },
};

module.exports = nextConfig;
