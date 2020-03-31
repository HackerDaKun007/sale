layui.use(['form', 'layer', 'table', 'laydate'], function() {
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    laydate.render({
        elem: '#searchDate'
    });

    //提交地址
    var public_url = $.Public.url + 'rushdate/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'rushdate_id', width: 80, title: 'ID', sort: true}
            , {field: 'date', width: '', minWidth:180, title: '日期' , toolbar: '#recordTime'}
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

    function content(val='',url) {
        let date = '';
        if($.Public.values(val.date)) {
            date = $.Public.turnTime(val.date,false)
        }
        return '<div class="public-padding-10">' +
            '<form class="layui-form layui-form-pane" action="'+url+'">' +
            '<input value="'+$.Public.values(val.rushdate_id)+'" name="rushdate_id" type="hidden" />' +
            '   <div class="layui-form-item">\n' +
            '    <label class="layui-form-label">日期</label>\n' +
            '    <div class="layui-input-block">\n' +
            '      <input readonly type="text" value="'+date+'" name="date" id="addDate" autocomplete="off" placeholder="请输入日期" class="layui-input">\n' +
            '    </div>\n' +
            '  </div>' +
            '   <div class="layui-form-item public-center">\n' +
            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
            '    </div>\n' +
            '</form>' +
            '</div>';
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
                    title: '添加抢购日期'
                    , type: 1
                    , area: ['400px', '300px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: content('',add_url)
                })
                laydate.render({
                    elem: '#addDate'
                });
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
                        title: '修改日期'
                        , type: 1
                        , area: ['400px', '300px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: content(data,add_url)
                    })
                    laydate.render({
                        elem: '#addDate'
                    });
                }
            });
        }else if(obj.event == 'del') {
            var id = data.rushdate_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {rushdate_id:id},
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