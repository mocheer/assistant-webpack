/**
 * @author gyb(mocheer)
 * @email mocheer@foxmail.com  
 * @param date 2017.3.15
 */
const webpack = require('webpack')
const assistant = require('assistant-webpack')
const path = require('path')
const env = process.env
//
const packageJSON = assistant.PackageJSON;
// plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CombinePlugin =  assistant.CombinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const BannerPlugin = webpack.BannerPlugin
const NoErrorsPlugin = webpack.NoErrorsPlugin
// plugins
var plugins = [
    new BannerPlugin(packageJSON.toBanner()),
    new NoErrorsPlugin(),
    // new CombinePlugin()
]
//dist
var dist = 'dev/';
var entry = './index.js',
//task
switch (env.task) {
    //开发环境
    case 'dev':
        plugins.push(
            new HtmlWebpackPlugin({
                cache: true
            })
        )
        break;
    //生产环境
    case 'build':
        dist = 'build/'
        plugins.push(
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
        break;
}
//
//
module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname,dist),
        filename: packageJSON.name
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: plugins
}