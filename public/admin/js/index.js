layui.use(['element', 'layer', 'form'], function(){
    var element = layui.element;
    var form = layui.form;
    var layer = layui.layer;
    //宽度
    var win = $(window);

    // layer.load(2);
    // $.Public.load_tips();
    // $.Public.load_tips_error();
    //相关属性
    var layui_logo = $('.layui-logo');
    var layui_left = $('.layui-layout-left');
    var layui_side = $('.layui-side');
    var column_right = $('.column-right');
    var column_right_i = $('.column-right i');
    var layui_body = $('.layui-body');
    var layui_backdrop = $('.backdrop-992');
    //切换左右栏目
    column_right.on('click', function() {
        let width = win.width();
        if(width <= 992) {
            layui_backdrop.css('display', 'block');
            column('0', 0, 0, 'layui-icon-spread-left', 'layui-icon-shrink-right', 0);
        }else {
            if(column_right_i.is('.layui-icon-spread-left')) {
                column('-220px', 0, '-220px', 'layui-icon-shrink-right', 'layui-icon-spread-left', 0);
            }else {
                column(0, '220px', 0, 'layui-icon-spread-left', 'layui-icon-shrink-right', '220px');
            }
        }
    });

    layui_backdrop.on('click', function() {
        layui_backdrop.css('display', 'none');
        column('-220px', 0, '-220px', 'layui-icon-shrink-right', 'layui-icon-spread-left', 0);
    });

    win.resize(function() {
        monitorWidth();
    });
    monitorWidth();
    function monitorWidth() {
        //屏幕小于992px
        let width = win.width();
        if(width <= 992) {
            column('-220px', 0, '-220px', 'layui-icon-shrink-right', 'layui-icon-spread-left', 0);
        }else {
            layui_backdrop.css('display', 'none');
            column(0, '220px', 0, 'layui-icon-spread-left', 'layui-icon-shrink-right', '220px');
        }
    }

    //封装栏目切换
    function column(logo, left, side, class_add, class_remove, body) {
        layui_logo.stop().animate({left:logo}, 240);
        layui_left.stop().animate({left:left}, 240);
        layui_side.stop().animate({left:side}, 240);
        column_right_i.addClass(class_add);
        column_right_i.removeClass(class_remove);
        layui_body.stop().animate({left:body}, 240);
    }


    //刷新页面
    $('.refresh').on('click',function()
    {
        $.Public.locationHref();
    });

    //获取url
    $.Public.locationHref();

    //后退控制
    window.addEventListener('popstate',function(res){
        // var orderStatus = history.state();
        let shortURL = window.location.href.split('#');
        if($.Public.values(shortURL[1])){
            $('.layui-column .layui-this').removeClass('layui-this');
            $.Public.bodyUrl(shortURL[1]);
            $.Public.columnChoice();
        }
    });
    $.Public.columnUrl();
    $.Public.columnChoice();
    //注销
    $('.logout').on('click',function(){
        layer.confirm('确定要注销么？',{icon:3},function(){
            let load = layer.load(2);
            $.ajax({
                type:'post',
                url:$.Public.url + 'index/logout.html',
                data:{},
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("addDate", '2');
                },
                success: function(msg) {
                    layer.close(load);
                    let data = JSON.parse(msg);
                    if(data.code == 1){
                        layer.msg(data.msg, {icon:1, time:1000}, function () {
                            window.location.href = data.url;
                        });
                    }else {
                        layer.msg(data.msg, {icon:2, time:1000});
                    }
                },
                error: function(msg){
                    layer.close(load);
                    layer.msg('当前服务器异常，请联系技术员！',{icon:2,time:1000});
                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                    if(status=='timeout'){//超时,status还有success,error等值的情况
                        layer.close(load);
                        data = 500;
                        ajaxTimeoutTest.abort();
                        layer.msg('服务器请求超时，请稍后再操作！',{icon:2,time:1000});
                    }
                }
            });
        });
        return false;
    });

    var personalDom = $('#personal').html();
    if(personalDom != '') {
        personalDom = JSON.parse(personalDom);
    }
    var personal = $('.index-personal'); //个人信息修改
    personal.eq(0).on('click', function() {
        let $this = $(this);
        let url = '/admin/index/personal.html';
        $.Public.yzPost({
            type: 'post',
            url: url,
            data: '',
            success:function () {
                layer.open({
                    title: '基本资料'
                    , type: 1
                    , area: ['400px', '400px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">姓名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" value="'+$.Public.values(personalDom.name)+'" name="name" autocomplete="off" placeholder="请输入姓名(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">性别</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="sex" value="1" title="男" '+$.Public.checked(personalDom.sex, 1)+'>\n' +
                        '      <input type="radio" name="sex" value="2" title="女" '+$.Public.checked(personalDom.sex, 2)+'>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">手机号</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="number" value="'+$.Public.values(personalDom.tei)+'" maxlength="11" max="11" name="tei" autocomplete="off" placeholder="请输入手机号(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">邮件</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="mail" value="'+$.Public.values(personalDom.mail)+'" autocomplete="off" placeholder="请输入邮件(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="indexSubmit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                })
                form.render();
            }
        })

        return false;
    });

    //修改个人密码
    personal.eq(1).on('click', function() {
        let $this = $(this);
        let url = '/admin/index/pass.html';
        $.Public.yzPost({
            type: 'post',
            url: url,
            data: '',
            success:function () {
                layer.open({
                    title: '修改密码'
                    , type: 1
                    , area: ['400px', '350px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">旧密码</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="password"  name="oldpass" autocomplete="off" placeholder="请输入旧密码" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">新密码</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="password"  name="password" autocomplete="off" placeholder="请输入新密码" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">新密码</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="password"  name="repassword" autocomplete="off" placeholder="请输入新密码" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="indexSubmit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                })
                form.render();
            }
        })

        return false;
    });

    //监听提交
    form.on('submit(indexSubmit)', function(data){
        var action = data.form.action;
        var field = data.field;
        $.Public.post({
            type:'post',
            url: action,
            data: field,
            success: function() {
                layer.closeAll();
            },
        });
        return false;
    });

});