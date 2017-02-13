var path = require('path');
var webpack = require('webpack');

 module.exports = {
entry: {
    boolius: './js/boolius.js',
},
output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: '[name].bundle.js',
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
