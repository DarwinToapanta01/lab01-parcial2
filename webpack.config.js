const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/espe-app.js', // <--- Importante: vuelve a .js
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // Ya no necesitamos el `resolve.extensions` para .ts
    // resolve: {
    //   extensions: ['.ts', '.js'],
    // },
    module: {
        rules: [
            {
                test: /\.js$/, // Regla para archivos JavaScript
                exclude: /node_modules/,
                // No se necesita loader para transpilar ES2019+ a ES5 si el target es moderno
                // y no usamos Babel. Los decoradores de Lit son soportados en navegadores modernos.
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader', // Re-habilitado para Tailwind CSS
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/css/styles.css', to: 'css/styles.css' },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8000,
        historyApiFallback: true,
    },
    // Mantenemos un target moderno para que LitElement funcione directamente
    target: ['web', 'es2019'],
};