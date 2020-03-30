var backBtn = $('.public-back');
var addressForm = $('.address-form');

var data = decodeURIComponent($('#data').html(), true);
data = JSON.parse(data);

if (data) {
    addressForm.find('#username').val(data.username);
    addressForm.find('#tel').val(data.tel);
    addressForm.find('#city-picker').val(data.area);
    addressForm.find('#address').val(data.adder);
    addressForm.find('#addrid').val(data.useraddress_id);
}
console.log(data);

// 阻止双击事件
addressForm.find('.confirm-btn').bind('doubleclick', function(e) {
    e.preventDeafult();
});

// 验证并提交修改和新增地址数据
addressForm.find('.confirm-btn').bind('click', function () {
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
                    $('input').val('');     
                }     
                console.log(msg);
                
            }
        })
    }
});    

// 返回上一页并更新页面
backBtn.bind('click', function() {
    let refer = document.referrer;
    location.replace(refer);
    return false;
});

