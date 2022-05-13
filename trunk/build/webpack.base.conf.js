const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['ejs-loader', 'extract-loader', 'html-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                return [
                                    require('postcss-import'),
                                    require('precss'),
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                presets: ["@babel/preset-env", "@babel/preset-react"], 
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'images/[hash]-[name].[ext]',
                      },
                    },
                  ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[contenthash].[ext]'
                }
            }
        ]
    }
};