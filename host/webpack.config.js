// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const isProduction = process.env.NODE_ENV == 'production';

const {fetchVueApp, fetchReactApp, fetchSvelteApp} = require('./fetchRemoteApps')

const stylesHandler = 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
            extensions: ['.js', '.json']
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 9000,
    },  
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ModuleFederationPlugin({
            name: 'host',
            library: {type: 'var', name: 'shell'},
            filename: 'remoteEntry.js',
            remotes: {
                vueApp: `promise new Promise(${fetchVueApp.toString()})`,
                reactApp: `promise new Promise(${fetchReactApp.toString()})`,
                svelteApp: `promise new Promise(${fetchSvelteApp.toString()})`
            }
        })
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: '/node_modules/',
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
