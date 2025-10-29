/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Enable proper type checking and linting for production builds
    typescript: {
        // Only ignore build errors in development if needed
        ignoreBuildErrors: process.env.NODE_ENV === 'development',
    },
    eslint: {
        // Only ignore ESLint during builds in development
        ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    },
    // Disable problematic features for static export
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig

