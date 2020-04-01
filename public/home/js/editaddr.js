var backBtn = $('.public-back');
var addressForm = $('.address-form');
var dataEl = $('#data');
var delBtn = $('.del-btn');

if (dataEl.length > 0) {
    var data = getJson(dataEl);
    addressForm.find('#username').val(data.username);
    addressForm.find('#tel').val(data.tel);
    addressForm.find('#city-picker').val(data.area);
    addressForm.find('#address').val(data.adder);
    addressForm.find('#addrid').val(data.useraddress_id);
    var useraddressId = getCookie('useraddressId');
    if(useraddressId != '' && useraddressId != null) {
        if(useraddressId == data.useraddress_id) {
            $('#is_default').prop('checked',true);
        }
    }
}

// 阻止双击事件
addressForm.find('.submit-btn').bind('doubleclick', function(e) {
    e.preventDeafult();
});

// 验证并提交修改和新增地址数据
addressForm.find('.submit-btn').bind('click', function () {
    let form = getForm(addressForm);
    
    if (form[0].value.length < 1) {
        alertInfo('请输入收货人姓名');

    } else if (form[1].value.length != 11 && typeof +form[1].value != 'number') {
        alertInfo('请输入手机号码');

    } else if (!form[2].value) {
        alertInfo('请选择所在地区');

    } else if (form[3].value.length < 5) {
        alertInfo('请填写详细地址');

    } else {
        _post({
            url: '',
            data: form,
            success: function(msg) {
                if (msg.code == 1) {
                    if (!data) {
                        $('input').val(''); 
                    }
                }     
            }
        })
    }
});    

// 删除地址
delBtn.bind('click', function() {
    if (data) {
        let value = addressForm.find('#addrid').val();
        popConfirm({
            info: '确定要删除地址吗？',
            success: function() {
                _post({
                    url: '/home/mine/deladder.html',
                    data: {'useraddress_id': value},
                    success: function(msg) {
                        toBackFun();
                    }
                });
            }
        })
    }
})

// 返回上一页并更新页面
backBtn.bind('click', function(e) {
    // e.preventDeafult();
    toBackFun();
});

function toBackFun() {
    let refer = document.referrer;
    location.replace(refer);
    return false;
}

