const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'production',
  entry: {
    'index': './src/index.ts',
  },
  output: {
    filename: 'clever-date.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'CleverDate'
  },
  resolve: {
    extensions: ['.ts', '.d.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    writeToDisk: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    open: true,
    openPage: 'example/',
    onListening: (server) => {
      const port = server.listeningApp.address().port;
      console.info("\n\nGo to => http://localhost:"+port+"/example/\n");
    }
  },
};

module.exports = [config];
