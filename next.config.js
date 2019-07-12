const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const config = require('./config.json');
const path = require('path')
let nextConfig = {};


nextConfig = withSass({
  // cssModules:true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname,'./src/style/variables.scss'),
            path.resolve(__dirname,'./src/style/basic/variables.scss'),
          ],
        },
      },
    });
    return config;
  },
});

nextConfig = withTypescript(nextConfig);
// const nextConfig = withTypescript(withSass({
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
//       use: {
//         loader: 'url-loader',
//         options: {
//           limit: 100000,
//         },
//       },
//     });
//     return config;
//   },
// }));


nextConfig.distDir = '../.next';
nextConfig.publicRuntimeConfig = config;

module.exports = nextConfig;