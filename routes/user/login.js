/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 1:01 */
module.exports = function*(next) {
    if(this.method == 'GET'){
        this.body = this.request.res.render('user/login', {model:['login']})
    }else{
        this.session.user = this.request.body.email;
        this.redirect('/admin')
    }
}