/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:30 */
var index = require('./routes/index'),
    user = require('./routes/user/user'),
    login = require('./routes/user/login'),
    logout = require('./routes/user/logout'),
    video = require('./routes/video');

var videos = require('letvcloud-api');
var http = require('http');


var admin = require('./routes/admin/admin'),
    adminIndex = require('./routes/admin/index'),
    adminTest = require('./routes/admin/test');

function routes(router) {
    //首页
    router.get("/", admin);

    //用户
    router.get("/user", user);

    //登录注册页
    router.all('/login', login);

    //注销登录
    router.get('/logout',logout)

    //后台管理
    router.get(/\/admin\//,admin);       //判断是否登录
    router.get('/admin',adminIndex);    //首页
    router.get('/admin/*',adminIndex);

    //视频更改页
    router.all('/video', video);
    router.post('/video/get_url',function*(){
        var code = videos.getUrl({
            userCode: 'fc9a96c2e6693683723474938115d3b1',
            user_unique: 'suaoebrvbk',
            api: 'video.upload.init',
            video_name: this.request.body.fileName
        })

        var obj = yield new Promise(res=>{
            http.get("http://api.letvcloud.com/open.php"+code, data=> {
                res(data)
            })
        });

        this.body = obj
    })
}


module.exports = routes;

