layui.use(['form', 'layer', 'table', 'upload'], function() {
    var layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'category/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'category_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', title: '类别名称'}
            , {field: 'sort', width: 120, title: '排序'}
            , {field: 'create_time', width: 200, title: '添加时间'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 180}
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
        $.Public.yzPost({
            type:'post',
            url:add_url,
            data:'',
            success:function () {
                layer.open({
                    title: '添加类别名'
                    , type: 1
                    , area: ['400px', '300px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">类别名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" autocomplete="off" placeholder="请输入类别名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="number" value="10" name="sort" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +

                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                })
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
                        title: '修改类别名称'
                        , type: 1
                        , area: ['400px', '300px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                            '<input name="category_id" type="hidden" value="'+data.category_id+'" />' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">类别名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text"  value="'+data.username+'" name="username" autocomplete="off" placeholder="请输入类别名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">排序</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number"  value="'+data.sort+'" name="sort" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +

                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>'
                    })
                }
            });
        }else if(obj.event == 'del') {
            var id = data.category_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {category_id:id},
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