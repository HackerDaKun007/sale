;$(function() {
    var username = $('#username');
    var telnum = $('#telnum');
    var region = $('#city-picker');
    var address = $('#address');
    var addressForm = $('.address-form');

    addressForm.find('.confirm-btn').bind('click', function () {

        if (username.val().length < 2) {
            alertInfo('请输入收货人姓名');
            username.focus();

        } else if (telnum.val().length != 11) {
            alertInfo('请输入手机号码');
            telnum.focus();

        } else if (!region.val()) {
            alertInfo('请选择所在地区');

        } else if (address.val().length < 5) {
            alertInfo('请填写详细地址');
            address.focus();
        } 

        return false;
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
    
});