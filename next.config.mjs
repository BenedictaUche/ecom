/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.wix.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.wix.com',
        port: '',
        pathname: '/__generated__/images/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
