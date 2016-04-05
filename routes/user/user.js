/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 0:34 */
var Users = require('../../model/Users');

module.exports = function *(next) {
    var user = new Users({
        age: 20
    });

    var data = yield Users.find().exec();
    if (data) {
        this.body = this.res.render('user/user', {val: data})
    }
}
