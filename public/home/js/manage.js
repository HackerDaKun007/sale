var tipsEl = $('#tips');
var initPassEl = $('#initial-pass');
var clientInfoEl = $('.client-info');
var clientInfoHtml = '';

var userName = getCookie('userName');
var memberUser = getCookie('memberUser');
var userImg = getCookie('userImg');
var initialPass = getCookie('initialPass');

if (initialPass != null && initialPass != '' && initialPass != 0) {
  initPassEl
    .eq(0)
    .find('.pass')
    .html(initialPass);
  tipsEl.show();
} else {
  tipsEl.hide();
  initPassEl.hide();
}

clientInfoHtml = `
    <div class="avatar"><img src=${userImg} alt=""></div>
    <div class="client-name">
      <p class="name">${userName}</p>
      <p class="id">会员名：${memberUser}</p>
    </div>
`;
clientInfoEl.html(clientInfoHtml);
