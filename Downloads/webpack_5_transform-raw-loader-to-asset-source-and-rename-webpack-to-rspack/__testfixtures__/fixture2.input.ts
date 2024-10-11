const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      use: 'raw-loader',
    });
    return config;
  },
};