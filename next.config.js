/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'media.printables.com',
      },
      {
        hostname: 'scontent-tpe1-1.xx.fbcdn.net'
      },
    ],
  },
}
