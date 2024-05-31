/** @type {import('next').NextConfig} */


const backendUrlPath = process.env.NEXT_PUBLIC_BACKEND_URL;

module.exports = {
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: `${backendUrlPath}/:path*`
        }
        ]
    }
}