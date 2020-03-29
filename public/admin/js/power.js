layui.use(['layer', 'table', 'form'], function(){
    var layer = layui.layer
        ,table = layui.table
        ,form = layui.form;
    var public_url = $.Public.url + 'power/';
    var add_url = public_url + 'add.html';
    var edit_url = public_url + 'edit.html';

    var controller  = $('#controller').html();
    if(controller != null && controller != '') {
        controller = JSON.parse(controller);
    }

    var PowerW1  = $('#PowerW1').html();
    if(PowerW1 != null && PowerW1 != '') {
        PowerW1 = JSON.parse(PowerW1);
    }
    function PowerW1_html(data='', val='') {
        var PowerW1_html = '';
        if(data != '') {
            data.forEach(function(arr){
                if(arr.whether == 1) {
                    let select = '';
                    if(arr.power_id == val) {
                        select = 'selected';
                    }
                    PowerW1_html += '<option '+select+'  value="'+arr.power_id+'">'+arr.username+'</option>';;
                }
            });
        }
        return PowerW1_html;
    }

    var PowerW2  = $('#PowerW2').html();
    if(PowerW2 != null && PowerW2 != '') {
        PowerW2 = JSON.parse(PowerW2);
    }

    var PowerW3  = $('#PowerW3').html();
    if(PowerW3 != null && PowerW3 != '') {
        PowerW3 = JSON.parse(PowerW3);
    }

    //返回ID产品信息
    function countReturn(data, id) {
        let _html = '';
        data.forEach(function(arr){
            if(arr.power_id == id) {
                _html = arr;
                return false;
            }
        });
        return _html;
    }

    //控制名称
    function contr_count(str='') {
        let _html = '';
        controller.forEach(function(val) {
            let select = '';
            if(val.controller == str) {
                select = 'selected';
            }
            _html += '<option '+select+' value="'+val.controller+'">'+val.controller+'</option>';
        });
        return _html;
    }

    //方法名称
    function contr_action(user, str) {
        let _html = '<option value="">请选择方法名</option>';
        controller.forEach(function(val) {
            if(user == val.controller){
                val.action.forEach(function(value) {
                    let select = '';
                    if(value == str) {
                        select = 'selected';
                    }
                    _html += '<option '+select+' value="'+value+'">'+value+'</option>';
                });
                return false;
            }
        });
        return _html;
    }

    //
    function checkd(str, val) {
        if(str == val) {
            return 'checked';
        }
        return '';
    }

    $('.add-1').bind('click', function() {
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function() {
                layer.open({
                    title: '添加1级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '<input name="grade" type="hidden" value="1" />' +
                        '<input name="level" type="hidden" value="0" />' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count()+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option></select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">是否展示</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="whether" value="1" title="是" checked="">\n' +
                        '      <input type="radio" name="whether" value="2" title="否">' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="10" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });
    $('.add-2').bind('click', function() {
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function() {
                layer.open({
                    title: '添加2级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '<input name="grade" type="hidden" value="2" />' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">选择1级</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="level" lay-filter="level" lay-search="">\n' +
                        '        <option value="">请选择1级父级</option>'+PowerW1_html(PowerW1)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count()+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option></select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">是否展示</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="whether" value="1" title="是" checked="">\n' +
                        '      <input type="radio" name="whether" value="2" title="否">' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="10" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });
    $('.add-3').bind('click', function() {
        $.Public.yzPost({
            type: 'post',
            url: add_url,
            data: '',
            success: function() {
                layer.open({
                    title: '添加3级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+add_url+'">' +
                        '<input name="grade" type="hidden" value="3" />' +
                        '<input name="whether" type="hidden" value="2" />' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">选择2级</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="level" lay-filter="level" lay-search="">\n' +
                        '        <option value="">请选择2级父级</option>'+PowerW1_html(PowerW2)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count()+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option></select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="10" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });

    //修改
    $('.edit1').bind('click', function() {
        var $this = $(this);
        var id = $this.attr('lay-id');
        $.Public.yzPost({
            type: 'post',
            url: edit_url,
            data: '',
            success: function() {
                let data = countReturn(PowerW1, id);
                layer.open({
                    title: '修改1级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '500px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+edit_url+'">' +
                        '<input name="grade" type="hidden" value="1" />' +
                        '<input name="level" type="hidden" value="0" />' +
                        '<input name="power_id" type="hidden" value="'+data.power_id+'" />' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input value="'+data.username+'" type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count(data.controller)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option>'+contr_action(data.controller, data.method)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">是否展示</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="whether" value="1" title="是" '+checkd(1, data.whether)+'>\n' +
                        '      <input type="radio" name="whether" value="2" title="否" '+checkd(2, data.whether)+'>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="'+data.sort+'" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit"  class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });

    //修改
    $('.edit2').bind('click', function() {
        var $this = $(this);
        var id = $this.attr('lay-id');
        $.Public.yzPost({
            type: 'post',
            url: edit_url,
            data: '',
            success: function() {
                let data = countReturn(PowerW2, id);
                layer.open({
                    title: '修改2级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+edit_url+'">' +
                        '<input name="grade" type="hidden" value="2" />' +
                        '<input name="power_id" type="hidden" value="'+data.power_id+'" />' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">选择1级</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="level" lay-filter="level" lay-search="">\n' +
                        '        <option value="">请选择1级父级</option>'+PowerW1_html(PowerW1, data.level)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input value="'+data.username+'" type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count(data.controller)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option>'+contr_action(data.controller, data.method)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">是否展示</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="whether" value="1" title="是" '+checkd(1, data.whether)+'>\n' +
                        '      <input type="radio" name="whether" value="2" title="否" '+checkd(2, data.whether)+'>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="'+data.sort+'" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });

    $('.edit3').bind('click', function() {
        var $this = $(this);
        var id = $this.attr('lay-id');
        $.Public.yzPost({
            type: 'post',
            url: edit_url,
            data: '',
            success: function() {
                let data = countReturn(PowerW3, id);
                layer.open({
                    title: '修改3级栏目'
                    , type: 1
                    // ,zIndex: 100
                    , area: ['420px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form layui-form-pane" action="'+edit_url+'">' +
                        '<input name="grade" type="hidden" value="3" />' +
                        '<input name="power_id" type="hidden" value="'+data.power_id+'" />' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">选择2级</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="level" lay-filter="level" lay-search="">\n' +
                        '        <option value="">请选择1级父级</option>'+PowerW1_html(PowerW2, data.level)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">栏目名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input value="'+data.username+'" type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入栏目名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">控制器名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="controller" lay-search="" lay-filter="controller">\n' +
                        '        <option value="">请选择控制器名</option>'+contr_count(data.controller)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">方法名</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <select name="method" class="method" lay-filter="method">\n' +
                        '        <option value="">请选择方法名</option>'+contr_action(data.controller, data.method)+'</select>' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">是否展示</label>\n' +
                        '    <div class="layui-input-block layui-input public-input-block">\n' +
                        '      <input type="radio" name="whether" value="1" title="是" '+checkd(1, data.whether)+'>\n' +
                        '      <input type="radio" name="whether" value="2" title="否" '+checkd(2, data.whether)+'>' +
                        '    </div>\n' +
                        '  </div>' +
                        '  <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">排序</label>\n' +
                        '    <div class="layui-input-block ">\n' +
                        '      <input type="number" value="'+data.sort+'" name="sort" lay-verify="title" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center">\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                });
                form.render();
            },
        });
    });

    form.on('select(controller)', function(data){
        $('.method').html(contr_action(data.value));
        form.render('select');
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
            },
        });
        return false;
    });

    //更新缓存
    $('.renew').on('click', function() {
        $.Public.post({
            type: 'post',
            url: '/admin/power/renew.html',
            data: '',
            success: function(msg) {

            }
        })
    });

    //删除
    $('.del').on('click', function() {
        let $this = $(this);
        let id = $this.attr('lay-id');
        layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
            layer.close(index);
            $.Public.post({
                type: 'post',
                url: '/admin/power/del.html',
                data: {power_id:id},
                success: function(msg) {
                    $.Public.locationHref();
                }
            })
        })
        return false;
    });

});