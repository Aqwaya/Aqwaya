/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

console.log("🚀 NEXT_CONFIG: BasePath is set to /app");

export default nextConfig;