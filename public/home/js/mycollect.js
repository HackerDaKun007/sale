var data = getJson($('#data'));

var list = $('.list');
var listHtml = '';

data.forEach(function(e) {
    if (e.cancel == 1) {
        listHtml += `
        <li>
            <a href="/home/goods/goodsdetail.html?id=${e.goods_id}&date_id=${e.rushdate_id}&time_id=${e.rushtime_id}">
                <img src=${imageUrl + e.img}>
                <div class="price">
                    <span>￥${e.price}</span>
                    <span>￥${e.orprice}</span>
                </div>
            </a>
        </li>
        `;
    }
});
list.append(listHtml);