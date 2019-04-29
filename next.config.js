const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const config = require('./config.json');
const webpack = require('webpack');

function bindEnv(envs) {
  Object.keys(envs).forEach((key) => {
    process.env[key] = envs[key];
  });
}

bindEnv(config);

const nextConfig = withTypescript(withSass({
  webpack(config, options) {
    // config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    // // Do not run type checking twice:
    // if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());
    //
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    return config;
  },
}));


nextConfig.distDir = '../.next';
module.exports = nextConfig;