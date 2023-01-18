/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "media.printables.com",
            },
            {
                hostname: "scontent-tpe1-1.xx.fbcdn.net",
            },
        ],
    },
};
