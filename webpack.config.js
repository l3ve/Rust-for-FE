const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
    entry: './core/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'core/index.html'),
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '.')
            // outDir: path.resolve(__dirname, 'dist', 'pkg'),
        }),
        // Have this example work in Edge which doesn't ship `TextEncoder` or
        // `TextDecoder` at this time.
        // new webpack.ProvidePlugin({
        //     TextDecoder: ['text-encoding', 'TextDecoder'],
        //     TextEncoder: ['text-encoding', 'TextEncoder']
        // })
    ],
    experiments: {
        syncWebAssembly: true,
        // topLevelAwait: true,
        // asyncWebAssembly: true,
        // layers: true,
    },
    resolve: {
        alias: {
            '@pkg': path.resolve(__dirname, 'pkg'),
        },
    },
    mode: 'development'
};