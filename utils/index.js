/**
 * Created by zhouliying1 on 2016/4/8.
 */
var crypto = require('crypto');

module.exports = {
    hmac(key,SecretKey){
        return crypto.createHmac('sha1', SecretKey).update(key).digest().toString('hex');
    },
    md5(key){
        return crypto.createHash('md5').update(key).digest().toString('hex');
    }
}