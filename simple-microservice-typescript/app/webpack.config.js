const path = require('path')
let plugins = []
if (process.env.NODE_ENV !== 'production') {
  const NodemonPlugin = require('nodemon-webpack-plugin')
  plugins.push(
    new NodemonPlugin({
      verbose: true,
      ext: 'js,json',
      ignore: ['*.js.map'],
      watch: path.resolve('./dist'),
      script: path.resolve('./dist/bin/app.js')
    })
  )
}
module.exports = {
  target: 'async-node',
  mode: process.env.NODE_ENV,
  entry: { 'bin/app': path.resolve('./src/handler.ts') },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins
}
