/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/:path*",  // Khi FE gọi `/api/...`, nó sẽ được chuyển tiếp sang BE
                destination: "http://localhost:8080/:path*",
            },
        ];
    },
};

export default nextConfig;
