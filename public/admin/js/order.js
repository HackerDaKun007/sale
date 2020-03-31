layui.use(['form', 'layer', 'table'], function() {
    var layer = layui.layer,
        form = layui.form,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'order/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'order_id', width: 100, title: 'ID', sort: true}
            , {field: 'goods_user', width: '', title: '产品名称'}
            , {field: 'goods_style', width:130, title: '产品款式'}
            , {field: 'number', width: 120, title: '数量'}
            , {field: 'price', width: 120, title: '金额'}
            , {field: 'status', width: 150, title: '订单状态'}
            , {field: 'create_time', width: 170, title: '添加时间'}
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

})