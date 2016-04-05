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
    static = require('koa-static-cache'),
    parse = require('co-body'),
    session = require('koa-session');

//环境 NODE_ENV || development || production
app.env = 'NODE_ENV';

//开发环境
global.env = app.env = 'dev';

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
app.use(static({
    dir: path.join(__dirname, 'public'),
    gzip : true
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

/*//连接数据库
mongoose.connect('mongodb://xiaoweb:1111@ds061701.mongolab.com:61701/xiaoweb', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("连接成功")
    }
});*/

var options = {
    key: fs.readFileSync(__dirname + '/xiaoweb.cn.pem'),
    cert: fs.readFileSync(__dirname + '/xiaoweb.cn.pem')
};

//端口
app.listen(80);
https.createServer(options, app.callback()).listen(443);


//React热替换
if( app.env ==='dev'){
    var webpack = require('webpack');
    var webpackDevServer = require('webpack-dev-server');

    var config = require("./webpack.config.js");

    config.entry.app.unshift("webpack-dev-server/client?https://xiaoweb.cn:8080", "webpack/hot/only-dev-server");
    config.output.publicPath = 'https://xiaoweb.cn:8080/';
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler,{
        hot:true,
        https:true,
        cert: options.cert,
        key: options.key
    });
    devServer.listen(8080);
}



