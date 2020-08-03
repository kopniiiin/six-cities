const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }, {
        test: /\.(ts|tsx)$/,
        loader: `ts-loader`
      }
    ]
  },
  resolve: {
    extensions: [`.js`, `.ts`, `.tsx`, `json`]
  },
  devtool: `source-map`
};
