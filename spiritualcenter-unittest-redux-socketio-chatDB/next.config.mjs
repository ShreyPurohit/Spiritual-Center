/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/login", permanent: false },
      { source: "/admin", destination: "/admin/userlist", permanent: false },
      {
        source: "/devotee",
        destination: "/devotee/mypayments",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-first-buckett-lol.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
