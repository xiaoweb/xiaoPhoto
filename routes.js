/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:30 */
var index = require('./routes/index'),
    user = require('./routes/user/user'),
    login = require('./routes/user/login'),
    reg = require('./routes/user/reg'),
    logout = require('./routes/user/logout'),
    qiniu = require('qiniu'),
    moment = require('moment');

var http = require('http');


var admin = require('./routes/admin/admin'),
    adminIndex = require('./routes/admin/index'),
    qiniuConfig = require('./webConfig');

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
        uptoken.saveKey = this.session.path + "/" + moment().format('YYYYMMDD')+ "/$(etag)$(fname)";
        uptoken.mimeLimit = 'image/*';
        this.body = {"uptoken": uptoken.token()}
    })
    //用户文件列表
    router.post('/list', function *(next) {
        var datas = yield new Promise(reso=> {
            qiniu.rsf.listPrefix('xiaoweb', this.session.path, '', '', function (err, ret, res) {
                if (res.statusCode == 200) {
                    ret.items = ret.items.map(t=> {
                        return {
                            key: t.key
                        }
                    })
                    reso(ret)
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

    //404跳转到首页
    router.get("*", index);

}


module.exports = routes;

