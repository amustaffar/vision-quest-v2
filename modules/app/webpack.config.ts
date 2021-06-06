import * as path from 'path'
import * as webpack from 'webpack'
import * as devServer from 'webpack-dev-server'
import HTMLWebpackPlugin from 'html-webpack-plugin'

type Config
  = webpack.Configuration
  & { devServer: devServer.Configuration }

const DIST = path.resolve(__dirname, 'dist')

export default (): Config => ({
  resolve: { extensions: ['.tsx', '.ts', '.js', '.json'] },
  entry: './src/render.tsx',
  target: 'web',
  devtool: 'source-map',
  plugins: [new HTMLWebpackPlugin({ template: 'index.ejs' })],
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
