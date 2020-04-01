var editForm = $('.edit-form');
var verifyImg = $('.verify-img');
var initPass = getCookie('initialPass');

editForm.find('.confirm-btn').bind('click', function () {
    let form = getForm(editForm);
    if (form[0].value.length < 6) {
        alertInfo('请输入原先的密码');

    } else if (form[1].value.length < 6) {
        alertInfo('请输入新密码');

    } else if (form[2].value != form[1].value) {
        alertInfo('两次密码不相同');

    } else if (form[3].value.length != 4) {
        alertInfo('验证码不正确');

    }  else {
        if (initPass != '' && initPass != null && initPass != 0) {
            if (initPass != form[0].value) {
                alertInfo('原先密码不正确');
                return false;
            }
        }
        _post({
            url: '/home/manage/editpasswod.html',
            data: form,
            success: function(msg) {
                if (msg.code == 1) {
                    $('input').val('');
                } 
                getYZM();
            }
        })
        
    }
});

// verifyImg.attr('src', imgUrl);
// 点击验证码图片并附加随机数
verifyImg.on('click', function () {
    getYZM();
});

function getYZM() {
    
    let imgUrl = '/home/manage/yzm.html';
    let code = Math.random() * 1000;
    verifyImg.attr('src', imgUrl + '?id=' + code);
    
}