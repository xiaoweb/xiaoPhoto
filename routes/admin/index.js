/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/22 * Time: 14:32 */
module.exports = function*(next){
    if(!this.session.user){
        this.redirect('/login')
    }else{
        this.body = this.res.render('admin/index',{test:123})
    }
}
