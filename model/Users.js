/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/12/26 * Time: 22:03 */
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var UserSchema = new Schema({
    email : String,
    pwd : String,
    name : String,
    age : String,
    time : Date
});

var User = mongoose.model("users",UserSchema);

module.exports = User;