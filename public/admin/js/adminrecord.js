layui.use(['form', 'layer', 'table'], function(){
    var layer = layui.layer,
        form = layui.form,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'adminrecord/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度
        , cols: [[
            {field: 'admin_id', width: 100, title: '用户ID', sort: true}
            , {field: 'username', width: '', minWidth:180, title: '用户名称'}
            , {field: 'ip', width: 120, title: '登陆IP'}
            , {field: 'ipaddr', width: 200, title: '登陆IP地区'}
            , {field: 'os', width: 100, title: '登陆系统'}
            , {field: 'bro', width: 100, title: '登陆游览器'}
            , {field: 'record_time', width: 200, title: '登陆时间', toolbar: '#recordTime'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 100}
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


    table.on('tool(content)',function(obj) {
        let data = obj.data;

        if(obj.event == 'del') {
            var id = data.adminrecord_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {adminrecord_id:id},
                    success: function(msg) {
                        $.Public.locationHref();
                    }
                })
            })
        }
    })



})