const { override, addLessLoader } = require('customize-cra');
const { name } = require('./package');

const publicPathPlugin = (config, env) => {
  config.output.library = `${name}-[name]`;
  config.output.libraryTarget = 'umd';
  config.output.jsonpFunction = `webpackJsonp_${name}`;
  config.output.globalObject = 'window';

  return config;
}

module.exports = {
  webpack: override(
    publicPathPlugin,
    // add less loader for ant design
    addLessLoader({
      lessOptions: {
        modifyVars: {},
        javascriptEnabled: true,
      }
    })
  ),
  devServer: (configFunction) => {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      config.historyApiFallback = true;
      config.hot = false;
      config.watchContentBase = false;
      config.liveReload = false;

      return config;
    };
  },
}

