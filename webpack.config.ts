import * as path from 'path'
import { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const DIST = path.resolve(__dirname, 'dist/app')

export default (): Configuration => ({
  resolve: { extensions: ['.tsx', '.ts', '.js', '.json'] },
  entry: './app/render.tsx',
  target: 'web',
  devtool: 'source-map',
  plugins: [new HTMLWebpackPlugin({ template: './app/index.ejs' })],
  output: { path: DIST, filename: '[name].js', publicPath: './' },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]
  },

  devServer: {
    contentBase: DIST,
    historyApiFallback: true,
    compress: true,
    hot: false,
    port: 4000,
    publicPath: '/'
  }
})
