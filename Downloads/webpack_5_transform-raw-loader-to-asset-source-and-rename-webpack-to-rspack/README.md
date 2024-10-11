Rspack implements Webpack 5's Asset Modules, using asset modules to replace raw-loader to 'asset/source' for better performance.

### Before

```ts
module.exports = {
  module: {
    rules: [{
      use: ['raw-loader'],
    }, ],
  },
};
```

### After

```ts
module.exports = {
  module: {
    rules: [{
      type: 'asset/source',
    }, ],
  },
};
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      use: 'raw-loader',
    });
    return config;
  },
};
```

### After

```ts
const nextConfig = {
  rspack: (config) => {
    config.module.rules.push({
      type: 'asset/source',
    });
    return config;
  },
};
```

