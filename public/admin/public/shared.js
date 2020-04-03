//shared.js  大坤构造库
(function ($) {

    // 404没权限，500没登陆
    $.Public = {};
    $.Public.kaiDateTime = parseInt($('#dateTime').html());
    $.Public.url = '/admin/';
    $.Public.images = '/Upload/';  //默认图片地址
    $.Public.imagesBack = '/public/img/back.png';  //默认背景图片
    $.Public.api = '/api/';//API接口页面
    $.Public.form = $('form').attr('action');
    $.Public.body = $('.layui-body');
    $.Public.values = '';  //提交事件后返回值

    //z-index最高
    $.Public.zIndex = function() {
        var maxZ = Math.max.apply(null,
            $.map($('body *'), function(e,n) {
                if ($(e).css('position') != 'static')
                    return parseInt($(e).css('z-index')) || 1;
            }));
        return maxZ;
    }

    //layui-load中显示背景加载中...
    $.Public.load = function() {
        $('.layui-body').html('<div class="layui-load" style="z-index: '+$.Public.zIndex()+'">\n' +
            '            <div class="layui-load-sub">\n' +
            '                <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop" ></i>\n' +
            '                <p>加载中...</p>\n' +
            '            </div>\n' +
            '        </div>');
    }
    //layui-load中显示加载中...
    $.Public.load_tips = function() {
        let layui_body = $('body');
        $('.layui-load-tips').remove();
        layui_body.append('<div class="layui-load-tips layui-load" style="z-index: '+$.Public.zIndex()+'">\n' +
            '            <div class="layui-load-sub">\n' +
            '                <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>\n' +
            '                <p>加载中...</p>\n' +
            '            </div>\n' +
            '        </div>');
    }
    //删除layui-load中显示加载中...
    $.Public.load_tips_error = function() {
        $('.layui-load-tips').remove();
    }
    //显示失败等内容
    $.Public.Error = function(val='内容加载失败～!') {
        $('.layui-body').html(' <div class="layui-load">\n' +
            '            <div class="layui-load-sub">\n' +
            '                <i class="layui-icon layui-icon-face-cry" ></i>\n' +
            '                <p>'+val+'</p>\n' +
            '            </div>\n' +
            '        </div>');
    }

    //控制只能数字以及只能数字两位小数点，input输入获取信息：onblur=,obj=this,如：$.Public.onkeyup(this)
    $.Public.onkeyup=function(str) {
        let val = str.val();
        val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        val = val.replace(/^\./g,""); //验证第一个字符是数字
        val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        let num = val.split('.');
        if(val == '') {
            val = '00.00';
        }else if(num.length==1) {
            val = val+'.00';
        }else{
            if(num[1].length == 1) {
                val = val+'0';
            }
        }
        str.val(val);
    }



    //判断变量是否存在，存在就返回当前值
    $.Public.values = function(val,defaul=''){
        if(typeof val != undefined && typeof val != 'undefined' && val != ''){
            return val;
        }
        return defaul?defaul:'';
    }

    //判断图片是否存在，存在就返回当前值，不存在就返回一直白底图
    $.Public.valImg = function(val){
        if(typeof val != undefined && val != '' && val != null){
            return val;
        }
        return '/public/img/back.png';
    }

    $.Public.turnTime = function(val,Y=true,H=true) {
        var date = new Date(val*1000);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var da = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if(Y && H) {
            return year+"-"+month+"-"+da+" "+hour+":"+minute+":"+second;
        }else if(!Y) {
            return year+"-"+month+"-"+da;
        }else if(!H) {
            return hour+":"+minute+":"+second;
        }
    }

    //checked选择
    $.Public.checked = function(data,val) {
        if(val == ''){
            val = 1;
        }
        if(data == val){
            return 'checked';
        }else{
            return '';
        }
    }
    //checked选择
    $.Public.selected = function(data,val) {
        if(val == ''){
            val = 1;
        }
        if(data == val){
            return 'selected';
        }else{
            return '';
        }
    }

    //弹出图片宽
    $.Public.popImg = function (val) {
        var img_json = {
            "start": 0, //初始显示的图片序号，默认0
            "data": [   //相册包含的图片，数组格式
                {
                    "alt": val.attr('alt'),
                    "pid": val.attr('layer-pid'), //图片id
                    "src": val.attr('src'), //原图地址
                    "thumb": val.attr('src') //缩略图地址
                }
            ]
        }
        layer.photos({
            photos: img_json
            ,anim: 5
            ,shade:.3
        });
    }


    //光标移开自动补全两位小数，input光标移开：onblur=,obj=this,如：$.Public.onblur(this)
    $.Public.money=function(obj) {
        var value = obj.value;
        if(value){
            value = parseFloat(value);
            var f = Math.round(value*100)/100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            obj.value = s;
        }else{
            obj.value = '00.00';
        }
    }

    //时间戳计算
    $.Public.datetime = function(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    //复制
    $.Public.fz = function(input) {
        input = input?input:document.getElementById("public-fuzhi");
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        layer.msg('复制成功',{icon:1,time:1000});
    }
    
    //鼠标移入显示信息
    $.Public.tooltip = function(){
        var x = 10;
        var y = 20;
        var newtitle = '';
        $('.tooltip').mouseover(function (e) {
            let width = $(window).width();
            if(width>768){
                newtitle = this.title;
                this.title = '';
                $('body').append('<div id="tooltip">' + newtitle + '</div>');
                var bo = $('body').width() - 40;
                var ce = e.pageX + x;
                if (ce > bo) {
                    ce = bo;
                }
                $('#tooltip').css({
                    'left': (ce + 'px'),
                    'top': (e.pageY + y + 'px'),
                }).show();
            }
        }).mouseout(function () {
            this.title = newtitle;
            $('#tooltip').remove();
        }).mousemove(function (e) {
            var bo = $('body').width() - 40;
            var ce = e.pageX + x;
            if (ce > bo) {
                ce = bo;
            }
            $('#tooltip').css({
                'left': (ce + 'px'),
                'top': (e.pageY + y + 'px')
            }).show();
        });
    }

    //判断当前数据是否为json数据
    $.Public.jsonYz = function(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch(e) {
        }
        return false;
    }

    $.Public.jp = '';

    //验证url是否正常，intr是否开启按钮禁用，url地址，data执行的方法，id按钮的位置，title按钮的名称
    $.Public.yzUlr = function(val) {
        $.Public.load(); //显示加载中...
        if(val.type == null && val.type == ''){
            val.type = 'GET';
        }
        if(val.arr == null && val.arr == ''){
            val.arr = '';
        }
        jQuery.support.cors = true;
        if($.Public.jp != '') {
            $.Public.jp.abort();
        }
        $.Public.jp = $.ajax({
            type: val.type,
            url: val.url,
            data:val.arr,
            timeout: 100000,
            beforeSend: function(xhr) {
                //1验证栏目地址是否有权限等
                xhr.setRequestHeader("addDate", '1');
            },
            success: function(msg){
                if ($.Public.jsonYz(msg) == true) {
                    let msgr = JSON.parse(msg);
                    $.Public.Error();
                    if(msgr.code == 404){  //没权限
                        layer.msg(msgr.msg,{icon:2,time:1000});
                    }else if(msgr.code == 500){ //没登录
                        layer.msg('请先登录！',{icon:2,time:1000},function(){
                            window.location.href = msgr.url;
                        });
                    }else {
                        layer.msg('数据异常',{icon:2,time:1000});
                    }
                }else{
                    if(val.load == '' || val.load == null) {
                        //加载成功返回内容
                        $('.layui-body').html(msg);
                    }else {
                        if(msg != null || msg != '') {
                            val.success();
                        }else {
                            val.success(msg);
                        }
                    }
                }
            },
            error: function(msg){
                $.Public.Error();
                if(val.error != null && val.error != ''){
                    val.error()
                }
                layer.msg('当前服务器异常，请联系技术员！',{icon:2,time:1000});
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                if(val.error != null && val.error != ''){
                    val.error()
                }
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    $.Public.Error();
                    data = 500;
                    ajaxTimeoutTest.abort();
                    layer.msg('服务器请求超时，请稍后再操作！',{icon:2,time:1000});
                }
            }
        })
    }


    //post/get验证处理
    $.Public.post = function(load){

        //验证地址是否正常
        jQuery.support.cors = true;
        $.Public.load_tips();
        if($.Public.jp != '') {
            $.Public.jp.abort();
        }
        $.Public.jp = $.ajax({
            type: load.type,
            url: load.url,
            data:load.data,
            timeout: 100000,
            beforeSend: function(xhr) {
                //2提交数据
                xhr.setRequestHeader("addDate", '2');
            },
            success: function(msg){
                $.Public.load_tips_error();
                if ($.Public.jsonYz(msg) == true) {
                    let msgData = JSON.parse(msg);
                    if(msgData.code == 404){  //没权限
                        layer.msg(msgData.msg,{icon:2,time:1000});
                    }else if(msgData.code == 500){ //没登录
                        layer.msg(msgData.msg,{icon:2,time:1000},function(){
                            window.location.href = msgData.url;
                        });
                    }
                    if(load.bool) { //判断是否自定义true是，false否
                        load.success(msgData);
                    }else {
                        if(msgData.code == 1){
                            layer.msg(msgData.msg,{icon:1,time:1000},function () {
                                load.success(msgData);
                            });
                        }else if(msgData.code == 0){
                            layer.msg(msgData.msg,{icon:2,time:1000});
                        }
                    }

                }else{
                    if (msg != '' || msg != null) {
                        load.success(msg);
                    }else{
                        load.success('');
                    }
                }
            },
            error: function(msg){
                $.Public.load_tips_error();
                if(load.error != null && load.error != ''){
                    load.error();
                }
                layer.msg('当前服务器异常，请联系技术员！',{icon:2,time:1000});
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                $.Public.load_tips_error();
                if(load.error != null && load.error != ''){
                    load.error();
                }

                if(status=='timeout'){//超时,status还有success,error等值的情况
                    ajaxTimeoutTest.abort();
                    layer.msg('服务器请求超时，请稍后再操作！',{icon:2,time:1000});
                }
            }
        })
    }

    //post/get验证处理地址是否有权限
    $.Public.yzPost = function(load){
        //验证地址是否正常
        jQuery.support.cors = true;
        $.Public.load_tips();
        if($.Public.jp != '') {
            $.Public.jp.abort();
        }
        $.Public.jp = $.ajax({
            type: load.type,
            url: load.url,
            data:load.data,
            timeout: 100000,
            beforeSend: function(xhr) {
                //1验证栏目地址是否有权限等
                xhr.setRequestHeader("addDate", '1');
            },
            success: function(msg){
                $.Public.load_tips_error();
                if ($.Public.jsonYz(msg) == true) {
                    let msgData = JSON.parse(msg);
                    if(msgData.code == 404){  //没权限
                        layer.msg(msgData.msg,{icon:2,time:1000});
                    }else if(msgData.code == 500){ //没登录
                        layer.msg(msgData.msg,{icon:2,time:1000},function(){
                            window.location.href = msgData.url;
                        });
                    }else{
                        load.success(msgData);
                    }
                }else{
                    if (msg != '' || msg != null) {
                        load.success(msg);
                    }else{
                        load.success('');
                    }
                }
            },
            error: function(msg){
                $.Public.load_tips_error();
                if(load.error != null && load.error != ''){
                    load.error();
                }
                layer.msg('当前服务器异常，请联系技术员！',{icon:2,time:1000});
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                $.Public.load_tips_error();
                if(load.error != null && load.error != ''){
                    load.error();
                }

                if(status=='timeout'){//超时,status还有success,error等值的情况
                    data = 500;
                    ajaxTimeoutTest.abort();
                    layer.msg('服务器请求超时，请稍后再操作！',{icon:2,time:1000});
                }
            }
        })
    }



    //获取for所有数据
    $.Public.form = function(val){
        var params = $(val).serializeArray();
        // params = decodeURIComponent(params, true);
        return params;
    };


    //
    $.Public.columnUrl = function() {
        $('.index-column-url').bind('click',function(){
            let $this = $(this);
            let url = $this.attr('url');
            if(url != null && url != ''){
                let shortURL = top.location.href.substring(0,top.location.href.indexOf('#'));
                let sui = Math.ceil(Math.random()*100);
                let title = $this.attr('title');
                history.pushState(sui,title,shortURL+'#'+url)
                $.Public.bodyUrl(url,sui,title);
            }
            return false;
        });
    }

    /*
   * 请求页面替换
   * @parat string 传入相关的url地址
   * */
    $.Public.bodyUrl = function(url,sui,title) {
        let shortURL = top.location.href.substring(0,top.location.href.indexOf('#'));
        history.replaceState(sui,title,shortURL+'#'+url);
        $.Public.yzUlr({
            type:'POST',
            arr:'',
            url:$.Public.url+url.substr(1,url.length),
        });
    }

    //获取当前URL地址并修改locationHref
    $.Public.locationHref = function() {
        let locationHref = window.location.href.split('#');
        if(locationHref.length > 1 && locationHref[1] != '/Index/index.html' && locationHref[1] != '/index/index.html'){
            $.Public.bodyUrl(locationHref[1]);
        }else{
            $.Public.bodyUrl('/Index/home.html');
        }
    }

    $.Public. columnChoice = function() {
        var columnHref = window.location.href.split('#');
        var columnData = '/Index/home.html';
        $('.index-column-url').each(function(){
            if(columnHref.length > 1){
                columnData = columnHref[1];
            }
            let $this = $(this);
            let url = $this.attr('url');
            if(url != ''){
                if($this.attr('url') == columnData){
                    $('.layui-side-scroll li').removeClass('layui-this');
                    $('.layui-side-scroll dd').removeClass('layui-this');
                    $('.layui-side-scroll a').removeClass('layui-this');
                    let parent = $this.parent('dd');
                    $this.addClass('layui-this');
                    //判断父级
                    if(parent.length > 0) {
                        parent.addClass('layui-nav-itemed');
                        parent.parent('dl').parent('li').addClass('layui-nav-itemed');
                    }else {
                        $this.parent('dl').parent('li').addClass('layui-nav-itemed');
                    }
                    return false;
                }
            }

        });
    }

})(jQuery);