/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT set NEXT_PUBLIC_API_URL here — use .env.local (local) or .env (prod).
  // Config env overrides .env, so it was preventing your .env.local from being used.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
};

export default nextConfig;
