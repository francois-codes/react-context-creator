const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: [resolve(__dirname, "./app.js")]
  },
  output: {
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Context example",
      appMountId: "app_container",
      template: resolve(__dirname, "./index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      "react-native$": "react-native-web"
    }
  },
  devServer: {
    contentBase: "./",
    port: process.env.PORT || 4000
  },
  module: {
    rules: [
      {
        test: /.js/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
