const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')

module.exports = (env) => {
    const plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['index.*', 'main.*'],
        }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify('https://juanvizcaino.com/api'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            title: 'Juapp',
        }),
        new CompressionPlugin(),
    ]

    if (env && env.analyse) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return merge(baseConfig, {
        output: {
            chunkFilename: '[name].[contenthash].bundle.js',
            filename: '[name].[contenthash].bundle.js',
            path: path.join(__dirname, '../build'),
        },
        plugins,
    })
}
