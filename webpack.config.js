const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                  },
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /.(s*)css$/i,
                use: [
                    miniCss.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                          postcssOptions: {
                            plugins: () => [
                              require('autoprefixer')
                            ]
                          }
                        }
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};