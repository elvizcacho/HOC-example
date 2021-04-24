const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const polyfills = ['core-js/stable', 'whatwg-fetch']

module.exports = {
    entry: [...polyfills, './src/index.tsx'],
    module: {
        rules: [
            {
                test: /\.(ttf|woff2?|jpe?g|png|gif|ico|svg)$/,
                use: 'file-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                loader: 'ts-loader',
                options: {
                    // disable type checker - we will use it in fork plugin
                    transpileOnly: true,
                },
                test: /\.tsx?$/,
            },
        ],
    },
    output: {
        filename: 'bundle.min.js',
        path: path.join(__dirname, '../dist'),
    },
    plugins: [new ForkTsCheckerWebpackPlugin()],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            // This plugin is generating aliases from the tsconfig paths.
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json'),
            }),
        ],
    },
}
