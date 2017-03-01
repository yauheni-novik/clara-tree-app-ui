module.exports = {
  output: {
    filename: 'bundle.js'
  },

  devtool: 'sourcemap',

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/, loader: 'babel', exclude: [/node_modules/, /\.spec\.js/]
      },
      { test: /\.png$/, loader: 'url-loader?limit=44032' },
      // loaders for font-awesome import
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
};
