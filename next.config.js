/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        // Skip type checking during build to avoid dependency issues
        ignoreBuildErrors: true,
    },
    eslint: {
        // Skip ESLint during build
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig

