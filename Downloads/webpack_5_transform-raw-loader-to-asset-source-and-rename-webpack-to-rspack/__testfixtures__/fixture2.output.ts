const nextConfig = {
  rspack: (config) => {
    config.module.rules.push({
      type: 'asset/source',
    });
    return config;
  },
};