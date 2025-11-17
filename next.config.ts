import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'placehold.co',
      'cyoiboldmazqltjboafp.supabase.co',
    ],
  },
};

export default nextConfig;
