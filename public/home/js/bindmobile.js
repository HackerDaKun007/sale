var telNum = $('#telnum');
var confirmBtn = $('.confirm-btn');

var userTel = getCookie('userTel');

if (userTel) {
    telNum.val(userTel);
}

confirmBtn.on('click', function() {
    if (telNum.val().length !== 11) {
        alertInfo('请输入正确的手机号码');
    }
});
