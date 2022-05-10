const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
});

const devConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  entry: resolve(__dirname, './src/index.tsx'),
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js'
  },
  plugins: [htmlPlugin],
};

module.exports = devConfig;
