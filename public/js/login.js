/**
 * Created by zhou on 16/4/4.
 */
define(function () {
    var login = $('#login-box'),
        reg = $('#reg-box');
    $('#reg').click(function(){
        layer.closeAll();
        login.fadeOut(200);
        reg.fadeIn(200);
    })    
    $('#login').click(function () {
        layer.closeAll();
        login.fadeIn(200);
        reg.fadeOut(200);
    })

    var loginBtn = $('#login-btn'),
        regBtn = $('#reg-btn');
    loginBtn.click(function () {
        layer.msg(3)
        layer.tips('密码不正确','#login-user',{
            tips: [2, 'red'],
              time: 4000
        })
    })
    regBtn.click(function () {
        layer.msg(2)
    })
})