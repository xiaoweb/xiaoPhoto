/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/22 * Time: 14:40 */
module.exports = function*(next){
    if(!this.session.user){
        this.redirect('/login')
    }else{
        yield next;
    }
}
