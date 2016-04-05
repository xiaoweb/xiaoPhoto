/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:22 */

module.exports = function *(next){
    this.session.test = '小小WEB';
    this.body = this.res.render("index",{val:this.session.test})
}
