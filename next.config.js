/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CMS_API_TOKEN: process.env.CMS_API_TOKEN,
      },
}

module.exports = nextConfig
