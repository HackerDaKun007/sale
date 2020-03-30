var userName = getCookie('userName');
var userImg = getCookie('userImg');

var clientInfoEl = $('.client-info');
var clientInfoHtml = '';

if (userImg || userName) {
    clientInfoHtml = `
        <div class="avatar"><img src=${userImg} alt=""></div>
        <div class="client-name">${userName}</div>
    `;
    clientInfoEl.html(clientInfoHtml);
}