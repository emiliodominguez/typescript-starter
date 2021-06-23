const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(
    commonConfiguration,
    {
        // Mode
        mode: "production",

        // Plugins
        plugins: [new CleanWebpackPlugin()]
    }
);
