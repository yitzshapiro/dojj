const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    popup: './src/popup/index.ts',
    background: './src/background/index.ts',
    contentScript: './src/content/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'cheap-module-source-map' // Change this line for different environments
};
