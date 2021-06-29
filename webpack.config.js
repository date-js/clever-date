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
    library: {
      name: 'CleverDate',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
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
    host: '0.0.0.0',
    static: [
      path.join(__dirname, 'example'),
    ],
  },
};

module.exports = [config];
