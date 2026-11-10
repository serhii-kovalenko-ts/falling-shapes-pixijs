const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: './src/ts/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: { comments: /@preserve|@license|@cc_on|^!/i },
        },
      }),
    ],
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: 'asset/resource',
        generator: { filename: 'styles/[name][ext]' },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      title: 'PixiJS Test',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
