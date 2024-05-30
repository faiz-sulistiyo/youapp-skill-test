/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        YOUAPP_API_URL: process.env.YOUAPP_API_URL,
      },
}

module.exports = nextConfig
