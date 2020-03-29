
var orderStatus = $('.order-status');
var deliveryNum = 1224544444; //测试
orderStatus.bind('click', function() {
    copy(deliveryNum);
});

// $('#toAfterSale').on('click', function() {
//     location.href = '/mine/aftersale.html';
//     return false;
// })