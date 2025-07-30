/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com']
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /pdfjs-dist/.*?/test/data/05-versions-space.pdf$/,
        use: 'null-loader',
      });
      return config;
    },
};

export default nextConfig;
