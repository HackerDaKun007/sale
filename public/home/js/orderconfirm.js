var wxInfo = $('.wx-info');

wxInfo.on('click', function() {
    let id = $(this).find('#wx-id span').text();
    
    copy(id)
    popConfirm({
        info: '微信号已复制，是否跳转到微信添加客服？',
        success: toWxApp
    })
})

function toWxApp() {
    window.location.href='weixin://';
}