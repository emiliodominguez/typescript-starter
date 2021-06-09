const path = require("path");
const chalk = require("chalk");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = (_, options) => {
    const devMode = typeof options.mode !== "undefined" && options.mode === "development";
    const hex = devMode ? "#F6BE00" : "#30CED8";

    console.log(chalk.bold.hex(hex)(`Starting Webpack on ${options.mode} mode`));

    return {
        // Entry files
        entry: {
            main: ["./src/ts/index.ts", "./src/scss/main.scss"],
        },

        // Output bundles (location)
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
        },

        // File resolutions
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },

        // Watch mode
        watch: devMode,
        watchOptions: {
            ignored: /node_modules/,
        },

        // Stats log
        stats: "errors-only",

        // Loaders
        module: {
            rules: [
                // Typescript
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                sourceMap: devMode,
                            },
                        },
                    },
                },

                // CSS
                {
                    test: /\.(c|sc|sa)ss$/,
                    use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets/images/",
                            },
                        },
                    ],
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets/fonts/",
                            },
                        },
                    ],
                },
            ],
        },

        // Plugins
        plugins: [
            new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, "./src/assets") }] }),
            new MiniCSSExtractPlugin({ filename: "bundle.css" }),
            new ProgressBarPlugin(),
        ],
    };
};
