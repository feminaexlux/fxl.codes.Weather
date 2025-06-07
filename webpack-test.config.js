const path = require("path");
const glob = require("glob");

module.exports = {
    entry: glob.sync("spec/**/*Spec.js?(x)"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    output: {
        filename: "test.js",
        path: path.resolve(__dirname, "www"),
    },
};