const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = merge(baseConfig, {
    devServer: {
        compress: true,
        // The local filesystem directory where static html files
        // should be placed.
        // Put your main static html page containing the <script> tag
        // here to enjoy 'live-reloading'
        // E.g., if 'contentBase' is '../views', you can
        // put 'index.html' in '../views/main/index.html', and
        // it will be available at the url:
        //   https://localhost:9001/main/index.html
        contentBase: path.resolve(__dirname, './src'),
        // disable host check because of reverse-proxy
        disableHostCheck: true,
        // Can be omitted unless you are using 'docker'
        host: '0.0.0.0',
        port: 9002,
        // This is where webpack-dev-server serves your bundle
        // which is created in memory.
        // To use the in-memory bundle,
        // your <script> 'src' should point to the bundle
        // prefixed with the 'publicPath', e.g.:
        //   <script src='http://localhost:9001/assets/bundle.js'>
        //   </script>
        publicPath: '/',
        // 'Live-reloading' happens when you make changes to code
        // dependency pointed to by 'entry' parameter explained earlier.
        // To make live-reloading happen even when changes are made
        // to the static html pages in 'contentBase', add
        // 'watchContentBase'
        watchContentBase: true,
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify('http://localhost:7000/api'),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Juapp',
        }),
    ],
})
