layui.use(['form', 'layer', 'table', 'upload'], function() {
    var layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'carousel/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'carousel_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', minWidth:180, title: '名称'}
            , {field: 'img', width: 140, title: '图片', toolbar: '#img'}
            , {field: 'sort', width: 150, title: '排序'}
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

    var Img = ''; //头像变量

    var ImgUser = '';
    //上传图片
    function uploadImg() {
        var uploadInst = upload.render({
            elem: '.img'
            ,size:200
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
                    $('.img').attr('src', ImgUser);
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

    $('.add').bind('click', function () {
        let add_url = public_url + 'add.html';
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function () {
                layer.open({
                    title: '添加轮播图'
                    , type: 1
                    , area: ['600px', '470px']
                    , closeBtn: 1
                    , shade: 0.3
                    , zIndex:50
                    , id: 'LA_layer'
                    , moveType: 1
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form " action="'+add_url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">图片</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '<img src="/public/img/back.png" class="img" />' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">url地址</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="url" autocomplete="off" placeholder="请输入url" class="layui-input">\n' +
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
                    ,cancel: function(index, layero){
                        Img = '';
                    }
                })
                uploadImg();
            }
        })
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
                        title: '修改图片'
                        , type: 1
                        , area: ['600px', '470px']
                        , closeBtn: 1
                        , zIndex:50
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , content: '<div class="public-padding-10">' +
                            '<form class="layui-form " action="'+add_url+'">' +
                            '<input type="hidden" name="carousel_id" value="'+$.Public.values(data.carousel_id)+'">' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">图片</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '<img src="'+$.Public.values(data.img)+'" class="img" />' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+$.Public.values(data.username)+'" name="username" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">url地址</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+$.Public.values(data.url)+'" name="url" autocomplete="off" placeholder="请输入url" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">排序</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number"  value="'+$.Public.values(data.sort)+'" name="sort" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
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
                }
            });
        }else if(obj.event == 'del') {
            var id = data.carousel_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {carousel_id:id},
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