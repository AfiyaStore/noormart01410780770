import type { NextConfig } from "next";

/* config options here */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
}
export default nextConfig;

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'utfs.io',
//         port: '',
//       },
//     ],
//   },

//   // Webpack customization to handle .md files (Uploadthing dependency)
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.md$/,
//       type: 'asset/source', // treat README.md as plain source
//     })
//     return config
//   },
// }

// export default nextConfig
