import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This allows the app to run at http://54.154.74.37/dashboard */
  basePath: '/dashboard',
  
  // Optional: If you use images from your own public folder, 
  // they will now be at /dashboard/image.png
};

export default nextConfig;