var oldPassword = $('#oldpassword');
var password = $('#password');
var password2 = $('#password2');
var editForm = $('.edit-form');
var verify = $('#verify');
var verifyImg = $('.verify-img');

verify.on('input', function() {
    let value = $(this).val();
    if (value.length > 4) {
        value = value.slice(0,4);
        $(this).val(value);
    }
})

editForm.find('.confirm-btn').bind('click', function () {

    if (oldPassword.val().length < 6) {
        alertInfo('请输入原先的密码');
        oldPassword.focus();

    } else if (password.val().length < 6) {
        alertInfo('请输入新密码');
        password.focus();
    } else if (password2.val() != password.val()) {
        alertInfo('两次密码不相同');
        password2.focus();

    } else if (verify.val().length != 4) {
        alertInfo('验证码不正确');
        verify.focus();
    }

    return false;
});

var imgUrl = '../../temp-images/yz.jpg';
verifyImg.attr('src', imgUrl);
// 点击验证码图片并附加随机数
verifyImg.on('click', function () {
    let code = Math.random() * 1000;
    $(this).attr('src', imgUrl + '?id=' + code);
});