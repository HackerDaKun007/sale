var telNum = $('#telnum');
var confirmBtn = $('.confirm-btn');
var defaultnum = $('#defaultnum');

var userTel = getCookie('userTel');

if (userTel != 0) {
    let val = userTel.slice(0, 3) + '****' + userTel.slice(7, userTel.length);
    defaultnum.val(val);
    defaultnum.parent('.form-item').show();
} else {
    defaultnum.parent('.form-item').hide();
}



confirmBtn.on('click', function() {
    let form = getForm('.edit-form');
    let tel = form[0]['value'];
    if (tel.length !== 11) {
        alertInfo('请输入正确的手机号码');
    } else {      
        if (tel != userTel) {
            _post({
                url: '/home/manage/edittel.html',
                data: form,
                success:function (msg) {
                    if (msg.code == 1 ) {
                        let val = tel.slice(0, 3) + '****' + tel.slice(7, tel.length);
                        defaultnum.val(val);
                        defaultnum.parent('.form-item').show();
                        $('#telnum').val('');
                    }
                }
            })   
        } else {
            alertInfo('您输入的号码与默认号码一致');
        }
    }
});

