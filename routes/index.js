/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:22 */

module.exports = function *(next){
    if(this.session.user){
        this.body = this.res.render("admin/index",{val:this.session.user})
    }else{
        this.redirect('/login')
    }
}
