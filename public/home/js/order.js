var goodsData = getJson($('#goods'));
var addressData = getJson($('#useraddress'));
var buyNum = getSearchWord('num');
var goodsStyleId = getSearchWord('goodsstyle_id');
var buyNumber = $('#buynumber');
buyNumber.val(buyNum);



var goodsId = $('#goods_id');
var addressId = $('#address_id');
var goodsstyle_id = $('#goodsstyle_id');
var date_id = $('#date_id');
var time_id = $('#time_id');
goodsId.val(goodsData.goods_id);
goodsstyle_id.val(goodsStyleId);
date_id.val(getSearchWord('date_id'));
time_id.val(getSearchWord('time_id'));


var addressInfo = $('.address-info');
var addressInfoHtml = '';
var addressList = $('.address-list');
var addressListHtml = '';
var goodsDetail = $('.goods-detail');
var goodsDetailHtml = '';
var price = $('.payment-bar .price');
var priceHtml = '';

if (addressData) {
    addressData.forEach(function (e, k) {
        if (k == 0) {
            addressId.val(e.useraddress_id);
            addressInfoHtml = `
                <div class="address-detail" id="haveaddress">
                    <i class="iconfont icon-iconfontdingwei"></i>
                    <div class="address">
                    <div class="top">
                        <span class="name">${e.username}</span>
                        <span class="telnum">${e.tel}</span>
                    </div>
                    <div class="bottom">${e.area + e.adder}</div>
                    </div>
                    <i class="iconfont icon-right"></i>
                </div>`;
        }
        addressListHtml += `
            <li class="address-item">
                <div class="first-word">${e.username[0]}</div>
                <div class="address">
                <div class="top">
                    <span class="name">${e.username}</span>
                    <span class="telnum">${e.tel}</span>
                </div>
                <div class="bottom">${e.area + e.adder}</div>
                </div>
            </li>
            `;
    })
} else {
    addressInfoHtml = `<div id="noaddress">
    <form action="">
      <div class="form-item">
        <label for="username">姓　　名：</label>
        <input type="text" id="username" name="username" placeholder="请输入收货人姓名" />
      </div>
      <div class="form-item">
        <label for="telnum">手机号码：</label>
        <input type="text" id="telnum" name="telnum" placeholder="请输入手机号码" />
      </div>
      <div class="form-item">
        <label for="region">所在地区：</label>
        <input type="text" id="city-picker" name="region" readonly placeholder="点击选择所在地区" />
      </div>
      <div class="form-item">
        <label for="address">详细地址：</label>
        <input type="text" id="address" name="address" placeholder="请输入详细地址" />
      </div>
    </form>
  </div>`
}

var goodsStyleName = '';
var priceText = '';
var goodsPrice = 0;
for (let i of goodsData.sty) {
    if (i.goodsstyle_id == goodsStyleId) {
        goodsPrice = i.price;
        goodsStyleName =  `
        <p class="goodstype">${i.username}</p>
        `;
        priceText =  `
        ￥${i.price}/件
        `;
        priceHtml = ` <span>实付款：</span>
        <span id="total-price">￥${i.price * buyNum}</span>`
    }
}
goodsDetailHtml = `
    <img src=${goodsData.home_img}>
    <div>
    <div class="goodsinfo">
        <p class="goodsname">${goodsData.username}</p>
        ${goodsStyleName}
    </div>

    <p class="price">
        ${priceText}
    </p>
`;
addressInfo.html(addressInfoHtml);
addressList.html(addressListHtml);
goodsDetail.html(goodsDetailHtml);
price.html(priceHtml);

var toAddressPage = $('#haveaddress');
var addressPage = $('#address-page')
var main = $('.main');
var pageHeader = $('.public-header');

var addressItem = $('.address-item');
addressItem.on('click', function() {
    
    let index = $(this).index();
    let address = addressData[index];
    addressId.val(address.useraddress_id);

    addressHtml = `
        <i class="iconfont icon-iconfontdingwei"></i>
        <div class="address">
        <div class="top">
            <span class="name">${address.username}</span>
            <span class="telnum">${address.tel}</span>
        </div>
        <div class="bottom">${address.area + address.adder}</div>
        </div>
        <i class="iconfont icon-right"></i>
    `;
    addressPage.stop().animate({
        'margin-right': '-100%',
    }, 300, function () {
        main.show();
        pageHeader.show()
        addressPage.removeClass('active')
    });
    toAddressPage.html(addressHtml);
});

