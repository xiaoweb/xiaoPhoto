/**
 * Created by zhouliying1 on 2016/4/5.
 */
var User = require('../../model/Users'),
    utils = require('../../utils');

module.exports = function *(next) {
    if (this.method == 'POST') {
        var body = this.request.body;
        if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(body.user) || /^1\d{10}$/.test(body.user) && body.passwd.length >= 6) {
            var user = new User({
                user: body.user,
                passwd: body.passwd,
                path: utils.md5(body.user)
            });
            var data = yield User.find({user: body.user}).exec();
            if (data.length > 0) {
                this.body = {
                    user_err: 'user',
                    msg: '帐号已存在'
                }
            } else {
                var save = yield new Promise(res=> {
                    user.save((err, data)=> {
                        res(data)
                    })
                });
                if (save) {
                    this.session.user = save.user;
                    this.session.path = save.path;
                    this.body = {
                        code: 200,
                        url: './'
                    }
                }
            }
        }

    }
}