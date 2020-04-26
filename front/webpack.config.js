module.exports = {
  devtool: 'source-map',
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.sass$/,
        loader: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + '/dist/',
    publicPath: '/dist/'
  }
}
