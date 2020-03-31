var orderStatus = $('.order-status');
var deliveryNum = 1224544444; //测试
orderStatus.bind('click', function() {
    copy(deliveryNum);
});

var data = getJson($('#data'));
$('#data').remove();
console.log(data, $('#data'));


var clientDetial = $('.client-detial .detail');
var goodsDetial = $('.goods-detail');
var orderPrice = $('.order-price');
var orderInfo = $('.order-info ul');

var orderStatusHtml = '';
var clientDetialHtml = '';
var goodsDetialHtml = '';
var orderPriceHtml = '';
var orderInfoHtml = '';