layui.use(['form', 'layer', 'table'], function(){
    var layer = layui.layer,
        form = layui.form,
        table = layui.table;

    //提交地址
    var public_url = $.Public.url + 'role/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'role_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '', title: '角色名称'}
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

    let PowerShow = $('#PowerShow').html();
    if(PowerShow != null) {
        PowerShow = JSON.parse(PowerShow);
    }
    //内容展示
    function PowerShowCount(arr='', admin='') {
        if(arr != '') {
            arr = arr.split(',');
        }
        let checked_admin = '';
        if(admin == 1) {
            checked_admin = 'checked';
        }
        let _html = '';
        if(PowerShow != '' && PowerShow != null) {
            PowerShow.forEach(function(val) {
                let checked_list1 = '';
                if(arr != '' && admin != 1) {
                    let num = val.power_id.toString();
                    if(arr.indexOf(num) >= 0) {
                        checked_list1 = 'checked';
                    };
                }
                if(typeof val.grade2 !=="undefined") {
                    let _htl = '';
                    let _htl1 = false;
                    val.grade2.forEach(function (val1) {
                        let checked_list2 = '';
                        if(arr != '' && admin != 1) {
                            let num = val1.power_id.toString();
                            if(arr.indexOf(num) >= 0) {
                                checked_list2 = 'checked';
                            };
                        }
                        let _htl2 = '<input '+checked_list2+checked_admin+' type="checkbox" class="all-checkbox"  lay-filter="all-checkbox-click-2" name="power_id[]" value="'+val1.power_id+'" title="'+val1.username+'" lay-skin="primary">';
                        let _htl3 = '';
                        if(typeof val1.grade3 !== "undefined") {
                            _htl1 = true;
                            val1.grade3.forEach(function (val2) {
                                let checked_list3 = '';
                                if(arr != '' && admin != 1) {
                                    let num = val2.power_id.toString();
                                    if(arr.indexOf(num) >= 0) {
                                        checked_list3 = 'checked';
                                    };
                                }
                                _htl3 += '<input '+checked_list3+checked_admin+' type="checkbox" class="all-checkbox" name="power_id[]" value="'+val2.power_id+'" title="'+val2.username+'" lay-skin="primary">';;
                            });
                            _htl3 = '<span>'+_htl3+'</span>';
                            _htl += '<div class="role-checkbox-child">'+_htl2+_htl3+'</div>';
                        }else {
                            _htl += _htl2;
                        }
                    });
                    if(_htl1 == false) {
                        _htl = '<span>'+_htl+'</span>';
                    }
                    _html += '<div class="role-checkbox">\n' +
                        ' <input type="checkbox" '+checked_list1+checked_admin+' class="all-checkbox" lay-filter="all-checkbox-click-1" name="power_id[]" value="'+val.power_id+'" title="'+val.username+'" lay-skin="primary">'+_htl+'</div>';
                }else {
                    _html += '<div class="role-checkbox">\n' +
                        ' <input type="checkbox" '+checked_list1+checked_admin+' class="all-checkbox" lay-filter="all-checkbox-click-2" name="power_id[]" value="'+val.power_id+'" title="'+val.username+'" lay-skin="primary">\n' +
                        '</div>';
                }
            });
        }
        return _html;
    }

    function checkbox() {
        var all_checkbox = $('.all-checkbox');
        //选择权限全部
        form.on('checkbox(all-checkbox-click)', function(data){
            let $this =  $(this);
            let checkbox = all_checkbox;
            if($this.prop('checked') == true) {
                checkbox.prop('checked', true);
            }else {
                checkbox.prop('checked', false);
            }
            form.render('checkbox');
        })
        //选择权限一级
        form.on('checkbox(all-checkbox-click-1)', function(data){
            let $this =  $(this);
            let checkbox = $('.role-checkbox-child').find('input');
            if($this.prop('checked') == true) {
                checkbox.prop('checked', true);
                allCheckd();
            }else {
                checkbox.prop('checked', false);
                all_checkbox.eq(0).prop('checked', false);
            }
            form.render('checkbox');
        })
        //选择权限二级
        form.on('checkbox(all-checkbox-click-2)', function(data){
            let $this =  $(this);
            let checkbox = $this.nextAll('span').find('input');
            if($this.prop('checked') == true) {
                checkbox.prop('checked', true);
                allCheckd();
            }else {
                checkbox.prop('checked', false);
                all_checkbox.eq(0).prop('checked', false);
            }
            form.render('checkbox');
        })
        function allCheckd() {
            let number = 1;
            all_checkbox.each(function () {
                if($(this).prop('checked') ==  true) {
                    number ++;
                }
            })
            if(number == all_checkbox.length) {
                all_checkbox.prop('checked', true);
            }
        }
    }
    $('.add').bind('click', function() {
        let add_url = public_url + 'add.html';
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function () {
                layer.open({
                    title: '添加角色'
                    , type: 1
                    , area: ['600px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form " action="'+add_url+'">' +
                        ' <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">角色名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" autocomplete="off" placeholder="请输入角色名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '<div class="layui-form-item" ><label class="layui-form-label">选择权限</label><div class="layui-input-block">' +
                        ' <div class="role-checkbox">\n' +
                        '    <input type="checkbox"  lay-filter="all-checkbox-click" class="all-checkbox " name="admin" value="1" title="全部" lay-skin="primary">\n' +
                        ' </div>'+PowerShowCount()+'</div></div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render('checkbox');
                checkbox();
            }
        })
    });

    //操作删除、修改
    table.on('tool(content)',function(obj) {
        let data = obj.data;
        if(obj.event == 'edit'){
            let edit_url = public_url + 'edit.html';
            $.Public.yzPost({
                type: 'post',
                url: edit_url,
                data: '',
                success: function () {
                    let checked_admin = '';
                    if(data.admin == 1) {
                        checked_admin = 'checked';
                    }
                    layer.open({
                        title: '修改角色'
                        , type: 1
                        , area: ['600px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<form class="layui-form " action="'+edit_url+'">' +
                            '<input type="hidden" name="role_id" value="'+data.role_id+'" />' +
                            ' <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">角色名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+data.username+'" name="username" autocomplete="off" placeholder="请输入角色名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '<div class="layui-form-item" ><label class="layui-form-label">选择权限</label><div class="layui-input-block">' +
                            ' <div class="role-checkbox">\n' +
                            '    <input type="checkbox" '+checked_admin+' lay-filter="all-checkbox-click" class="all-checkbox " name="admin" value="1" title="全部" lay-skin="primary">\n' +
                            ' </div>'+PowerShowCount(data.power_id, data.admin)+'</div></div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>'
                    });
                    form.render('checkbox');
                    checkbox();
                }
            })
        }else if(obj.event == 'del') {
            var id = data.role_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {role_id:id},
                    success: function(msg) {
                        $.Public.locationHref();
                    }
                })
            })
        }
        return false;
    });

    //监听提交
    form.on('submit(submit)', function(data){
        var action = data.form.action;
        $.Public.post({
            type:'post',
            url: action,
            data: data.field,
            success: function() {
                layer.closeAll();
                $.Public.locationHref();
            },
        });
        return false;
    });

})