var telNum = $('#telnum');
var confirmBtn = $('.confirm-btn');
var defaultnum = $('#defaultnum');

var userTel = getCookie('userTel');

if (userTel != 0) {
    defaultnum.val(userTel);
} else {
    defaultnum.parent('.form-item').hide();
}


confirmBtn.on('click', function() {
    if (telNum.val().length !== 11) {
        alertInfo('请输入正确的手机号码');
    } else {
        let data = telNum.val();
            // var params = $('.edit-form').serializeArray();
            // console.info(params);
            // params = decodeURIComponent(params, true);
        _post({
            url: '/home/manage/edittel.html',
            data: form('.edit-form'),
            success:function (msg) {
                console.info(msg)
            }
        })
    }
});