// 增加和减少购买数量
var decreaseBtn = $('#decrease');
var increaseBtn = $('#increase');
var totalPrice = $('#total-price');
decreaseBtn.on('click', function () {
    let val = buyNumber.val() * 1;
    let num = val > 1 ? val - 1 : 1;
    buyNumber.val(num);
    totalPrice.text('￥'+ num * goodsPrice);
    return false;
})
increaseBtn.on('click', function () {
    let val = buyNumber.val() * 1;
    let num = val < 5 ? val + 1 : 5;
    buyNumber.val(num);
    totalPrice.text('￥'+ num * goodsPrice);
    return false;
})

decreaseBtn.on('doubleclick', function (e) {
    e.preventDefault();
});
increaseBtn.on('doubleclick', function (e) {
    e.preventDefault();
});


var state = {
    title: "title",
    url: "#"
};
var orderAddr = false;
window.history.pushState(state, "title", "#");
window.addEventListener("popstate", function (e) {

    if (!orderAddr) {
        // 退出订单时询问下是否要取消订单
        popConfirm({
            info: '确认取消这条订单吗？',
            success: function () {
                window.history.replaceState(state, "title", "#");
                window.history.go(-1);
                return false;
            },
            error: function () {

                let state = {
                    title: "title",
                    url: "#"
                };
                window.history.replaceState(state, 'title', '#');
                window.history.pushState(state, "title", "#");
                window.addEventListener("popstate", function () {
                    window.history.replaceState(state, "title", "#");
                }, false);
            }
        });
    } else {
        orderAddr = true;
    }

    window.history.replaceState(state, "title", "#");
}, false);

// 切换到选择地址
toAddressPage.on('click', function () {
    orderAddr = false;
    main.hide();
    pageHeader.hide()
    addressPage.addClass('active')

    addressPage.stop().animate({
        'margin-right': '0',
    }, 300, function () {
        addressPage.css({
            'margin': '0 auto'
        });
    })

})

$('.address-back').on('click', function () {
    addressPage.stop().animate({
        'margin-right': '-100%',
    }, 300, function () {
        main.show();
        pageHeader.show();
        addressPage.removeClass('active');
    });
});

$('.add-btn').on('click', function (e) {
    // 不添加目标URL到历史URL堆栈
    e.preventDefault();
    location.replace(this.href);
});
let num = 1;
let orderStore = [];
var storeData;

$('#toPay').on('click', function (e) {
    let form = getForm($('#form'));

    // 获取localstorage的order信息
    let nowTime = Math.floor(Date.now() /1000);
    storeData = JSON.parse(localStorage.getItem('order'));

    // 判断order里的时间戳是否过期，如果超过24小时就删除这个localstorage
    if (storeData) {
        let a = storeData[storeData.length-1].date;
        a += 86400;
        if (a < nowTime) {
            localStorage.removeItem('order');
        }
    }
    // 设置localstorage
    if (storeData == null || storeData.length < 3) {
        let orderInfo = {
            goodsId: goodsData.goods_id,
            num,
            date: nowTime
        }
        orderStore.push(orderInfo);
        num++;
        localStorage.setItem('order', JSON.stringify(orderStore));
        
        // 提交数据
        _post({
            url: '/home/order/addorder.html',
            data: form,
            success: function(msg) {
                console.log(msg);
            }
        })
    }
    // 如果超过3条则不允许购买
    else if (storeData.length >= 3){
        alertInfo('已超过购买限制');
        setTimeout(function(){
            location.replace('/');
        },1000)
    }
})


// 用户在页面停留5分钟后跳出提示框
var time = 300000; //5分钟
var time2 = 30000; //30秒
var timer = setInterval(function () {
    singleConfirm('您的订单很快就失效了，请尽快支付');
    setTimeout(function () {
        window.location.href = '/';
    }, time2);
    clearInterval(timer);
}, time);


