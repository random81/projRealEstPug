const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: 'browser',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [path.join(CURRENT_WORKING_DIR, './src/main.js')],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/public'),
        filename: 'js/bundle.js',
        publicPath: '/public/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public/css/',
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './app/views/index.jade',
            filename: '../index.jade',
        }),
        new HtmlWebpackPlugin({
            template: './app/views/404.jade',
            filename: '../404.jade',
        }),
        new HtmlWebpackPugPlugin({
            adjustIndent: true,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            })],
    },
}; module.exports = config;
