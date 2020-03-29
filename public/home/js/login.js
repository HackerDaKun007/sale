;
$(function () {
    var username = $('#username');
    var password = $('#password');
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

        if (username.val().length < 2) {
            alertInfo('请输入用户名');
            username.focus();

        } else if (password.val().length < 6) {
            alertInfo('请输入密码');
            password.focus();
        } else if (verify.val().length != 4) {
            alertInfo('验证码不正确');
            verify.focus();
        } 

        return false;
    });

    var imgUrl = '../temp-images/yz.jpg';
    verifyImg.attr('src',imgUrl);
    // 点击验证码图片并附加随机数
    verifyImg.on('click', function() {
        let code = Math.random()*1000;
        $(this).attr('src',imgUrl + '?id=' + code);
    });
});