layui.use(['form', 'layer', 'table'], function() {
    var layer = layui.layer,
        form = layui.form,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'favorite/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'favorite_id', width: 100, title: 'ID', sort: true}
            , {field: 'username', width: '', minWidth:160, title: '用户名称'}
            , {field: 'user_id', width:140, title: '用户ID'}
            , {field: 'goods_id', width: 140, title: '产品ID'}
            , {field: 'date', width: 140, title: '抢购日期'}
            , {field: 'start_time', width: 140, title: '抢购开始时间'}
            , {field: 'end_time', width: 140, title: '抢购结束时间'}
            , {field: 'add_time', width: 170, title: '添加时间'}
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

    $('.upload').on('click',function () {
        $.Public.post({
            type: 'post',
            url: public_url + 'uploadselect.html',
        })
    });

})