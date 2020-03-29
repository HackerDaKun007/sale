// 测试数据
var data = [{
    userId: 00000,
    goods: [
        {
            id: 1,
            title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
            name: '飞克正品全自动机械手表',
            img: '/temp-images/img2.jpeg',
            value: {
                id: 01,
                name: '蓝色表盘',
                price: 499
            }
        }
    ],
    addressData: [{ 
            id: 101,
            username: '赵前',
            phone: 13425794121,
            address: '广东省广州市越秀区东园路123号'
        },
        {
            id: 102,
            username: '孙艺',
            phone: 13425794121,
            address: '广东省广州市越秀区东园路123号'
        },
        {
            id: 103,
            username: '李二',
            phone: 13425794121,
            address: '广东省广州市越秀区东园路123号'
        },
        {
            id: 104,
            username: '周吴',
            phone: 13425794121,
            address: '广东省广州市越秀区东园路123号'
        },
    ]
}];

var addressId = $('#address_id');
var goodsValue = $('#goods_value');
var addressInfo = $('.address-info');
var addressInfoHtml = '';
var addressList = $('.address-list');
var addressListHtml = '';
var goodsDetail = $('.goods-detail');
var goodsDetailHtml = '';
var price = $('.payment-bar .price');
var priceHtml = '';

var addressData = data[0].addressData;
if (addressData) {
    addressData.forEach(function (e, k) {
        if (k == 0) {
            addressId.val(e.id);
            addressInfoHtml = `
                <div class="address-detail" id="haveaddress">
                    <i class="iconfont icon-iconfontdingwei"></i>
                    <div class="address">
                    <div class="top">
                        <span class="name">${e.username}</span>
                        <span class="telnum">${e.phone}</span>
                    </div>
                    <div class="bottom">${e.address}</div>
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
                    <span class="telnum">${e.phone}</span>
                </div>
                <div class="bottom">${e.address}</div>
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

var goodsData = data[0].goods[0];
goodsValue.val(goodsData.value.id);
goodsDetailHtml = `
    <img src=${goodsData.img}>
    <div>
    <div class="goodsinfo">
        <p class="goodsname">${goodsData.name}</p>
        <p class="goodstype">${goodsData.value.name}</p>
    </div>

    <p class="price">
        ￥${goodsData.value.price}/件
    </p>
`;
priceHtml = ` <span>实付款：</span>
        <span>￥${goodsData.value.price}</span>`

addressInfo.html(addressInfoHtml);
addressList.html(addressListHtml);
goodsDetail.html(goodsDetailHtml);

var toAddressPage = $('#haveaddress');
var addressPage = $('#address-page')
var main = $('.main');
var pageHeader = $('.public-header');

var addressItem = $('.address-item');
addressItem.on('click', function() {
    
    let index = $(this).index();
    let address = addressData[index];
    addressId.val(address.id);

    addressHtml = `
        <i class="iconfont icon-iconfontdingwei"></i>
        <div class="address">
        <div class="top">
            <span class="name">${address.username}</span>
            <span class="telnum">${address.phone}</span>
        </div>
        <div class="bottom">${address.address}</div>
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
})
var form = $('#form');
var formData = getForm(form);
console.log(formData);


// 增加和减少购买数量
var decreaseBtn = $('#decrease');
var increaseBtn = $('#increase');
var buyNumber = $('#buynumber');

decreaseBtn.on('click', function () {
    let val = buyNumber.val() * 1;
    let num = val > 1 ? val - 1 : 1;
    buyNumber.val(num);
    return false;
})
increaseBtn.on('click', function () {
    let val = buyNumber.val() * 1;
    let num = val < 5 ? val + 1 : 5;
    buyNumber.val(num);
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
            goodsId: 12245,
            num,
            date: nowTime
        }
        orderStore.push(orderInfo);
        num++;
        localStorage.setItem('order', JSON.stringify(orderStore));
        
        // 提交数据
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
        window.location.href = '../../index.html';
    }, time2);
    clearInterval(timer);
}, time);


