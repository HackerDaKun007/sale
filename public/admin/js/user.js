    layui.use(['form', 'layer', 'table'], function() {
    var layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        table = layui.table;

        //提交地址
        var public_url = $.Public.url + 'user/';

        var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 
        , cols: [[
            {field: 'user_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', minWidth:180, title: '用户名称'}
            , {field: 'member_user', width: 160, title: '会员名称'}
            , {field: 'sex', width: 80, title: '性别', toolbar:'#sex'}
            , {field: 'tel', width: 130, title: '手机号码', toolbar:'#tel'}
            , {field: 'initial_pass', width: 150, title: '初始密码', toolbar:'#initial_pass'}
            , {field: 'create_time', width: 170, title: '添加时间'}
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

    //添加
    $('.add').bind('click', function() {
        let add_url = public_url + 'add.html';
        layer.confirm('确定要创建新用户么?', {icon:3,title:'提示'}, function(index) {
            $.Public.post({
                type: 'post',
                url: add_url,
                data: '',
                success: function(msg) {
                    $.Public.locationHref();
                }
            })
        })
    })

    //编辑/删除
    table.on('tool(content)',function(obj) {
        let data = obj.data;
        if(obj.event == 'edit') { //修改密码
            let add_url = public_url + 'editpassw.html';
            $.Public.yzPost({
                type:'post',
                url:add_url,
                data:'',
                success:function() {
                    layer.open({
                        title: '修改密码'
                        , type: 1
                        , area: ['400px', '300px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">'+
                            '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                            '<input name="user_id" type="hidden" value="'+data.user_id+'" />' +
                            '  <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">密码</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="password" name="password" autocomplete="off" placeholder="请输入密码" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '  <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">确定密码</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="password" name="ropassword" autocomplete="off" placeholder="请输入确定密码" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即修改</button>\n' +
                            '    </div>\n' +
                            '</form>'+
                            '</div>' 
                        })
                }
            })
        }else if(obj.event == 'del') { //删除
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {user_id:data.user_id},
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
        $.Public.post({
            type:'post',
            url: action,
            data: field,
            success: function() {
                layer.closeAll();
                $.Public.locationHref();
            },
        });
        return false;
    });

})