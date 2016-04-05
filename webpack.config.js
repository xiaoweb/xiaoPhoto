/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/25 * Time: 11:57 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        //管理后台
        app: ['./React/admin/app.js']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[hash].block.js',
        path: path.resolve(__dirname, 'public/js/admin'),
        publicPath: '/js/admin/'
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'React/admin')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname),
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
                cacheDirectory: true
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}



