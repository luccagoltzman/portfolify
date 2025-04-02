/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['html2pdf.js'],
  webpack: (config, { isServer }) => {
    // Configuração para bibliotecas que devem ser usadas apenas no cliente
    if (isServer) {
      config.externals = [...config.externals, 'html2pdf.js'];
    }
    
    return config;
  },
};

module.exports = nextConfig; 