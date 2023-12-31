// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;


const config = {
    entry: {
        index: {
            import: "./src_study/js/index.js",
            filename: "js/[fullhash].js"
        },
        sub: {
            import: "./src_study/js/sub.js",
            filename: "js/[chunkhash].js"
        },
        '/404': [
            "/src_study/css/404.scss"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src_study/pages/index.html',
            chunks: ['index'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'subpage/index.html',
            template: 'src_study/pages/subpage.html',
            chunks: ['sub'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src_study/pages/404.html',
            chunks: ['/404'],
        }),

        new MiniCssExtractPlugin(),

        new CopyPlugin({
            patterns: [
                { from: "src_study/assets", to: "assets" },
            ],
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            // {
            //     test: /\.css$/i,
            //     use: [stylesHandler, 'css-loader'],
            // },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [stylesHandler, 'css-loader', 'sass-loader'],
            // },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [stylesHandler, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
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
