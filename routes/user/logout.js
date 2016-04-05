/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/22 * Time: 17:43 */
module.exports = function*(next){
    this.session = null;
    this.redirect('back');
}
