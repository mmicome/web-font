const path = require('path');
// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './app/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
                // test 符合此正则规则的文件，运用 loader 去进行处理，除了exclude 中指定的内容
            },
            {
                // 使用正则去匹配要用该loader转换的css文件
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({
                    // 转换 .css文件需要使用的Loader
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        // modules: ['plugin', 'js']
    },
    externals: {
        jquery: 'jQuery'
    },
    devtool: 'source-map',
    plugins: [
        // new ClearWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            // 从js文件中提取出来的 .css文件的名称
            filename: `main.css`
        })
    ],
    mode: 'development'
};