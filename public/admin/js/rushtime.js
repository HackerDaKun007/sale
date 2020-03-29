layui.use(['form', 'layer', 'table', 'laydate'], function() {
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    var rushtime = $('#rushtime').html();
    if(rushtime != null && rushtime != '') {
        rushtime = JSON.parse(rushtime);
    }
    function rushtime_html(id='') {
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
    var public_url = $.Public.url + 'rushtime/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'rushtime_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', title: '名称'}
            , {field: 'date', width: 120, title: '日期',toolbar: '#rushsTime'}
            , {field: 'start_time', width: 120, title: '开始时间',toolbar: '#startTime'}
            , {field: 'end_time', width: 120, title: '结束时间',toolbar: '#endTime'}
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
        let start_time = '';
        if($.Public.values(val.start_time)) {
            start_time = $.Public.turnTime(val.start_time,true,false)
        }
        let end_time = '';
        if($.Public.values(val.end_time)) {
            end_time = $.Public.turnTime(val.end_time,true,false)
        }
        return '<div class="public-padding-10">' +
            '<form class="layui-form layui-form-pane" action="'+url+'">' +
            '<input value="'+$.Public.values(val.rushtime_id)+'" name="rushtime_id" type="hidden" />' +

            '<div class="layui-form-item">\n' +
            '    <div class="layui-inline">\n' +
            '      <label class="layui-form-label">日期</label>\n' +
            '      <div class="layui-input-inline">\n' +
            ' <select name="rushdate_id" id="search-date" lay-search="">'+rushtime_html($.Public.values(val.rushdate_id))+'</select>' +
            '      </div>\n' +
            '    </div>\n' +
            '    <div class="layui-inline">\n' +
            '      <label class="layui-form-label">名称</label>\n' +
            '      <div class="layui-input-inline">\n' +
            '        <input type="text" value="'+$.Public.values(val.username)+'" name="username"  autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>' +

            '<div class="layui-form-item">\n' +
            '    <div class="layui-inline">\n' +
            '      <label class="layui-form-label">开始时间</label>\n' +
            '      <div class="layui-input-inline">\n' +
            '        <input type="text" readonly name="start_time" value="'+start_time+'" id="start_time" autocomplete="off" class="layui-input">\n' +
            '      </div>\n' +
            '    </div>\n' +
            '    <div class="layui-inline">\n' +
            '      <label class="layui-form-label">结束时间</label>\n' +
            '      <div class="layui-input-inline">\n' +
            '        <input type="text" readonly name="end_time" id="end_time" value="'+end_time+'" autocomplete="off" class="layui-input">\n' +
            '      </div>\n' +
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
                    title: '添加抢购时间'
                    , type: 1
                    , area: ['700px', '300px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: content('',add_url)
                })
                form.render('select');
                laydate.render({
                    elem: '#addDate'
                });
                laydate.render({
                    elem: '#start_time'
                    ,type: 'time'
                    ,done: function(value, date, endDate){
                        let time = setTimeout(function(){
                            if(date.hours != '' && date.hours != null) {
                                $('#start_time').val(date.hours+':00:00');
                            }
                            clearTimeout(time)
                        },100);
                    }
                });
                laydate.render({
                    elem: '#end_time'
                    ,type: 'time'
                    ,done: function(value, date, endDate){
                        let time = setTimeout(function(){
                            if(date.hours != '' && date.hours != null) {
                                $('#end_time').val(date.hours+':59:59');
                            }
                            clearTimeout(time)
                        },100);
                    }
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
                        , area: ['700px', '300px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: content(data,add_url)
                    })
                    form.render('select');
                    laydate.render({
                        elem: '#addDate'
                    });
                    laydate.render({
                        elem: '#start_time'
                        ,type: 'time'
                        ,done: function(value, date, endDate){
                            let time = setTimeout(function(){
                                if(date.hours != '' && date.hours != null) {
                                    $('#start_time').val(date.hours+':00:00');
                                }
                                clearTimeout(time)
                            },100);
                        }
                    });
                    laydate.render({
                        elem: '#end_time'
                        ,type: 'time'
                        ,done: function(value, date, endDate){
                            let time = setTimeout(function(){
                                if(date.hours != '' && date.hours != null) {
                                    $('#end_time').val(date.hours+':59:59');
                                }
                                clearTimeout(time)
                            },100);
                        }
                    });
                }
            });
        }else if(obj.event == 'del') {
            var id = data.rushtime_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {rushtime_id:id,rushdate_id:data.rushdate_id},
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