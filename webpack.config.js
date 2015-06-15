var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/main.js',
        './node_modules/underscore/underscore.js'
    ],
    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'app/')
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "_": "underscore"
        })
    ]
};


