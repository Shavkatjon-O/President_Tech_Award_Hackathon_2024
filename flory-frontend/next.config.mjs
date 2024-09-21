/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flory.goodjob.uz",
      },
    ],
  },
};

export default nextConfig;
