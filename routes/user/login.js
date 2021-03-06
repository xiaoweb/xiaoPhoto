/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 1:01 */
var User =  require('../../model/Users');
module.exports = function*(next) {
    if(this.method == 'GET'){
        this.body = this.request.res.render('user/login', {model:[staticUrl+'/js/login.js']})
    }else{
        var data = yield User.find({
            user:this.request.body.user
        }).exec();
        if(data.length <= 0){
            this.body = {
                user_err:'user',
                msg:'帐号不存在'
            }
        }else{
            var data = yield User.find({
                user:this.request.body.user,
                passwd:this.request.body.passwd
            }).exec();
            if(data.length <= 0){
                this.body = {
                    user_err:'passwd',
                    msg:'密码错误'
                }
            }else{
                this.session.user = data[0].user;
                this.session.path = data[0].path;
                this.body = {
                    code:200,
                    url:'./'
                }
            }
        }
    }
}