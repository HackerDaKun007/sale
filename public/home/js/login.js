var username = $('#username');
var password = $('#password');
var editForm = $('.edit-form');
var verify = $('#verify');
var verifyImg = $('.verify-img');

verify.on('input', function () {
    let value = $(this).val();
    if (value.length > 4) {
        value = value.slice(0, 4);
        $(this).val(value);
    }
})

editForm.find('.confirm-btn').bind('click', function () {
    let form = getForm(editForm);

    if (form[0].value.length < 2) {
        alertInfo('请输入用户名');

    } else if (form[1].value.length < 6) {
        alertInfo('请输入密码');

    } else if (form[2].value.length != 4) {
        alertInfo('验证码不正确');

    }  else {
        _post({
            url: '/home/login/loginadd.html',
            data: form,
            success: function(msg) {
                if (msg.code == 1) {
                    location.replace('/');
                } else {
                    getYZM();
                }
            }
        })
    }
});

verifyImg.on('click', function () {
    getYZM();
});

function getYZM() {
    let imgUrl = '/home/manage/yzm.html';
    let code = Math.random() * 1000;
    verifyImg.attr('src', imgUrl + '?id=' + code);
}