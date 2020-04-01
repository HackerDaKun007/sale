layui.use(['form', 'layer', 'table', 'laydate'], function() {
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    var rushtime = $('#rushdate').html();
    if(rushtime != null && rushtime != '') {
        rushtime = JSON.parse(rushtime);
    }
    function rushtime_html(id='',re=false) {
        let rushtime_html = '<option value="">直接日期或搜索日期</option>';
        if(rushtime != null && rushtime != '') {
            rushtime.forEach(function(v) {
                rushtime_html += '<option value="'+v.rushdate_id+'" '+$.Public.selected(v.rushdate_id,id)+'>'+$.Public.turnTime(v.date,false)+'</option>';
            });
        }
        return rushtime_html;
    }
    $('#search-date').append(rushtime_html());
    form.render('select');

    //提交地址
    var public_url = $.Public.url + 'recogoods/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'rushgoods_id', width: 80, title: 'ID', sort: true}
            , {field: 'title', width: '', title: '短文标题'}
            , {field: 'rushgoods_id', width: 100, title: '抢购ID'}
            , {field: 'username', width: '', minWidth:180, title: '产品名称',toolbar: '#goodsId'}
            , {field: 'sort', width: 100, title: '排序'}
            , {field: 'date', width: 110, title: '日期',toolbar: '#rushsTime'}
            , {field: 'start_time', width: 110, title: '开始时间',toolbar: '#startTime'}
            , {field: 'end_time', width: 110, title: '结束时间',toolbar: '#endTime'}
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
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function () {
                layer.open({
                    title: '添加抢购推荐商品'
                    , type: 1
                    , area: ['700px', '450px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex: 50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">抢购商品</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text"  id="goods_username" readonly autocomplete="off" placeholder="请点击抢购商品" class="layui-input">\n' +
                        '      <input type="hidden" id="rushgoods_id" name="rushgoods_id" class="layui-input ">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '<div class="layui-form-item">\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">日期</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '       <select name="rushdate_id"   lay-search="">'+rushtime_html()+'</select>' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">排序</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '       <input type="number" value="10" name="sort" autocomplete="off" placeholder="排序" class="layui-input">' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">短文标题</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title"  autocomplete="off" placeholder="请输入短文标题，不能大于16个字" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                })
                form.render('select');
                //选择产品
                $('#goods_username').click(function(){
                    let add_url = public_url + 'index.html';
                    let open = layer.open({
                        title: '选择抢购商品'
                        , type: 1
                        , area: ['1100px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer1'
                        , moveType: 1
                        , zIndex: 50
                        , content:'<div class="public-padding-10">' +
                            '<!--  搜索  -->\n' +
                            '    <div class="public-search">\n' +
                            '        <form class="layui-form layui-form-pane">\n' +
                            '            <div class="layui-form-item">\n' +
                            '                <div class="layui-inline">\n' +
                            '                    <label class="layui-form-label">日期</label>\n' +
                            '                    <div class="layui-input-inline">\n' +
                            '                        <select name="rushdate_id" id="search-date" lay-search="">'+rushtime_html()+'</select>\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">产品名称</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <input type="text" name="username"  autocomplete="off" class="layui-input">\n' +
                            '      </div>\n' +
                            '    </div>' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">产品ID</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <input type="number" name="goods_id"  autocomplete="off" class="layui-input">\n' +
                            '      </div>\n' +
                            '    </div>' +
                            '                <div class="layui-inline">\n' +
                            '                    <button class="layui-btn layuiadmin-btn-useradmin" lay-submit="" lay-filter="goods-search">\n' +
                            '                        <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>\n' +
                            '                    </button>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '        </form>\n' +
                            '    </div>\n' +
                            '        <div class="public-content-table">\n' +
                            '            <table class="layui-hide" id="goods-content" lay-filter="goods-content"></table>\n' +
                            '        </div>\n' +
                            '        <script type="text/html" id="goods-barDemo">\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="select">选择</a>\n' +
                            '        <\/script>\n'+
                            '        <script type="text/html" id="goods-date">{{ $.Public.turnTime(d.date,false) }}<\/script>\n'+
                            '        <script type="text/html" id="goods-start_time">{{ $.Public.turnTime(d.start_time,true,false) }}<\/script>\n'+
                            '        <script type="text/html" id="goods-end_time">{{ $.Public.turnTime(d.end_time,true,false) }}<\/script>\n'+
                            '</div>'
                    })
                    form.render('select');
                    let goods_tableIns = table.render({
                        elem: '#goods-content'
                        ,where:{request:200,goods:200}
                        , url: public_url + 'index.html'
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'rushgoods_id', width: 120, title: '抢购商品ID', sort: true}
                            , {field: 'username', width: '', title: '产品名称' }
                            , {field: 'goods_id', width: 100, title: '产品ID' }
                            , {field: 'date', width: 130, title: '日期' , toolbar: '#goods-date'}
                            , {field: 'start_time', width: 130, title: '开始时间' , toolbar: '#goods-start_time'}
                            , {field: 'end_time', width: 130, title: '结束时间' , toolbar: '#goods-end_time'}
                            , {fixed: 'right', title: '操作', toolbar: '#goods-barDemo', width: 100}
                        ]]
                        , limit: 10
                        , page: true
                    });
                    //搜索
                    form.on('submit(goods-search)',function(data){
                        let field = data.field;
                        field.request = 200;
                        field.goods = 200;
                        goods_tableIns.reload({
                            where:field,
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                        });
                        return false;
                    });
                    table.on('tool(goods-content)',function(obj) {
                        let data = obj.data;
                        if (obj.event == 'select') { //确定产品
                            $('#rushgoods_id').val(data.rushgoods_id);
                            $('#goods_username').val('( 抢购ID:'+data.rushgoods_id+' ) ( 产品ID：'+data.goods_id+') '+ data.username );
                            layer.close(open);
                        }
                    })
                });
            }
        })
    })

    //编辑/删除
    table.on('tool(content)',function(obj) {
        let data = obj.data;
        if (obj.event == 'edit') {
            let add_url = public_url + 'edit.html';
            $.Public.yzPost({
                type: 'post',
                url: add_url,
                data: '',
                success: function () {
                    layer.open({
                        title: '修改抢购推荐商品'
                        , type: 1
                        , area: ['700px', '450px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex: 50
                        , content: '<div class="public-padding-10">' +
                            '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">抢购商品</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text"  id="goods_username" value="( 抢购ID:'+data.rushgoods_id+') ( 产品ID：'+data.goods_id+') '+data.username+'" readonly autocomplete="off" placeholder="请点击抢购商品" class="layui-input">\n' +
                            '      <input type="hidden" id="rushgoods_id" value="'+data.rushgoods_id+'" name="rushgoods_id" class="layui-input ">\n' +
                            '      <input type="hidden" id="recogoods_id" value="'+data.recogoods_id+'" name="recogoods_id" class="layui-input ">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '<div class="layui-form-item">\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">日期</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '       <select name="rushdate_id"   lay-search="">'+rushtime_html(data.rushdate_id)+'</select>' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">排序</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '       <input type="number" value="'+data.rushdate_id+'" name="sort" autocomplete="off" placeholder="排序" class="layui-input">' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '  <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">短文标题</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+data.title+'" name="title"  autocomplete="off" placeholder="请输入短文标题，不能大于16个字" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>'
                    })
                    form.render('select');
                    //选择产品
                    $('#goods_username').click(function(){
                        let add_url = public_url + 'index.html';
                        let open = layer.open({
                            title: '选择抢购商品'
                            , type: 1
                            , area: ['1100px', '600px']
                            , closeBtn: 1
                            , shade: 0.3
                            , id: 'LA_layer1'
                            , moveType: 1
                            , zIndex: 50
                            , content:'<div class="public-padding-10">' +
                                '<!--  搜索  -->\n' +
                                '    <div class="public-search">\n' +
                                '        <form class="layui-form layui-form-pane">\n' +
                                '            <div class="layui-form-item">\n' +
                                '                <div class="layui-inline">\n' +
                                '                    <label class="layui-form-label">日期</label>\n' +
                                '                    <div class="layui-input-inline">\n' +
                                '                        <select name="rushdate_id" id="search-date" lay-search="">'+rushtime_html()+'</select>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '    <div class="layui-inline">\n' +
                                '      <label class="layui-form-label">产品名称</label>\n' +
                                '      <div class="layui-input-inline">\n' +
                                '        <input type="text" name="username"  autocomplete="off" class="layui-input">\n' +
                                '      </div>\n' +
                                '    </div>' +
                                '    <div class="layui-inline">\n' +
                                '      <label class="layui-form-label">产品ID</label>\n' +
                                '      <div class="layui-input-inline">\n' +
                                '        <input type="number" name="goods_id"  autocomplete="off" class="layui-input">\n' +
                                '      </div>\n' +
                                '    </div>' +
                                '                <div class="layui-inline">\n' +
                                '                    <button class="layui-btn layuiadmin-btn-useradmin" lay-submit="" lay-filter="goods-search">\n' +
                                '                        <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>\n' +
                                '                    </button>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </form>\n' +
                                '    </div>\n' +
                                '        <div class="public-content-table">\n' +
                                '            <table class="layui-hide" id="goods-content" lay-filter="goods-content"></table>\n' +
                                '        </div>\n' +
                                '        <script type="text/html" id="goods-barDemo">\n' +
                                '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="select">选择</a>\n' +
                                '        <\/script>\n'+
                                '        <script type="text/html" id="goods-date">{{ $.Public.turnTime(d.date,false) }}<\/script>\n'+
                                '        <script type="text/html" id="goods-start_time">{{ $.Public.turnTime(d.start_time,true,false) }}<\/script>\n'+
                                '        <script type="text/html" id="goods-end_time">{{ $.Public.turnTime(d.end_time,true,false) }}<\/script>\n'+
                                '</div>'
                        })
                        form.render('select');
                        let goods_tableIns = table.render({
                            elem: '#goods-content'
                            ,where:{request:200,goods:200}
                            , url: public_url + 'index.html'
                            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                            , cols: [[
                                {field: 'rushgoods_id', width: 120, title: '抢购商品ID', sort: true}
                                , {field: 'username', width: '', title: '产品名称' }
                                , {field: 'goods_id', width: 100, title: '产品ID' }
                                , {field: 'date', width: 130, title: '日期' , toolbar: '#goods-date'}
                                , {field: 'start_time', width: 130, title: '开始时间' , toolbar: '#goods-start_time'}
                                , {field: 'end_time', width: 130, title: '结束时间' , toolbar: '#goods-end_time'}
                                , {fixed: 'right', title: '操作', toolbar: '#goods-barDemo', width: 100}
                            ]]
                            , limit: 10
                            , page: true
                        });
                        //搜索
                        form.on('submit(goods-search)',function(data){
                            let field = data.field;
                            field.request = 200;
                            field.goods = 200;
                            goods_tableIns.reload({
                                where:field,
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
                            return false;
                        });
                        table.on('tool(goods-content)',function(obj) {
                            let data = obj.data;
                            if (obj.event == 'select') { //确定产品
                                $('#rushgoods_id').val(data.rushgoods_id);
                                $('#goods_username').val('( 抢购ID:'+data.rushgoods_id+' ) ( 产品ID：'+data.goods_id+') '+ data.username );
                                layer.close(open);
                            }
                        })
                    });
                }
            })
        }else if(obj.event == 'del') {
            var id = data.recogoods_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {recogoods_id:id},
                    success: function(msg) {
                        $.Public.locationHref();
                    }
                })
            })
        }
    })

    //更新缓存
    $('.uploadCache').bind('click',function() {
        layer.confirm('确定要更新缓存?', {icon:3,title:'提示'}, function(index) {
            layer.close(index);
            let add_url = public_url + 'uploadcache.html';
            $.Public.post({
                type: 'post',
                url: add_url,
                data: '',
                success: function (msg) {

                }
            })
        })

    });

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