const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // Entry files
    entry: {
        main: [
            path.resolve(__dirname, "../src/ts/index.ts"),
            path.resolve(__dirname, "../src/scss/main.scss")
        ],
    },

    // Output bundles (location)
    output:
    {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "../dist")
    },

    // File extensions
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    // Stats log
    stats: "errors-only",

    // Loaders
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },

            // Typescript
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },

            // CSS
            {
                test: /\.(c|sc|sa)ss$/,
                use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images",
                        },
                    },
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/fonts",
                        },
                    },
                ]
            },
        ],
    },

    // Plugins
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "../src/assets"),
                noErrorOnMissing: true
            }]
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            minify: true
        }),

        new MiniCSSExtractPlugin(),

        new CssMinimizerPlugin()
    ],
};
