layui.use(['form', 'layer', 'table', 'laydate'], function() {
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    var rushtime = $('#rushdate').html();
    if(rushtime != null && rushtime != '') {
        rushtime = JSON.parse(rushtime);
    }
    function rushtime_html(id='',re=false,date=false) {
        let rushtime_html = '<option value="">直接日期或搜索日期</option>';
        if(rushtime != null && rushtime != '') {
            rushtime.forEach(function(v) {
                if(v.date >= $.Public.kaiDateTime || date) {
                    rushtime_html += '<option value="'+v.rushdate_id+'" '+$.Public.selected(v.rushdate_id,id)+'>'+$.Public.turnTime(v.date,false)+'</option>';
                }
            });
        }
        return rushtime_html;
    }

    $('#search-date').append(rushtime_html('',false,true));

    form.render('select');
    //提交地址
    var public_url = $.Public.url + 'rushgoods/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'rushgoods_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', minWidth:180, title: '产品名称',toolbar: '#goodsId'}
            , {field: 'price_val', width: 150, title: '金额'}
            , {field: 'num', width: 150, title: '数量'}
            , {field: 'date', width: 110, title: '日期',toolbar: '#rushsTime'}
            , {field: 'start_time', width: 90, title: '开始时间',toolbar: '#startTime'}
            , {field: 'end_time', width: 90, title: '结束时间',toolbar: '#endTime'}
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
                    title: '添加抢购商品'
                    , type: 1
                    , area: ['700px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">选择产品</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text"  id="goods_username" readonly autocomplete="off" placeholder="请点击选择产品" class="layui-input">\n' +
                        '      <input type="hidden" id="goods_id" name="goods_id" class="layui-input ">\n' +
                        '      <input type="hidden" id="style_id" name="style_id" class="layui-input ">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '<div class="layui-form-item">\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">日期</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '       <select name="rushdate_id" lay-filter="rushdate"  lay-search="">'+rushtime_html()+'</select>' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">抢购时间</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '        <select  name="rushtime_id"  id="rushtime_id"></select>' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '<div class="layui-form-item">\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">抢购数量</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '        <input type="text"  name="num" value="" id="num" autocomplete="off" class="layui-input">\n' +
                        '        <input type="hidden" name="num_back" value="" id="num_back" >\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">抢购金额</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '        <input type="text" readonly name="price_val" id="price_val" value="" autocomplete="off" class="layui-input">\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">抢购原价</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '        <input type="text" readonly name="orprice_val" id="regular_price" value="" autocomplete="off" class="layui-input">\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                })
                form.render('select');
                //监听指定开关
                let rushtime_id = $('#rushtime_id');
                form.on('select(rushdate)', function(data){
                    let date = new Date(this.innerHTML);
                    let time = date.getTime()/1000;
                    $.Public.post({
                        type: 'post',
                        url: public_url + 'index.html',
                        data: {date:time},
                        bool:true
                        ,success: function (msg) {
                            let _html = '<option value="">选择抢购时间</option>';
                            if(msg.code == 1){
                                layer.msg(msg.msg,{icon:1,time:1000});
                                msg.data.rushtime.forEach(function(v) {
                                    _html += '<option value="'+v.rushtime_id+'">('+v.username+') '+$.Public.turnTime(v.start_time,true,false)+' - '+$.Public.turnTime(v.end_time,true,false)+' </option>';
                                });
                            }else {
                                layer.msg(msg.msg,{icon:2,time:1000});
                            }
                            rushtime_id.html(_html);
                            form.render('select');
                        }

                    })
                });
                //选择产品
                $('#goods_username').click(function(){
                    let add_url = public_url + 'index.html';
                    layer.open({
                        title: '选择产品'
                        , type: 1
                        , area: ['900px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer1'
                        , moveType: 1
                        , zIndex: 50
                        , content: '<div class="public-backdrop-white">\n' +
                            '    <!--  搜索  -->\n' +
                            '    <div class="public-search">\n' +
                            '        <form class="layui-form layui-form-pane">\n' +
                            '            <div class="layui-form-item">\n' +
                            '                <div class="layui-inline">\n' +
                            '                    <label class="layui-form-label">产品名称</label>\n' +
                            '                    <div class="layui-input-inline" style="width: 350px;">\n' +
                            '                        <input type="text" name="username"  placeholder="请输入产品名称" autocomplete="off" class="layui-input">\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '                <div class="layui-inline">\n' +
                            '                    <label class="layui-form-label">产品ID</label>\n' +
                            '                    <div class="layui-input-inline">\n' +
                            '                        <input type="text" name="goods_id"  placeholder="请输入产品ID" autocomplete="off" class="layui-input">\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '                <div class="layui-inline">\n' +
                            '                    <button class="layui-btn layuiadmin-btn-useradmin" lay-submit="" lay-filter="goods-search">\n' +
                            '                        <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>\n' +
                            '                    </button>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '        </form>\n' +
                            '    </div>\n' +
                            '    <div class="public-content">\n' +
                            '        <div class="public-content-table">\n' +
                            '            <table class="layui-hide" id="goods-content" lay-filter="goods-content"></table>\n' +
                            '        </div>\n' +
                            '        <script type="text/html" id="goods-barDemo">\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="select">选择</a>\n' +
                            '        <\/script>\n'+
                            '    </div>\n'+
                            '</div>'
                    })
                    let goods_tableIns = table.render({
                        elem: '#goods-content'
                        ,where:{request:200,goods:200}
                        , url: public_url + 'index.html'
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'goods_id', width: 80, title: 'ID', sort: true}
                            , {field: 'username', width: '', title: '产品名称'}
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
                            $.Public.post({
                                type: 'post',
                                url: add_url,
                                data: {goods:200,goods_id:data.goods_id},
                                success: function (msg) {
                                    let _html = '';
                                    if(msg.data.length > 0) {
                                        msg.data.forEach(function (v) {
                                            _html += '<div class="layui-form-item">\n' +
                                                '    <div class="layui-inline">\n' +
                                                '      <label class="layui-form-label">款式名称</label>\n' +
                                                '      <div class="layui-input-inline">\n' +
                                                '        <input type="text" value="'+v.username+'" readonly class="layui-input">\n' +
                                                '        <input type="hidden" class="goodsstyle_id" value="'+v.goodsstyle_id+'">\n' +
                                                '      </div>\n' +
                                                '    </div>\n' +
                                                '    <div class="layui-inline">\n' +
                                                '      <label class="layui-form-label">金额</label>\n' +
                                                '      <div class="layui-input-inline">\n' +
                                                '        <input type="number" value="'+v.price+'" class="layui-input goods-price">\n' +
                                                '      </div>\n' +
                                                '    </div>\n' +
                                                '    <div class="layui-inline">\n' +
                                                '      <label class="layui-form-label">原价</label>\n' +
                                                '      <div class="layui-input-inline">\n' +
                                                '        <input type="number" value="'+v.regular_price+'" class="layui-input goods-regular-price">\n' +
                                                '      </div>\n' +
                                                '    </div>\n' +
                                                '    <div class="layui-inline">\n' +
                                                '      <label class="layui-form-label">数量</label>\n' +
                                                '      <div class="layui-input-inline">\n' +
                                                '        <input type="text"  value="'+v.available+'" class="layui-input goods-number">\n' +
                                                '      </div>\n' +
                                                '    </div>\n' +
                                                '  </div>';
                                        });
                                    }
                                    let open = layer.open({
                                        title: '确定选择产品'
                                        , type: 1
                                        , area: ['985px', '600px']
                                        , closeBtn: 1
                                        , shade: 0.3
                                        , id: 'LA_layer2'
                                        , moveType: 1
                                        , zIndex: 54
                                        , content: '<div class="public-padding-10">' +
                                            '<form class="layui-form layui-form-pane" >' +
                                            ' <div class="layui-form-item">\n' +
                                            '    <label class="layui-form-label">选择产品</label>\n' +
                                            '    <div class="layui-input-block">\n' +
                                            '      <input type="text" value="'+data.username+'" id="goods_username" readonly autocomplete="off" placeholder="产品名称" class="layui-input public-">\n' +
                                            '    </div>\n' +
                                            '  </div>'+_html+
                                            '   <div class="layui-form-item public-center" >\n' +
                                            '      <button type="button"  class="layui-btn goods-submit" >确定选择</button>\n' +
                                            '    </div>\n' +
                                            '</form>' +
                                            '</div>'
                                    })
                                    $('.goods-price,.goods-regular-price').bind('blur', function() {
                                        $.Public.onkeyup($(this))
                                    });
                                    $('.goods-submit').bind('click', function(){
                                        let price = '';
                                        let number = '';
                                        let regular_price = '';
                                        let goodsstyle_id = '';
                                        $('.goods-price').each(function() {
                                            price += $(this).val() + '\/';
                                        });
                                        $('.goods-number').each(function() {
                                            number += $(this).val() + '\/';
                                        });
                                        $('.goods-regular-price').each(function() {
                                            regular_price += $(this).val() + '\/';

                                        }); $('.goodsstyle_id').each(function() {
                                            goodsstyle_id += $(this).val() + '\/';

                                        });
                                        price = price.substr(0, price.length - 1);
                                        number = number.substr(0, number.length - 1);
                                        regular_price = regular_price.substr(0, regular_price.length - 1);
                                        goodsstyle_id = goodsstyle_id.substr(0, goodsstyle_id.length - 1);
                                        $('#price_val').val(price);
                                        $('#num').val(number);
                                        $('#num_back').val(number);
                                        $('#regular_price').val(regular_price);
                                        $('#style_id').val(goodsstyle_id);
                                        $('#goods_id').val(data.goods_id);
                                        $('#goods_username').val("(ID:"+data.goods_id+") " + data.username);
                                        layer.msg('选择成功',{icon:1,time:1000});
                                        layer.close(open);
                                    });
                                }
                            })
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
                        title: '修改抢购商品'
                        , type: 1
                        , area: ['700px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">选择产品</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="( '+data.goods_id+' ) '+data.username+'" id="goods_username" readonly autocomplete="off" placeholder="请点击选择产品" class="layui-input">\n' +
                            '      <input type="hidden" value="'+data.goods_id+'" id="goods_id" name="goods_id" class="layui-input ">\n' +
                            '      <input type="hidden" value="'+data.goods_id+'" id="style_id" name="style_id" class="layui-input ">\n' +
                            '      <input type="hidden" value="'+data.rushgoods_id+'" id="rushgoods_id" name="rushgoods_id" class="layui-input ">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '<div class="layui-form-item">\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">日期</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '       <select name="rushdate_id" id="rushdate_id" lay-filter="rushdate"  lay-search="">'+rushtime_html(data.rushdate_id)+'</select>' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">抢购时间</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <select  name="rushtime_id"  id="rushtime_id"></select>' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '<div class="layui-form-item">\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">抢购数量</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <input type="text" value="'+data.num+'" name="num" value="" id="num" autocomplete="off" class="layui-input">\n' +
                            '        <input type="hidden" value="'+data.num_back+'" name="num_back" value="" id="num_back" >\n' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">抢购金额</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <input type="text"  value="'+data.price_val+'" readonly name="price_val" id="price_val" value="" autocomplete="off" class="layui-input">\n' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '    <div class="layui-inline">\n' +
                            '      <label class="layui-form-label">抢购原价</label>\n' +
                            '      <div class="layui-input-inline">\n' +
                            '        <input type="text" value="'+data.orprice_val+'" readonly name="orprice_val" id="regular_price" value="" autocomplete="off" class="layui-input">\n' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>'
                    })
                    form.render('select');
                    //监听指定开关
                    let rushtime_id = $('#rushtime_id');
                    let rushtimeId = null;
                    rushtime.forEach(function(v) {
                        if( v.rushdate_id == data.rushdate_id ) {
                            rushtimeId = v.date;
                            return false;
                        }
                    })
                    function publicVal(val,id='') {
                        let date = new Date(val);
                        let time = date.getTime()/1000;
                        $.Public.post({
                            type: 'post',
                            url: public_url + 'index.html',
                            data: {date:time},
                            bool:true
                            ,success: function (msg) {
                                let _html = '<option value="">选择抢购时间</option>';
                                if(msg.code == 1){
                                    layer.msg(msg.msg,{icon:1,time:1000});
                                    msg.data.rushtime.forEach(function(v) {
                                        _html += '<option value="'+v.rushtime_id+'" '+$.Public.selected(id,v.rushtime_id)+'>('+v.username+') '+$.Public.turnTime(v.start_time,true,false)+' - '+$.Public.turnTime(v.end_time,true,false)+' </option>';
                                    });
                                }else {
                                    layer.msg(msg.msg,{icon:2,time:1000});
                                }
                                rushtime_id.html(_html);
                                form.render('select');
                            }
                        })
                    }
                    publicVal(rushtimeId*1000,data.rushtime_id);
                    form.on('select(rushdate)', function(data){
                        publicVal(this.innerText);
                    });
                    //选择产品
                    $('#goods_username').click(function(){
                        let add_url = public_url + 'index.html';
                        layer.open({
                            title: '选择产品'
                            , type: 1
                            , area: ['900px', '600px']
                            , closeBtn: 1
                            , shade: 0.3
                            , id: 'LA_layer1'
                            , moveType: 1
                            , zIndex: 50
                            , content: '<div class="public-backdrop-white">\n' +
                                '    <!--  搜索  -->\n' +
                                '    <div class="public-search">\n' +
                                '        <form class="layui-form layui-form-pane">\n' +
                                '            <div class="layui-form-item">\n' +
                                '                <div class="layui-inline">\n' +
                                '                    <label class="layui-form-label">产品名称</label>\n' +
                                '                    <div class="layui-input-inline" style="width: 350px;">\n' +
                                '                        <input type="text" name="username"  placeholder="请输入产品名称" autocomplete="off" class="layui-input">\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="layui-inline">\n' +
                                '                    <label class="layui-form-label">产品ID</label>\n' +
                                '                    <div class="layui-input-inline">\n' +
                                '                        <input type="text" name="goods_id"  placeholder="请输入产品ID" autocomplete="off" class="layui-input">\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="layui-inline">\n' +
                                '                    <button class="layui-btn layuiadmin-btn-useradmin" lay-submit="" lay-filter="goods-search">\n' +
                                '                        <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>\n' +
                                '                    </button>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </form>\n' +
                                '    </div>\n' +
                                '    <div class="public-content">\n' +
                                '        <div class="public-content-table">\n' +
                                '            <table class="layui-hide" id="goods-content" lay-filter="goods-content"></table>\n' +
                                '        </div>\n' +
                                '        <script type="text/html" id="goods-barDemo">\n' +
                                '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="select">选择</a>\n' +
                                '        <\/script>\n'+
                                '    </div>\n'+
                                '</div>'
                        })
                        let goods_tableIns = table.render({
                            elem: '#goods-content'
                            ,where:{request:200,goods:200}
                            , url: public_url + 'index.html'
                            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                            , cols: [[
                                {field: 'goods_id', width: 80, title: 'ID', sort: true}
                                , {field: 'username', width: '', title: '产品名称'}
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
                                $.Public.post({
                                    type: 'post',
                                    url: add_url,
                                    data: {goods:200,goods_id:data.goods_id},
                                    success: function (msg) {
                                        let _html = '';
                                        if(msg.data.length > 0) {
                                            msg.data.forEach(function (v) {
                                                _html += '<div class="layui-form-item">\n' +
                                                    '    <div class="layui-inline">\n' +
                                                    '      <label class="layui-form-label">款式名称</label>\n' +
                                                    '      <div class="layui-input-inline">\n' +
                                                    '        <input type="text" value="'+v.username+'" readonly class="layui-input">\n' +
                                                    '        <input type="hidden" class="goodsstyle_id" value="'+v.goodsstyle_id+'">\n' +
                                                    '      </div>\n' +
                                                    '    </div>\n' +
                                                    '    <div class="layui-inline">\n' +
                                                    '      <label class="layui-form-label">金额</label>\n' +
                                                    '      <div class="layui-input-inline">\n' +
                                                    '        <input type="number" value="'+v.price+'" class="layui-input goods-price">\n' +
                                                    '      </div>\n' +
                                                    '    </div>\n' +
                                                    '    <div class="layui-inline">\n' +
                                                    '      <label class="layui-form-label">原价</label>\n' +
                                                    '      <div class="layui-input-inline">\n' +
                                                    '        <input type="number" value="'+v.regular_price+'" class="layui-input goods-regular-price">\n' +
                                                    '      </div>\n' +
                                                    '    </div>\n' +
                                                    '    <div class="layui-inline">\n' +
                                                    '      <label class="layui-form-label">数量</label>\n' +
                                                    '      <div class="layui-input-inline">\n' +
                                                    '        <input type="text"  value="'+v.available+'" class="layui-input goods-number">\n' +
                                                    '      </div>\n' +
                                                    '    </div>\n' +
                                                    '  </div>';
                                            });
                                        }
                                        let open = layer.open({
                                            title: '确定选择产品'
                                            , type: 1
                                            , area: ['985px', '600px']
                                            , closeBtn: 1
                                            , shade: 0.3
                                            , id: 'LA_layer2'
                                            , moveType: 1
                                            , zIndex: 54
                                            , content: '<div class="public-padding-10">' +
                                                '<form class="layui-form layui-form-pane" >' +
                                                ' <div class="layui-form-item">\n' +
                                                '    <label class="layui-form-label">选择产品</label>\n' +
                                                '    <div class="layui-input-block">\n' +
                                                '      <input type="text" value="'+data.username+'" id="goods_username" readonly autocomplete="off" placeholder="产品名称" class="layui-input public-">\n' +
                                                '    </div>\n' +
                                                '  </div>'+_html+
                                                '   <div class="layui-form-item public-center" >\n' +
                                                '      <button type="button"  class="layui-btn goods-submit" >确定选择</button>\n' +
                                                '    </div>\n' +
                                                '</form>' +
                                                '</div>'
                                        })
                                        $('.goods-price,.goods-regular-price').bind('blur', function() {
                                            $.Public.onkeyup($(this))
                                        });
                                        $('.goods-submit').bind('click', function(){
                                            let price = '';
                                            let number = '';
                                            let regular_price = '';
                                            let goodsstyle_id = '';
                                            $('.goods-price').each(function() {
                                                price += $(this).val() + '\/';
                                            });
                                            $('.goods-number').each(function() {
                                                number += $(this).val() + '\/';
                                            });
                                            $('.goods-regular-price').each(function() {
                                                regular_price += $(this).val() + '\/';

                                            }); $('.goodsstyle_id').each(function() {
                                                goodsstyle_id += $(this).val() + '\/';

                                            });
                                            price = price.substr(0, price.length - 1);
                                            number = number.substr(0, number.length - 1);
                                            regular_price = regular_price.substr(0, regular_price.length - 1);
                                            goodsstyle_id = goodsstyle_id.substr(0, goodsstyle_id.length - 1);
                                            $('#price_val').val(price);
                                            $('#num').val(number);
                                            $('#num_back').val(number);
                                            $('#regular_price').val(regular_price);
                                            $('#style_id').val(goodsstyle_id);
                                            $('#goods_id').val(data.goods_id);
                                            $('#goods_username').val("(ID:"+data.goods_id+") " + data.username);
                                            layer.msg('选择成功',{icon:1,time:1000});
                                            layer.close(open);
                                        });
                                    }
                                })
                            }
                        })
                    });
                }
            })
        }else if(obj.event == 'del') {
            let id = data.rushgoods_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {'rushgoods_id':id},
                    success: function(msg) {
                        tableIns.reload();
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
                tableIns.reload();
                // $.Public.locationHref();
            },
        });
        return false;
    });

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

})