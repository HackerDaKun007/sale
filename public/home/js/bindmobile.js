var telNum = $('#telnum');
var confirmBtn = $('.confirm-btn');
var defaultnum = $('#defaultnum');

var userTel = getCookie('userTel');

if (userTel != 0) {
    let val = userTel.slice(0, 3) + userTel.slice(7, userTel.length-1);
    defaultnum.val(val);
    defaultnum.parent('.form-item').show();
} else {
    defaultnum.parent('.form-item').hide();
}


confirmBtn.on('click', function() {
    if (telNum.val().length !== 11) {
        alertInfo('请输入正确的手机号码');
    } else {
        _post({
            url: '/home/manage/edittel.html',
            data: form('.edit-form'),
            success:function (msg) {
                
            }
        })
    }
});

