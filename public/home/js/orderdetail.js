var orderStatus = $('.order-status');
var deliveryNum = 1224544444; //测试
orderStatus.bind('click', function () {
    copy(deliveryNum);
});

var data = getJson($('#data'));
$('#data').remove();
console.log(data);

var orderTime = new Date(data.create_time * 1000).format("yyyy-MM-dd hh:mm:ss");

var clientDetail = $('.client-detail .detail');
var goodsDetail = $('.goods-detail');
var orderPrice = $('.order-price');
var orderInfo = $('.order-info ul');
var remark = $('.remark');

var orderStatusHtml = '';
var clientDetailHtml = '';
var goodsDetailHtml = '';
var orderPriceHtml = '';
var orderInfoHtml = '';
var remarkHtml = '';


if (data) {
    let statusText = '';
    for (let i of order_status) {
        if (i.code == data.order_status) {
            statusText = i.value;
        }
    }
    orderStatusHtml = `
        <p class="status">${statusText}</p>
        <p class="info">物流公司：${data.express}</p>
        <p class="delivery-num">快递单号：${data.express_number}</p>
        `;

    clientDetailHtml = `
        <p class="username">${data.username} <span>${data.tel}</span></p>
        <p class="address">${data.area + data.adder}</p>
        `;

    goodsDetailHtml = `
        <img src=${imageUrl + data.img}>
        <div class="name">
            <p class="goodsname">${data.goods_user}</p>
            <p class="goodstype">${data.goods_style}</p>
        </div>
        <div class="price">
            <p>￥${data.price}</p>
            <p>×${data.number}</p>
        </div>
        `;

    orderPriceHtml = `
        <div class="top">
            <div>
                <p>订单金额：</p>
                <p>￥${data.zoprice}</p>
            </div>
            <div>
                <p>运费：</p>
                <p>${data.freight}</p>
            </div>
            <div>
                <p>优惠折扣：</p>
                <p>0</p>
            </div>
        </div>
        <div class="bottom">
            <p>实付金额：</p>
            <p>￥${data.zoprice}</p>
        </div>
        `;

    if (data.user_back != '' && data.user_back != null) {
        remark.show();
        remarkHtml = `
            <p>用户备注：</p>
            <p class="text">
                ${data.user_back}
            </p>
            `;
        remark.html(remarkHtml);
    } else {
        remark.hide();
    }

    orderInfoHtml = `
        <li class="info-item">
            <span>下单时间</span>
            <span>${orderTime}</span>
        </li>
        <li class="info-item">
            <span>订单编号</span>
            <span>${data.order_number}</span>
        </li>
        `;


    clientDetail.html(clientDetailHtml);
    orderStatus.html(orderStatusHtml);
    goodsDetail.html(goodsDetailHtml);
    orderPrice.html(orderPriceHtml);
    orderInfo.html(orderInfoHtml);
}