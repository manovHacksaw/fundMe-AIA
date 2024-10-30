/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.youtube.com",
      "localhost",
      "github.com",
      "images.unsplash.com",
      "via.placeholder.com",
      "plus.unsplash.com"
    ], // Add other domains if necessary
  },
};

export default nextConfig;
