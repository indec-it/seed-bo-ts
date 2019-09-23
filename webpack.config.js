/* eslint-disable import/no-dynamic-require , @typescript-eslint/explicit-function-return-type, global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const {
    NODE_ENV,
    ENDPOINT,
    AUTH_ENDPOINT,
    AUTH_LOGIN
} = process.env;

const { version } = require('./package.json');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = NODE_ENV;
const devtool = isProduction ? false : 'cheap-module-source-map';

function resolveTsAliases(
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = './'
) {
    const { compilerOptions: { paths } } = require(tsconfigPath) || {};
    const aliases = {};
    if (paths) {
        Object.keys(paths).forEach((item) => {
            const key = item.replace('/*', '');
            const value = path.resolve(webpackConfigBasePath, paths[item][0].replace('/*', ''));

            aliases[key] = value;
        });
    }
    return aliases;
}

module.exports = {
    mode,
    devtool,
    entry: {
        app: isProduction ? './src/app.tsx' : [
            'webpack-hot-middleware/client',
            './src/app.tsx'
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.scss', '.ts', '.tsx'],
        alias: {
            ...resolveTsAliases(),
            'react-native': 'react-native-web'
        }
    },
    output: {
        path: path.join(__dirname, 'public/assets'),
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    /node_modules\/react-native/,
                    /node_modules\/react-router-native/,
                    /node_modules\/@indec/
                ],
                loader: 'babel-loader',
                query: isProduction ? false : { cacheDirectory: '.babel-cache' }
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: isProduction ? [] : ['react-hot-loader/babel'],
                            cacheDirectory: isProduction ? '' : '.babel-cache',
                            presets: [
                                ['@babel/preset-env', { loose: true, modules: false }],
                                '@babel/react'
                            ],
                            sourceType: 'unambiguous'
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            logLevel: 'debug',
                            transpileOnly: true,
                            reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts']
                        }
                    }
                ]
            }, {
                test: /\.s?css$/,
                use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, {
                test: /\.css$/,
                use: ['css-hot-loader', 'style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
                ]
            }

        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: isProduction ? [new UglifyJsPlugin()] : []
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            VERSION: JSON.stringify(version),
            ENDPOINT: JSON.stringify(ENDPOINT),
            AUTH_ENDPOINT: JSON.stringify(AUTH_ENDPOINT),
            AUTH_LOGIN: JSON.stringify(AUTH_LOGIN)
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
};
