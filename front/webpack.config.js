const path = require('path');
module.exports = {
    devtool:'cheap-module-eval-source-map',//多种选择，选择最适合自己的
    entry:{
        main:__dirname + '/app/main.js',
    },
    output:{
        path: path.resolve(__dirname, "dist"),
        filename:'[name].[id].js',
        publicPath:'/public/'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,  //解析文件类型
                exclude:/node_modules/,  //排除node_modules文件
                loader:'babel-loader', //使用哪种loader解析
                query:{
                    presets:['es2015','stage-0']//loader的配置项，解析es6
                }
            },
            {
                test: /\.(less|css)$/,
                use:[ 'style-loader','css-loader','less-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'img/'
                    }
                  },
                ]
            },
        ]
    },
}