var data = getJson($('#data'));

var totalList = $('#total');
var notDeliveryList = $('#not-delivery');
var deliveryList = $('#delivery');

var navList = $('.order-nav ul li');
var orderList = $('.order-list');

var hashValue = location.hash;

if (hashValue != '' && hashValue != null) {
    let a = navList.dataset == hashValue;
    navList.removeClass('active');
    navList.each(function(e) {
        let $this = $(this);
        let value = $this.data().hash;
        if (value == hashValue) {
            $this.addClass('active');
        }
    })
    
    orderList.removeClass('active');
    // navList.eq(navIndex).addClass('active');
    $('.main').find(hashValue).addClass('active');
    
}

navList.on('click', function () {
    let $this = $(this);
    let index = $this.index();

    navList.removeClass('active');
    $this.addClass('active');
    orderList.removeClass('active');
    orderList.eq(index).addClass('active');
});

var totalListHtml = '';
var notDeliveryListHtml = '';
var deliveryListHtml = '';

if (data) {
    // 保留原数组并翻转数组
    let newData = JSON.parse(JSON.stringify(data));
    newData.reverse();

    if (newData.length > 0) {   
        let statusText = '';
        newData.forEach(function (e) {
            for (let i of order_status) {
                if (i.code == e.order_status) {
                    statusText = i.value;
                }
            }
            
            totalListHtml += `
            <li class="list-item">
                <a href="/home/order/orderdetail.html?id=${e.order_number}">
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
                    <a href="/home/order/orderdetail.html?id=${e.order_number}">
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
                    <a href="/home/order/orderdetail.html?id=${e.order_number}">
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
        if(totalListHtml != '') {
            totalList.append(totalListHtml);
        }else {
            totalList.append(publicMycollect('订单'));
        }
        if(notDeliveryListHtml != '') {
            notDeliveryList.append(notDeliveryListHtml);
        }else {
            notDeliveryList.append(publicMycollect('订单'));
        }
        if(deliveryListHtml != '') {
            deliveryList.append(deliveryListHtml);
        }else {
            deliveryList.append(publicMycollect('订单'));
        }
    }
    else {
        $('.main').after(publicMycollect('订单'));
    }
}
else {
    $('.main').after(publicMycollect('订单'));
}
