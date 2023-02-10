/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com"
            },
        ],
    },
};
