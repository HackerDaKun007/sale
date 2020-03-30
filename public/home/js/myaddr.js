var userId = getCookie('userId');

var addressList = $('.address-list');
var addressListHtml = '';

addressListHtml += `
    <li class="address-item">
        <div class="first-word">${e.username[0]}</div>
        <div class="address-detail">
            <span class="name">${e.username}</span>
            <span class="telnum">${e.tel}</span>
            <div class="address">
                <p>
                    ${e.area}${e.adder}
                </p>
            </div>
        </div>
        <a href="/home/mine/editaddress.html?useraddress_id=${e.useraddress_id}" class="edit">编辑</a>
    </li>
`;
