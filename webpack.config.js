var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/main.js',
        './node_modules/underscore/underscore.js'
    ],
    output: {
        path: './build/',
        filename: 'bundle.js',

    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'app/')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "_": "underscore"
        })
    ]
};


