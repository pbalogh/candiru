var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: ["./src/boolius.js", "./src/xmlius.js", "./src/mathius.js", "./src/visualizer.js"],
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "boolius.bundle.js",
    publicPath: "/build/js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
};
