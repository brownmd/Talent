/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const CSP = [
    "default-src 'self'",
    "script-src 'self' 'sha256-SybvIg0tjqXTvIQ4v9e22JAwSyYO2yklVSWqSOwIYO0=' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join("; ");

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
    },
    experimental: {
        optimizePackageImports: ["date-fns"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "X-DNS-Prefetch-Control", value: "on" },
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
                    { key: "Content-Security-Policy", value: CSP },
                ],
            },
            {
                source: "/images/(.*)",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
            {
                source: "/(favicon.*|android-chrome.*|apple-touch-icon.*|mstile.*|logo.*)",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/projects/AI%20Talent%20Operator%20Operating%20System",
                destination: "/projects/ai-powered-talent-operator-operating-system",
                permanent: true,
            },
            {
                source: "/projects/AI-Talent-Operator-Operating-System",
                destination: "/projects/ai-powered-talent-operator-operating-system",
                permanent: true,
            },
        ];
    },
};

module.exports = withContentlayer(nextConfig);
