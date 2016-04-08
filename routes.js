/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:30 */
var index = require('./routes/index'),
    user = require('./routes/user/user'),
    login = require('./routes/user/login'),
    reg = require('./routes/user/reg'),
    logout = require('./routes/user/logout'),
    video = require('./routes/video'),
    qiniu = require('qiniu'),
    utils = require('./utils');

var videos = require('letvcloud-api');
var http = require('http');


var admin = require('./routes/admin/admin'),
    adminIndex = require('./routes/admin/index'),
    qiniuConfig = require('./routes/qiniu.config');

/*生成七牛密钥*/
qiniu.conf.ACCESS_KEY = qiniuConfig.ACCESS_KEY;
qiniu.conf.SECRET_KEY = qiniuConfig.SECRET_KEY;
var client = new qiniu.rs.Client();
var uptoken = new qiniu.rs.PutPolicy(qiniuConfig.Bucket_Name);

function routes(router) {
    //首页
    router.get("/", index);

    //用户
    router.get("/user", user);

    //七牛密钥获取
    router.get('/uptoken', function *(next) {
        uptoken.saveKey = utils.md5(this.session.user) + "/$(etag)$(fname)";
        this.body = {"uptoken": uptoken.token()}
    })
    router.get('/test', function *(next) {
        var datas = yield new Promise(reso=> {
            qiniu.rsf.listPrefix('xiaoweb', utils.md5(this.session.user), '', '', function (err, ret, res) {
                if (res.statusCode == 200) {
                    reso(ret)
                    //console.log(ret);
                } else {
                    reso(err);
                }
            });
        });
        this.body = datas;
    })

    //登录注册页
    router.all('/login', login);
    router.post('/reg', reg);

    //注销登录
    router.get('/logout', logout)

    //后台管理
    router.get(/\/admin\//, admin);       //判断是否登录
    router.get('/admin', adminIndex);    //首页
    router.get('/admin/*', adminIndex);

    //视频更改页
    router.all('/video', video);
    router.post('/video/get_url', function*() {
        var code = videos.getUrl({
            userCode: 'fc9a96c2e6693683723474938115d3b1',
            user_unique: 'suaoebrvbk',
            api: 'video.upload.init',
            video_name: this.request.body.fileName
        })

        var obj = yield new Promise(res=> {
            http.get("http://api.letvcloud.com/open.php" + code, data=> {
                res(data)
            })
        });

        this.body = obj
    })
}


module.exports = routes;

