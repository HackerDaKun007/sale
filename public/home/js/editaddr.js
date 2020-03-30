var username = $('#username');
var telnum = $('#telnum');
var region = $('#city-picker');
var address = $('#address');
var addressForm = $('.address-form');

addressForm.find('.confirm-btn').bind('click', function () {
    let form = getForm(addressForm);
    
    if (form[0].value.length < 2) {
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
                console.log(msg);
                
            }
        })
    }
});    
   
    // let refer = document.referrer;
    // let splitArr = refer.split('/');
    // alert(splitArr);
    // $('.back-btn').on('touchstart', function() {
    //   // if (splitArr.indexOf('order') != -1) {
    //   //   alert(123)
        
    //   //   location.assign(refer);
    //   //   location.reload();
    //   // }
    //   window.history.back();
    //   return false;
      
    // })
    // console.log(refer);
    
