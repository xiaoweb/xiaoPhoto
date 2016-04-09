/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: ‏‎22:19 */
var koa = require('koa'),
    http = require('http'),
    https = require('https'),
    router = require('koa-router')(),
    app = koa(),
    jade = require('jade'),
    routes = require('./routes'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    path = require('path'),
    statics = require('koa-static-cache'),
    parse = require('co-body'),
    session = require('koa-session'),
    webConfig = require('./webConfig');

//环境 NODE_ENV || development || production
app.env = 'NODE_ENV';

//静态服务器
global.staticUrl = global.staticHost = webConfig.staticHost;

//http跳https
app.use(function*(next) {
    if (this.protocol === 'http') {
        this.redirect('https://' + this.host + this.url)
    } else {
        yield next;
    }
})

//日志
app.use(function *(next) {
    var time = new Date();
    yield next;
    var log = time.toLocaleString() + " " + this.ip + " " + this.method + " " + this.host + this.url + " " + this.status + " " + (new Date().getTime() - time.getTime()).toString() + 'ms';
    fs.appendFile(__dirname + '/log/log.log', log + '\n', function (err) {
        err ? console.error(err) : app.env == "development" && console.info(log);
    })
});

//session
app.use(session(app));
app.keys = ['小小web'];

//静态文件服务
app.use(statics({
    dir: path.join(__dirname, 'public'),
    gzip: true
}));

//模板引擎
app.use(function*(next) {
    !this.res.render && (this.res.render = function (template, data) {
        return jade.compileFile(__dirname + '/views/' + template + '.jade', {pretty: false})(data)
    })
    yield next;
})

//post解析
app.use(function*(next) {
    if (this.method === 'POST') {
        try {
            this.request.body = yield parse(this);
        }
        catch (err) {
            if (err.status === 415) {
                this.request.body = {};
            } else {
                throw err
            }
        }
    }
    yield next;
})

//路由
routes(router);
app.use(router.routes());

//连接数据库
mongoose.connect(webConfig.dbType +
    '://' + webConfig.dbUser +
    ':' + webConfig.dbPasswd +
    '@' + webConfig.dbHost +
    ':' + webConfig.dbPort +
    '/' + webConfig.dbName,
    function (err) {
        if (err) {
            throw err;
        } else {
            console.log("mongodb数据库连接成功");
            //连接成功后开始监听服务
            app.listen(80);     //http

            https.createServer({        //https
                key: webConfig.sslPem,
                cert: webConfig.sslPem
            }, app.callback()).listen(443);
        }
    });

//开发环境
if (webConfig.dev) {
    global.env = app.env = 'dev';
    global.staticUrl = '';       //如果是开发环境使用本地静态文件

    //在开发环境中启用webpack-dev-server 热更新功能
    var webpack = require('webpack');
    var webpackDevServer = require('webpack-dev-server');

    var webpackConfig = require("./webpack.config.js");

    webpackConfig.entry.app.unshift("webpack-dev-server/client?" + webConfig.Host + ":8080", "webpack/hot/only-dev-server");
    webpackConfig.output.publicPath = webConfig.Host + ':8080/';
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, {
        hot: true,
        https: true,
        cert: options.cert,
        key: options.key
    });
    devServer.listen(8080);
}


