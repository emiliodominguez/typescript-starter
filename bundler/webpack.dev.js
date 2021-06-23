const { merge } = require("webpack-merge");
const path = require("path");
const ip = require("internal-ip");
const chalk = require("chalk");
const portFinderSync = require("portfinder-sync");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const commonConfiguration = require("./webpack.common.js");

module.exports = merge(
    commonConfiguration,
    {
        // Mode
        mode: "development",

        // Dev tools
        devtool: "source-map",

        // Dev server
        devServer:
        {
            host: "0.0.0.0",
            port: portFinderSync.getPort(3000),
            contentBase: path.resolve(__dirname, "../dist"),
            watchContentBase: true,
            open: true,
            https: false,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            noInfo: true,
            after: function (_app, server, _compiler)
            {
                const port = server.options.port;
                const https = server.options.https ? "s" : "";
                const localIp = ip.v4.sync();

                console.clear();
                console.log(`
                    \n${chalk.bold("Project running at:")}
                    \n${`• ${chalk.bold.green(`http${https}://${localIp}:${port}`)}`}
                    \n${`• ${chalk.bold.green(`http${https}://localhost:${port}`)}`}
                `);
            }
        },

        // Plugins
        plugins: [new ProgressBarPlugin()]
    }
);
