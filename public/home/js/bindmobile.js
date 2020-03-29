;$(function() {
    var telNum = $('#telnum');
    var confirmBtn = $('.confirm-btn');

    confirmBtn.on('click', function() {
        if (telNum.val().length !== 11) {
            alertInfo('请输入正确的手机号码');
        }
    })
});