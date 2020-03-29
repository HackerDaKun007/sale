var tipsEl = $('#tips');
var initPassEl = $('#initial-pass');

document.cookie = `init_pass=2546789`;
var cookie = document.cookie;
var initPass = cookie.split('=')[1];

if (typeof +initPass == 'number') {
    initPassEl.eq(0).find('.pass').html(initPass);
    tipsEl.show();
}
else {
    tipsEl.hide();
    initPassEl.hide();
}
