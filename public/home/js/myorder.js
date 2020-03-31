var data = getJson($('#data'));
console.log(data);

var totalList = $('#total');
var notDeliveryList = $('#not-delivery');
var deliveryList = $('#delivery');

var totalListHtml = '';
var notDeliveryListHtml = '';
var DeliveryListHtml = '';

if (data) {

    // data.reverse();
    // console.log(data);
    let statusText = '';
    if (data.length > 0) {
        data.forEach(function (e) {
            for (let i of order_status) {
                if (i.code == e.order_status) {
                    statusText = i.value;
                }
            }
            totalListHtml += `
            <li class="list-item">
                <a href="/home/order/orderdetail.html?id=${order_number_pass}">
                    <img src=${imageUrl + e.img}>
                    <div class="order-info">
                        <p class="name">${e.goods_user}</p>
                        <div class="price">
                            <span>￥${e.price}</span>
                            <span>× ${e.number}</span>
                        </div>
                        <p class="tips">${statusText}</p>
                    </div>
                </a>
            </li>
            `;

            if (e.order_status == 1) {
                notDeliveryListHtml += `
                <li class="list-item">
                    <a href="/home/order/orderdetail.html?id=${order_number_pass}">
                        <img src=${imageUrl + e.img}>
                        <div class="order-info">
                            <p class="name">${e.goods_user}</p>
                            <div class="price">
                                <span>￥${e.price}</span>
                                <span>× ${e.number}</span>
                            </div>
                            <p class="tips">${statusText}</p>
                        </div>
                    </a>
                </li>
                `;
            }
            if (e.order_status == 2) {
                deliveryListHtml += `
                <li class="list-item">
                    <a href="/home/order/orderdetail.html?id=${order_number_pass}">
                        <img src=${imageUrl + e.img}>
                        <div class="order-info">
                            <p class="name">${e.goods_user}</p>
                            <div class="price">
                                <span>￥${e.price}</span>
                                <span>× ${e.number}</span>
                            </div>
                            <p class="tips">${statusText}</p>
                        </div>
                    </a>
                </li>
                `;
            }

        });
        totalList.append(totalListHtml);
        notDeliveryList.append(notDeliveryListHtml);
        deliveryList.append(deliveryListHtml);
    }
    // else {
    //     let html = `<div class="no-content">
    //         <i class="iconfont icon-border_color_px_rounded"></i>
    //         <p>您还没有相关的订单</p>
    //     </div>`;
    //     $('.main').after(html);
    // }
}
// else {
//     let html = `<div class="no-content">
//         <i class="iconfont icon-border_color_px_rounded"></i>
//         <p>您还没有相关的订单</p>
//     </div>`;
//     $('.main').after(html);
// }

var navList = $('.order-nav ul li');
var orderList = $('.order-list');

navList.on('click', function () {
    let $this = $(this);
    let index = $this.index();

    navList.removeClass('active');
    $this.addClass('active');
    orderList.removeClass('active');
    orderList.eq(index).addClass('active');
});


// var aLink = $('a');
// console.log(aLink);

// aLink.on('click', function(e) {
//     e.preventDefault();
//     location.replace(this.href);
// })