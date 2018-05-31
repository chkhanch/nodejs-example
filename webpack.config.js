'use strict';

const path = require('path');

module.exports = {
    resolve: {
        extensions: [".js"],
        modules: [path.resolve(__dirname, "src/"), "node_modules"]
    },
    entry: {
        'NeverSite/public/js/main': './NeverSite/src/js/index.js',
        'NeverSite/public/js/calculator': './NeverSite/src/js/gear.js',
        'NeverSite/public/js/logs': './NeverSite/src/js/logs.js',
        'NeverSite/public/js/simulator': './NeverSite/src/js/simulator.js',
        'NeverSite/public/js/account': './NeverSite/src/js/account.js',
        'NeverSite/public/js/videos': './NeverSite/src/js/videos.js',
        'NeverSite/public/js/news': './NeverSite/src/js/news.js',
        'admin/js/index': './admin/src/index.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 100
    },
    mode: 'development'
}