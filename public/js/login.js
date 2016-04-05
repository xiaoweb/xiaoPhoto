/**
 * Created by zhou on 16/4/4.
 */
define(function () {
    var login = $('#login-box'),
        reg = $('#reg-box');
    $('#reg').click(function () {
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
        regBtn = $('#reg-btn'),
        loginUser = $('#login-user'),
        regUser = $('#reg-user'),
        paws = $('#login-paws'),
        regPaws = $('#reg-paws'),
        regYzm = $('#reg-yzm'),
        emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        mReg = /^1\d{10}$/;
    loginBtn.click(function () {
        var thas = this;
        thas.disabled = true;
        if (loginUser.val() && mReg.test(loginUser.val()) || emailReg.test(loginUser.val())) {
            if(paws.val().length < 6){
                layer.tips('密码不能少于6位', paws, {
                    tips: [2, 'red'],
                    time: 4000
                });
                thas.disabled = false;
                return;
            }
            layer.closeAll();
            $.post('/login',{
                user:loginUser.val(),
                passwd:paws.val()
            },function (data) {
                if(data.code == 200){
                    thas.disabled = false;
                    document.location.href = data.url;
                    return;
                }else if(data.user_err){
                    switch (data.user_err){
                        case 'user':
                            layer.tips(data.msg, loginUser, {
                                tips: [2, 'red'],
                                time: 4000
                            });
                            break;
                        case 'passwd':
                            layer.tips(data.msg, paws, {
                                tips: [2, 'red'],
                                time: 4000
                            });
                            break;
                    }
                }else{
                    console.log(data);
                }
                thas.disabled = false;
            },'json').error(function (err) {
                layer.open({
                    title:err.status,
                    content:err.statusText,
                    icon:2,
                    time:2000
                });
                thas.disabled = false;
            })
        }else{
            layer.tips('帐号填写不正确', loginUser, {
                tips: [2, 'red'],
                time: 4000
            });
            thas.disabled = false;
            return;
        }
    })
    regBtn.click(function () {
        var thas = this;
        thas.disabled = true;
        if (regUser.val() && mReg.test(regUser.val()) || emailReg.test(regUser.val())) {
            if(regPaws.val().length < 6){
                layer.tips('密码不能少于6位', regPaws, {
                    tips: [2, 'red'],
                    time: 4000
                });
                thas.disabled = false;
                return;
            }
            if(regYzm.val().length <6){
                layer.tips('验证码必须填写', regYzm, {
                    tips: [4, 'red'],
                    time: 4000
                });
                thas.disabled = false;
                return;
            }
            layer.closeAll();
            $.post('/reg',{
                user:regUser.val(),
                passwd:regPaws.val(),
                yzm:regYzm.val()
            },function (data) {
                if(data.code == 200){
                    thas.disabled = false;
                    document.location.href = data.url;
                    return;
                }else if(data.user_err){
                    switch (data.user_err){
                        case 'user':
                            layer.tips(data.msg, regUser, {
                                tips: [2, 'red'],
                                time: 4000
                            });
                            break;
                        case 'passwd':
                            layer.tips(data.msg, regPaws, {
                                tips: [2, 'red'],
                                time: 4000
                            });
                            break;
                        case 'yzm':
                            layer.tips(data.msg, regYzm, {
                                tips: [2, 'red'],
                                time: 4000
                            });
                    }
                }else{
                    console.log(data);
                }
                thas.disabled = false;
            },'json').error(function (err) {
                layer.open({
                    title:err.status,
                    content:err.statusText,
                    icon:2,
                    time:2000
                });
                thas.disabled = false;
            });
        }else{
            layer.tips('帐号填写不正确', regUser, {
                tips: [2, 'red'],
                time: 4000
            });
            thas.disabled = false;
            return;
        }
    })
})