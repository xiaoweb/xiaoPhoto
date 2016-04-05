/** * Created with WebStorm. * User: RD-小小WEB * Date: 2016/1/14 * Time: 11:44 */
define(function(){
    var url = document.getElementById('url'),
        submit = document.getElementById('submit');
    $(submit).on('click',function(){
        var th = this;
        if(url.value.length > 10){
            var $btn = $(th).button('loading')
            $.post('',{url:url.value},function(data){
                layer.closeAll();
                layer.msg(data.msg);
                $btn.button('reset');
                url.value = '';
            })
        }else{
            layer.msg('填写不正确');
        }
    })
})
