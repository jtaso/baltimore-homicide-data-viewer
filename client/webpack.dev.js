const path = require('path');
// use curly braces to destructure specific function from module
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

// assign environment variable port to variable server port
const SERVER_PORT = process.env.PORT || '8080';
const WEBPACK_HOST = '0.0.0.0';
const WEBPACK_PORT = '8080';

const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',

    devServer: {
        port: WEBPACK_PORT,
        host: WEBPACK_HOST,
        stats: "minimal",
        inline: true,
        noInfo: true,
        compress: true,
        contentBase: path.resolve(__dirname, '/dist'),
        historyApiFallback: true,
        proxy: {
            '/api': {
                'target': `http://server:${SERVER_PORT}`,
                'pathRewrite': {
                    '^/api': ''
                }
            }
        }
    }
};

module.exports = merge(commonConfig, devConfig);