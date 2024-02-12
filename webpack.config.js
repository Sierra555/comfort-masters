const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './assets/js/script.js',
    './assets/style.scss', 
  ],
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devtool: "source-map",
  module: {
    rules: [
      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
};