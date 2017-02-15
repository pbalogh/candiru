var path = require('path');
var webpack = require('webpack');

 module.exports = {
entry: [
    './js/boolius.js',
    './js/visualizer.js'
],
output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'boolius.bundle.js',
    publicPath: "/build/js"
},
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
