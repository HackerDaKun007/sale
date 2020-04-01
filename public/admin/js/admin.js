layui.use(['form', 'layer', 'table', 'upload'], function() {
    var layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'admin/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'admin_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', minWidth:180, title: '管理员名称'}
            , {field: 'img', width: 140, title: '头像', toolbar: '#img'}
            , {field: 'name', width: 150, title: '姓名'}
            , {field: 'disable', width: 100, title: '启用/禁用', toolbar:'#disable'}
            , {field: 'create_time', width: 200, title: '添加时间'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
        , limit: 10
        , page: true
    });
    //搜索
    form.on('submit(search)',function(data){
        var field = data.field;
        field.request = 200;
        tableIns.reload({
            where:field,
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
        return false;
    });

    //角色
    var role = $('#role').html();
    if(role != '' && role != null) {
        role = JSON.parse(role);
    }
    function actionRole(val = '') {
        let selected = '';
        let _html = '';
        if(role != '' && role != null) {
            role.forEach(function(str) {
                selected = '';
                if(str.role_id == val) {
                    selected = 'selected';
                }
                _html += '<option '+selected+' value="'+str.role_id+'">'+str.username+'</option>';
            });
        }
        return _html;
    }

    var Img = ''; //头像变量

    var ImgUser = '';
    //上传头像
    function uploadImg() {
        var uploadInst = upload.render({
            elem: '.admin-img img'
            ,size:100
            ,url: public_url + 'index.html' //改成您自己的上传接口
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    // $('#demo1').attr('src', result); //图片链接（base64）
                    ImgUser = result;
                });
            }
            ,done: function(res){
                //上传成功
                if(res.code == 1) {
                    layer.msg('上传成功', {icon:1, time:1000});
                    Img = res.data;
                    $('.admin-img img').attr('src', ImgUser);
                }else {
                    //如果上传失败
                    layer.msg(res.msg, {icon:2, time:1000});
                    Img = '';
                }
            }, data:{
                request:201,
            }
        });
    }


    //添加
    $('.add').bind('click', function() {
        let add_url = public_url + 'add.html';
        $.Public.yzPost({
            type:'post',
            url:add_url,
            data:'',
            success:function () {
                layer.open({
                    title: '添加管理员'
                    , type: 1
                    , area: ['400px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<div class="admin-img">' +
                        '   <img src="/admin/img/user.png"/> ' +
                        '</div>' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" autocomplete="off" placeholder="请输入名称, 英文、数字、_、-" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">密码</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="password" name="password" autocomplete="off" placeholder="请输入密码" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">确定密码</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="password" name="repassword" autocomplete="off" placeholder="请输入确定密码" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">角色</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        ' <select name="role_id"><option value="">请选择角色</option>'+actionRole()+'</select>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">\n' +
                        '  <legend>相关个人信息</legend>\n' +
                        '</fieldset>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">姓名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="name" autocomplete="off" placeholder="请输入姓名(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">性别</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="sex" value="1" title="男" checked="">\n' +
                        '      <input type="radio" name="sex" value="2" title="女">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">手机号</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="number" maxlength="11" max="11" name="tei" autocomplete="off" placeholder="请输入手机号(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">邮件</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="mail" autocomplete="off" placeholder="请输入邮件(可填)" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                    ,cancel: function(index, layero){
                        Img = '';
                    }
                })
                uploadImg();
                form.render();
            }
        });
    });

    //编辑/删除
    table.on('tool(content)',function(obj) {
        let data = obj.data;
        if(obj.event == 'edit') {
            let add_url = public_url + 'edit.html';
            $.Public.yzPost({
                type:'post',
                url:add_url,
                data:'',
                success:function () {
                    layer.open({
                        title: '修改管理员'
                        , type: 1
                        , area: ['400px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<div class="admin-img">' +
                            '   <img src="'+data.img+'"/> ' +
                            '</div>' +
                            '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                            '<input name="admin_id" type="hidden" value="'+data.admin_id+'" />' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+data.username+'" name="username" autocomplete="off" placeholder="请输入名称, 英文、数字、_、-" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">密码</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="password" name="password" autocomplete="off" placeholder="请输入密码" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">确定密码</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="password" name="repassword" autocomplete="off" placeholder="请输入确定密码" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">角色</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            ' <select name="role_id"><option value="">请选择角色</option>'+actionRole(data.role_id)+'</select>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">启用/禁用</label>\n' +
                            '    <div class="layui-input-block layui-input public-input-block">\n' +
                            '      <input type="radio" name="disable" value="1" title="启用" '+$.Public.checked(1, data.disable)+' >\n' +
                            '      <input type="radio" name="disable" value="2" title="禁用" '+$.Public.checked(2, data.disable)+'>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">\n' +
                            '  <legend>相关个人信息</legend>\n' +
                            '</fieldset>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">姓名</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+data.name+'" name="name" autocomplete="off" placeholder="请输入姓名(可填)" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">性别</label>\n' +
                            '    <div class="layui-input-block layui-input public-input-block">\n' +
                            '      <input type="radio" name="sex" value="1" title="男" '+$.Public.checked(1, data.sex)+' >\n' +
                            '      <input type="radio" name="sex" value="2" title="女" '+$.Public.checked(2, data.sex)+'>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">手机号</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" value="'+data.tei+'" maxlength="11" max="11" name="tei" autocomplete="off" placeholder="请输入手机号(可填)" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">邮件</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+data.mail+'" name="mail" autocomplete="off" placeholder="请输入邮件(可填)" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>'
                        ,cancel: function(index, layero){
                            Img = '';
                        }
                    })
                    uploadImg();
                    form.render();
                }
            });
        }else if(obj.event == 'del') {
            var id = data.admin_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {admin_id:id},
                    success: function(msg) {
                        $.Public.locationHref();
                    }
                })
            })
        }
    })


    //监听提交
    form.on('submit(submit)', function(data){
        var action = data.form.action;
        var field = data.field;
        field.img = Img; //头像
        $.Public.post({
            type:'post',
            url: action,
            data: field,
            success: function() {
                ImgUser = '';
                Img = '';
                layer.closeAll();
                $.Public.locationHref();
            },
        });
        return false;
    });


})