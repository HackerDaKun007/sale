layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;


    // 自定义验证规则
    form.verify({
        username: function (value) {
            if (value == '') {
                return '用户名称不能为空';
            }
        },
        password: function (value) {
            if (value == '') {
                return '密码不能为空';
            }
        },
        yzm: function (value) {
            if (value.length != 4) {
                return '请输入四位数验证码';
            }
        },
    });

    var username = 'login';
    var yzmUrl = '/admin/login/yzm.html?id=';
    var yzmImg = $('.login-yzm');
    //切换验证码
    yzmImg.click(function(){
        $(this).attr('src', yzmUrl+ (Math.random()*100));
    });
    //监听提交
    form.on('submit(submit)', function (data) {
        var index = layer.load(2);
        $.ajax({
            type: 'post',
            url: '/admin/login/yzadd.html',
            data:data.field,
            timeout: 100000,
            success:function (msg) {
                yzmImg.attr('src', yzmUrl+ (Math.random()*100));
                layer.close(index);
                let data = JSON.parse(msg)
                if(data.code == 1) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = '/admin/index/index.html#/Index/home.html';
                    })
                }else {
                    layer.msg(data.msg,{icon:5,time:1000})
                }
            },error: function(msg){
                yzmImg.attr('src', yzmUrl+ (Math.random()*100));
                layer.close(index);
                layer.msg('当前服务器异常，请联系技术员！',{icon:2,time:1000});
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    layer.close(index);
                    yzmImg.attr('src', yzmUrl+ (Math.random()*100));
                    data = 500;
                    ajaxTimeoutTest.abort();
                    layer.msg('服务器请求超时，请稍后再操作！',{icon:2,time:1000});
                }
            }
        });
        return false;
    });


});