var path = require('path');

module.exports = {
    entry: './app/main.js',
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
    }
};


