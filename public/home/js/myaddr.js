// var userId = getCookie('userId');
var noContent = $('.no-content');
noContent.hide();
var addressList = $('.address-list');
var addressListHtml = '';

var addressData = getJson($('#adder'));

if (addressData) {
    noContent.hide();
    addressData.forEach(function (e) {
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
                <a href="/home/mine/editaddress.html?id=${e.useraddress_id}" class="edit">编辑</a>
            </li>
        `;
    })
    addressList.append(addressListHtml);
} else {
    noContent.show();
}