const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            // linting JavaScript files
            {
                test: /\.m?js$/,
                enforce: 'pre',  // Run this on the raw source, before other rules.
                use: {
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        configFile: '.eslintrc.js',
                        cache: true
                    }
                }
            }
        ]
    }
});
