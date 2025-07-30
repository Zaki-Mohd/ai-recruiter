/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com']
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: new RegExp('node_modules/pdfjs-dist/.*test'),
        use: 'null-loader',
      });
      return config;
    },
};

export default nextConfig;
