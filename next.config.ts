// import type { NextConfig } from 'next'
// import withNextIntl from 'next-intl/plugin'

// const nextConfig: NextConfig = withNextIntl()({
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'utfs.io',
//         port: '',
//       },
//     ],
//   },
// })

// export default nextConfig
import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = withNextIntl()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  experimental: {
    esmExternals: true, // ESM modules support
  },
  webpack(config) {
    // .md ফাইল handle করার জন্য
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    // UploadThing এর ESM compatibility fix (optional)
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
});

export default nextConfig;
