/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Pinapayagan natin ang Unsplash images
      },
    ],
  },
};

export default nextConfig;
