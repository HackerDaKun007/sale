layui.use(['form', 'layer', 'table', 'upload'], function() {
    var layer = layui.layer,
        form = layui.form,
        upload = layui.upload,
        table = layui.table;

    form.render('select');


    //产品类别
    var category = $('#category').html();
    if(category != null && category != '') {
        category = JSON.parse(category);
    }
    function categoryHtml(id='') {
        let categoryHtml = '';
        if(category != null && category != '') {
            category.forEach(function(v){
                categoryHtml += '<option value="'+v.category_id+'" '+$.Public.selected(id, v.category_id)+'>'+v.username+'</option>';
            });
        }
        return categoryHtml;
    }

    //提交地址
    var public_url = $.Public.url + 'goods/';

    var tableIns = table.render({
        elem: '#content'
        ,where:{request:200}
        , url: public_url + 'index.html'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'goods_id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: '',  minWidth:180,title: '产品名称'}
            , {field: 'home_img', width: 140, title: '展示图片', toolbar: '#img'}
            , {field: 'shelves', width: 100, title: '上下架', toolbar:'#disable'}
            , {field: 'create_time', width: 200, title: '添加时间'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 380}
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
    //上传单图片
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

    //添加
    $('.add').bind('click', function() {
        Img = '';
        let suiji = Math.ceil(Math.random()*1000000);
        let add_url = public_url + 'add.html';
        $.Public.yzPost({
            type:'post',
            url:add_url,
            data:'',
            success:function () {
                layer.open({
                    title: '添加产品'
                    , type: 1
                    , area: ['1003px', '600px']
                    , closeBtn: 1
                    , shade: 0.3
                    , id: 'LA_layer'
                    , moveType: 1
                    , zIndex:50
                    , content: '<div class="public-padding-10">' +
                        '<form class="layui-form " action="'+add_url+'">' +
                        '<input type="hidden" name="string" value="1">' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">名称</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="username" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">页展示图片</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '    <img src="'+$.Public.imagesBack+'" class="home_img img" />' +
                        '    </div>\n' +
                        '  </div>' +
                        ' <div class="layui-form-item">\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">款式标题</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '        <input type="text" name="styletitle" autocomplete="off" placeholder="请输入款式标题" class="layui-input">\n' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">上下架</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '       <select name="shelves" >\n' +
                        '          <option value="1">上架</option>\n' +
                        '          <option value="2">下架</option>\n' +
                        '        </select>' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '    <div class="layui-inline">\n' +
                        '      <label class="layui-form-label">产品归类</label>\n' +
                        '      <div class="layui-input-inline">\n' +
                        '       <select name="category_id"  lay-search="">\n' +
                        '          <option value="">请选择产品归类</option>'+categoryHtml()+'</select>' +
                        '      </div>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">付款方式</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="checkbox" name="payment[]" value="1" lay-skin="primary" title="货到付款" checked="">\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item">\n' +
                        '    <label class="layui-form-label">详情</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <script id="editor'+suiji+'" name="details" style="width: 98%;height: 500px" type="text/plain" ><\/script>\n' +
                        '    </div>\n' +
                        '  </div>' +
                        '   <div class="layui-form-item public-center" >\n' +
                        '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                        '    </div>\n' +
                        '</form>' +
                        '</div>'
                    ,cancel: function(index, layero){
                        Img = '';
                    }
                })
                let ue = UE.getEditor('editor'+suiji,{
                    scaleEnabled:true,
                    autoFloatEnabled:false
                });
                form.render();
                uploadImg();
            }
        });
    });


    table.on('tool(content)',function(obj) {
        let data = obj.data;
        if (obj.event == 'edit') { //修改产品
            Img = '';
            let suiji = Math.ceil(Math.random()*1000000);
            let add_url = public_url + 'edit.html';
            layer.open({
                title: '修改产品'
                , type: 1
                , area: ['1003px', '600px']
                , closeBtn: 1
                , shade: 0.3
                , id: 'LA_layer'
                , moveType: 1
                , zIndex:50
                , content: '<div class="public-padding-10">' +
                    '<form class="layui-form " action="'+add_url+'">' +
                    '<input type="hidden" name="string" value="1">' +
                    '<input name="goods_id" type="hidden" value="'+data.goods_id+'" />' +
                    '   <div class="layui-form-item">\n' +
                    '    <label class="layui-form-label">名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="username" value="'+data.username+'" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                    '    </div>\n' +
                    '  </div>' +
                    '   <div class="layui-form-item">\n' +
                    '    <label class="layui-form-label">页展示图片</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '    <img src="'+$.Public.images+data.home_img+'" class="home_img img" />' +
                    '    </div>\n' +
                    '  </div>' +
                    ' <div class="layui-form-item">\n' +
                    '    <div class="layui-inline">\n' +
                    '      <label class="layui-form-label">款式标题</label>\n' +
                    '      <div class="layui-input-inline">\n' +
                    '        <input type="text" value="'+data.styletitle+'" name="styletitle" autocomplete="off" placeholder="请输入款式标题" class="layui-input">\n' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '    <div class="layui-inline">\n' +
                    '      <label class="layui-form-label">上下架</label>\n' +
                    '      <div class="layui-input-inline">\n' +
                    '       <select name="shelves" >\n' +
                    '          <option value="1" '+$.Public.selected(data.shelves, 1)+' >上架</option>\n' +
                    '          <option value="2" '+$.Public.selected(data.shelves, 2)+'>下架</option>\n' +
                    '        </select>' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '    <div class="layui-inline">\n' +
                    '      <label class="layui-form-label">上下架</label>\n' +
                    '      <div class="layui-input-inline">\n' +
                    '       <select name="category_id"  lay-search="">\n' +
                    '          <option value="">请选择产品归类</option>'+categoryHtml(data.category_id)+'</select>' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '  </div>' +
                    '   <div class="layui-form-item">\n' +
                    '    <label class="layui-form-label">付款方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="checkbox" name="payment[]" value="1" lay-skin="primary" title="货到付款" checked="">\n' +
                    '    </div>\n' +
                    '  </div>' +
                    '   <div class="layui-form-item">\n' +
                    '    <label class="layui-form-label">详情</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <script id="editor'+suiji+'" name="details" style="width: 98%;height: 500px" type="text/plain" >'+data.details+'<\/script>\n' +
                    '    </div>\n' +
                    '  </div>' +
                    '   <div class="layui-form-item public-center" >\n' +
                    '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                    '    </div>\n' +
                    '</form>' +
                    '</div>'
                ,cancel: function(index, layero){
                    Img = '';
                }
            })
            let ue = UE.getEditor('editor'+suiji,{
                scaleEnabled:true,
                autoFloatEnabled:false
            });
            form.render();
            uploadImg();

        }else if(obj.event == 'del') { //删除
            let id = data.goods_id;
            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                layer.close(index);
                $.Public.post({
                    type: 'post',
                    url: public_url + 'del.html',
                    data: {goods_id:id},
                    success: function(msg) {
                        $.Public.locationHref();
                    }
                })
            })

        }else if(obj.event == 'carousel') { //轮播图

            //提交地址
            let public_url = $.Public.url + 'goodscarousel/';
            let add_url = public_url + 'index.html';
            $.Public.yzPost({
                type:'post',
                url:add_url,
                data:'',
                success:function () {
                    layer.open({
                        title: '产品轮播图'
                        , type: 1
                        , area: ['800px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<!--  内容   -->\n' +
                            '    <div class="public-content">\n' +
                            '        <!--    添加等操作    -->\n' +
                            '        <div class="public-column-bottom-10">\n' +
                            '            <button class="layui-btn public-btn-sm goodscarousel-add" >添加</button>\n' +
                            '        </div>\n' +
                            '        <div class="public-content-table">\n' +
                            '            <table class="layui-hide" id="goodscarousel-content" lay-filter="goodscarousel-content"></table>\n' +
                            '        </div>\n' +
                            '        <script type="text/html" id="goodscarousel-barDemo">\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon layui-icon-delete"></i>删除</a>\n' +
                            '        <\/script>\n' +
                            '        <script type="text/html" id="goodscarousel-img">\n' +
                            '            <img src="{{ $.Public.images }}{{ d.img }}" class="public-images-30 " />\n' +
                            '        <\/script>'+
                            '    </div>' +
                            '</div>'
                    })
                    form.render();
                    let tableIns = table.render({
                        elem: '#goodscarousel-content'
                        ,where:{request:200,goods_id:data.goods_id}
                        , url: public_url + 'index.html'
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'goodscarousel_id', width: 80, title: 'ID', sort: true}
                            , {field: 'img', width: '', title: '图片', toolbar: '#goodscarousel-img'}
                            , {field: 'sort', width: 160, title: '排序'}
                            , {fixed: 'right', title: '操作', toolbar: '#goodscarousel-barDemo', width: 200}
                        ]]
                        , limit: 10
                        , page: true
                    });
                    $('.goodscarousel-add').bind('click', function() {
                        let add_url = public_url + 'add.html';
                        $.Public.yzPost({
                            type:'post',
                            url:add_url,
                            data:'',
                            success:function () {
                                layer.open({
                                    title: '添加轮播图片'
                                    , type: 1
                                    , area: ['1003px', '600px']
                                    , closeBtn: 1
                                    , shade: 0.3
                                    , id: 'LA_laye_goodscarousel'
                                    , moveType: 1
                                    , zIndex:54
                                    , content: '<div class="public-padding-10">' +
                                        '<div class="layui-upload">\n' +
                                        '  <button type="button" class="layui-btn layui-btn-normal" id="testList">选择多文件</button> \n' +
                                        '  <div class="layui-upload-list">\n' +
                                        '    <table class="layui-table">\n' +
                                        '      <thead>\n' +
                                        '        <tr><th>文件名</th>\n' +
                                        '        <th>大小</th>\n' +
                                        '        <th>状态</th>\n' +
                                        '        <th>操作</th>\n' +
                                        '      </tr></thead>\n' +
                                        '      <tbody id="demoList"></tbody>\n' +
                                        '    </table>\n' +
                                        '  </div>\n' +
                                        '  <button type="button" class="layui-btn" id="testListAction">开始上传</button>\n' +
                                        '</div> ' +
                                        '</div>'
                                    ,cancel: function(index, layero){
                                        tableIns.reload({
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                    }
                                })
                                form.render();
                                var demoListView = $('#demoList')
                                    ,uploadListIns = upload.render({
                                    elem: '#testList'
                                    ,url: add_url //改成您自己的上传接口
                                    ,accept: 'file'
                                    ,multiple: true
                                    ,auto: false
                                    ,size:200
                                    ,bindAction: '#testListAction'
                                    ,headers:{addDate:2}
                                    , data:{goods_id:data.goods_id}
                                    ,choose: function(obj){
                                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                                        //读取本地文件
                                        obj.preview(function(index, file, result){
                                            var tr = $(['<tr id="upload-'+ index +'">'
                                                ,'<td>'+ file.name +'</td>'
                                                ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
                                                ,'<td>等待上传</td>'
                                                ,'<td>'
                                                ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                                                ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                                                ,'</td>'
                                                ,'</tr>'].join(''));

                                            //单个重传
                                            tr.find('.demo-reload').on('click', function(){
                                                obj.upload(index, file);
                                            });

                                            //删除
                                            tr.find('.demo-delete').on('click', function(){
                                                delete files[index]; //删除对应的文件
                                                tr.remove();
                                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                                            });

                                            demoListView.append(tr);
                                        });
                                    }
                                    ,done: function(res, index, upload){
                                        if(res.code == 1){ //上传成功
                                            var tr = demoListView.find('tr#upload-'+ index)
                                                ,tds = tr.children();
                                            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
                                            tds.eq(4).html(''); //清空操作
                                            return delete this.files[index]; //删除文件队列已经上传成功的文件
                                        }
                                        this.error(index, upload);
                                    }
                                    ,error: function(index, upload){
                                        var tr = demoListView.find('tr#upload-'+ index)
                                            ,tds = tr.children();
                                        tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
                                        tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示重传
                                    }
                                });
                            }
                        });
                    });
                    //编辑/删除
                    table.on('tool(goodscarousel-content)',function(obj) {
                        let goodscarouselAata = obj.data;
                        if(obj.event == 'edit') {
                            let add_url = public_url + 'edit.html';
                            $.Public.yzPost({
                                type:'post',
                                url:add_url,
                                data:'',
                                success:function () {
                                    layer.open({
                                        title: '修改轮播图片'
                                        , type: 1
                                        , area: ['400px', '400px']
                                        , closeBtn: 1
                                        , shade: 0.3
                                        , id: 'LA_layer_goodscarousel'
                                        , moveType: 1
                                        , zIndex:54
                                        , content: '<div class="public-padding-10">' +
                                            '<form class="layui-form " action="'+add_url+'">' +
                                            '<input name="goodscarousel_id" type="hidden" value="'+goodscarouselAata.goodscarousel_id+'" />' +
                                            '<input name="goods_id" type="hidden" value="'+goodscarouselAata.goods_id+'" />' +
                                            '   <div class="layui-form-item">\n' +
                                            '    <label class="layui-form-label">图片</label>\n' +
                                            '    <div class="layui-input-block">\n' +
                                            '    <img src="'+$.Public.images+goodscarouselAata.img+'" id="img" class="goodscarousel_img img" />' +
                                            '    </div>\n' +
                                            '  </div>' +
                                            '   <div class="layui-form-item">\n' +
                                            '    <label class="layui-form-label">排序</label>\n' +
                                            '    <div class="layui-input-block">\n' +
                                            '      <input type="number" value="'+goodscarouselAata.sort+'" name="sort" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                                            '    </div>\n' +
                                            '  </div>' +
                                            '   <div class="layui-form-item public-center">\n' +
                                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                                            '    </div>\n' +
                                            '</form>' +
                                            '</div>'
                                        ,cancel: function(index, layero){
                                            Img = '';
                                            tableIns.reload();
                                        }
                                    })
                                    uploadImg();
                                }
                            });
                        }else if(obj.event == 'del') {
                            let id = goodscarouselAata.goodscarousel_id;
                            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                                layer.close(index);
                                $.Public.post({
                                    type: 'post',
                                    url: public_url + 'del.html',
                                    data: {'goodscarousel_id':id,goods_id:data.goods_id},
                                    success: function(msg) {
                                        tableIns.reload();
                                    }
                                })
                            })
                        }
                    })
                }
            });

        }else if(obj.event == 'style') { //款式
            //提交地址
            let public_url = $.Public.url + 'goodsstyle/';
            let add_url = public_url + 'index.html';
            $.Public.yzPost({
                type:'post',
                url:add_url,
                data:'',
                success:function () {
                    layer.open({
                        title: '产品款式'
                        , type: 1
                        , area: ['900px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex:50
                        , content: '<div class="public-padding-10">' +
                            '<!--  内容   -->\n' +
                            '    <div class="public-content">\n' +
                            '        <!--    添加等操作    -->\n' +
                            '        <div class="public-column-bottom-10">\n' +
                            '            <button class="layui-btn public-btn-sm goodsstyle-add" >添加</button>\n' +
                            '        </div>\n' +
                            '        <div class="public-content-table">\n' +
                            '            <table class="layui-hide" id="goodsstyle-content" lay-filter="goodsstyle-content"></table>\n' +
                            '        </div>\n' +
                            '        <script type="text/html" id="goodsstyle-barDemo">\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon layui-icon-delete"></i>删除</a>\n' +
                            '        <\/script>\n' +
                            '    </div>' +
                            '</div>'
                        ,cancel: function(index, layero){
                            tableIns.reload({
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
                        }
                    })
                    form.render();
                    let tableIns = table.render({
                        elem: '#goodsstyle-content'
                        ,where:{request:200,goods_id:data.goods_id}
                        , url: public_url + 'index.html'
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'goodsstyle_id', width: 80, title: 'ID', sort: true}
                            , {field: 'username', width: '', title: '款式名称'}
                            , {field: 'price', width: 120, title: '价格'}
                            , {field: 'regular_price', width: 120, title: '原价'}
                            , {field: 'available', width: 120, title: '库存'}
                            , {fixed: 'right', title: '操作', toolbar: '#goodsstyle-barDemo', width: 170}
                        ]]
                        , limit: 10
                        , page: true
                    });
                    function goodsstyleAdd(val='',url,goodsId) {
                        return '<div class="public-padding-10">' +
                            '<form class="layui-form layui-form-pane" action="'+url+'">' +
                            '<input value="'+$.Public.values(val.goodsstyle_id)+'" name="goodsstyle_id" type="hidden" />' +
                            '<input value="'+goodsId+'" name="goods_id" type="hidden" />' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">款式名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+$.Public.values(val.username)+'" name="username" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">价格</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" name="price"  value="'+$.Public.values(val.price)+'" autocomplete="off" placeholder="请输入名称" class="layui-input price">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">原价</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" name="regular_price" value="'+$.Public.values(val.regular_price)+'" autocomplete="off" placeholder="请输入名称" class="layui-input regular_price">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">库存</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" name="available" value="'+$.Public.values(val.available,2000)+'" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">排序</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" name="sort" value="'+$.Public.values(val.sort,10)+'" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>';
                    }
                    $('.goodsstyle-add').bind('click', function() {
                        let add_url = public_url + 'add.html';
                        $.Public.yzPost({
                            type:'post',
                            url:add_url,
                            data:'',
                            success:function () {
                                layer.open({
                                    title: '添加产品款式'
                                    , type: 1
                                    , area: ['400px', '500px']
                                    , closeBtn: 1
                                    , shade: 0.3
                                    , id: 'LA_laye_goodscarousel'
                                    , moveType: 1
                                    , zIndex:54
                                    , content: goodsstyleAdd('',add_url,data.goods_id)
                                    ,cancel: function(index, layero){
                                        tableIns.reload({
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                    }
                                })
                                $('.price,.regular_price').bind('blur', function() {
                                    $.Public.onkeyup($(this))
                                });
                            }
                        });
                    });
                    //编辑/删除
                    table.on('tool(goodsstyle-content)',function(obj) {
                        let goodsstyle = obj.data;
                        if(obj.event == 'edit') {
                            let add_url = public_url + 'edit.html';
                            $.Public.yzPost({
                                type:'post',
                                url:add_url,
                                data:'',
                                success:function () {
                                    layer.open({
                                        title: '修改产品款式'
                                        , type: 1
                                        , area: ['400px', '500px']
                                        , closeBtn: 1
                                        , shade: 0.3
                                        , id: 'LA_laye_goodscarousel'
                                        , moveType: 1
                                        , zIndex:54
                                        , content: goodsstyleAdd(goodsstyle,add_url,data.goods_id)
                                        ,cancel: function(index, layero){
                                            tableIns.reload({
                                                page: {
                                                    curr: 1 //重新从第 1 页开始
                                                }
                                            });
                                        }
                                    })
                                    $('.price,.regular_price').bind('blur', function() {
                                        $.Public.onkeyup($(this))
                                    });
                                }
                            });
                        }else if(obj.event == 'del') {
                            let id = goodsstyle.goodsstyle_id;
                            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                                layer.close(index);
                                $.Public.post({
                                    type: 'post',
                                    url: public_url + 'del.html',
                                    data: {'goodsstyle_id':id,goods_id:data.goods_id},
                                    success: function(msg) {
                                        tableIns.reload();
                                    }
                                })
                            })
                        }
                    })
                }
            })
        }else if(obj.event == 'parameter'){
            let public_url = $.Public.url + 'rarameter/';
            let add_url = public_url + 'index.html';
            $.Public.yzPost({
                type: 'post',
                url: add_url,
                data: '',
                success: function () {
                    layer.open({
                        title: '产品参数'
                        , type: 1
                        , area: ['900px', '600px']
                        , closeBtn: 1
                        , shade: 0.3
                        , id: 'LA_layer'
                        , moveType: 1
                        , zIndex: 50
                        , content: '<div class="public-padding-10">' +
                            '<!--  内容   -->\n' +
                            '    <div class="public-content">\n' +
                            '        <!--    添加等操作    -->\n' +
                            '        <div class="public-column-bottom-10">\n' +
                            '            <button class="layui-btn public-btn-sm rarameter-add" >添加</button>\n' +
                            '        </div>\n' +
                            '        <div class="public-content-table">\n' +
                            '            <table class="layui-hide" id="rarameter-content" lay-filter="rarameter-content"></table>\n' +
                            '        </div>\n' +
                            '        <script type="text/html" id="rarameter-barDemo">\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-xs " lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>\n' +
                            '            <a href="javascript:;" class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon layui-icon-delete"></i>删除</a>\n' +
                            '        <\/script>\n' +
                            '    </div>' +
                            '</div>'
                    })
                    form.render();
                    let tableIns = table.render({
                        elem: '#rarameter-content'
                        ,where:{request:200,goods_id:data.goods_id}
                        , url: public_url + 'index.html'
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'parameter_id', width: 80, title: 'ID', sort: true}
                            , {field: 'title', width: 200, title: '标题'}
                            , {field: 'content', width: '', title: '内容'}
                            , {field: 'sort', width: 120, title: '排序'}
                            , {fixed: 'right', title: '操作', toolbar: '#rarameter-barDemo', width: 170}
                        ]]
                        , limit: 10
                        , page: true
                    });
                    function rarameterAdd(val='',url,goods_id='') {
                        return '<div class="public-padding-10">' +
                            '<form class="layui-form layui-form-pane" action="'+url+'">' +
                            '<input value="'+$.Public.values(val.parameter_id)+'" name="parameter_id" type="hidden" />' +
                            '<input value="'+$.Public.values(goods_id)+'" name="goods_id" type="hidden" />' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">标题</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" value="'+$.Public.values(val.title)+'" name="title" autocomplete="off" placeholder="请输入名称" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">内容</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="text" name="content"  value="'+$.Public.values(val.content)+'" autocomplete="off" placeholder="请输入内容" class="layui-input price">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">排序</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '      <input type="number" name="sort" value="'+$.Public.values(val.sort,10)+'" autocomplete="off" placeholder="请输入排序" class="layui-input">\n' +
                            '    </div>\n' +
                            '  </div>' +
                            '   <div class="layui-form-item public-center">\n' +
                            '      <button type="submit" class="layui-btn" lay-submit="" lay-filter="submit">立即提交</button>\n' +
                            '    </div>\n' +
                            '</form>' +
                            '</div>';
                    }
                    $('.rarameter-add').bind('click',function() {
                        let add_url = public_url + 'add.html';
                        $.Public.yzPost({
                            type:'post',
                            url:add_url,
                            data:'',
                            success:function () {
                                layer.open({
                                    title: '添加产品参数'
                                    , type: 1
                                    , area: ['400px', '300px']
                                    , closeBtn: 1
                                    , shade: 0.3
                                    , id: 'LA_laye_goodscarousel'
                                    , moveType: 1
                                    , zIndex:54
                                    , content: rarameterAdd('',add_url,data.goods_id)
                                    ,cancel: function(index, layero){
                                        tableIns.reload({
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                    }
                                })

                            }
                        });
                    });
                    
                    table.on('tool(rarameter-content)',function(obj) {
                        let data = obj.data;
                        if(obj.event == 'del') {
                            layer.confirm('确定要删除么?', {icon:3,title:'提示'}, function(index) {
                                layer.close(index);
                                $.Public.post({
                                    type: 'post',
                                    url: public_url + 'del.html',
                                    data: {parameter_id:data.parameter_id},
                                    success: function(msg) {
                                        tableIns.reload();
                                    }
                                })
                            })
                        }else if(obj.event == 'edit'){
                            let add_url = public_url + 'edit.html';
                        $.Public.yzPost({
                            type:'post',
                            url:add_url,
                            data:'',
                            success:function () {
                                layer.open({
                                    title: '修改产品参数'
                                    , type: 1
                                    , area: ['400px', '300px']
                                    , closeBtn: 1
                                    , shade: 0.3
                                    , id: 'LA_laye_goodscarousel'
                                    , moveType: 1
                                    , zIndex:54
                                    , content: rarameterAdd(data,add_url,data.goods_id)
                                    ,cancel: function(index, layero){
                                        tableIns.reload({
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                    }
                                })

                            }
                        });
                        }
                    })

                }
            })
        }
    })


    //监听提交
    form.on('submit(submit)', function(data){
        var action = data.form.action;
        var field = data.field;
        field.home_img = Img; //图片
        $.Public.post({
            type:'post',
            url: action,
            data: field,
            success: function() {
                ImgUser = '';
                Img = '';
                if(typeof field.string == 'string') {
                    layer.closeAll();
                    $.Public.locationHref();
                }
            },
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