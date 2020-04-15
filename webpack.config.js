const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require( 'path' );
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: './dist',
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                },  
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }],
            },
            {
                test: [/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, /\.html$/],
                use: [{
                    loader: 'file-loader'
                }],
            }
        ]   
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
        include: /\.min\.js$/
    })]
    },
};