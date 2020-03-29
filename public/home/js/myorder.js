$(function() {
    var navList = $('.order-nav ul li');
    var orderList = $('.order-list');

    navList.on('click',function() {
        let $this = $(this);
        let index = $this.index();
        
        navList.removeClass('active');
        $this.addClass('active');
        orderList.removeClass('active');
        orderList.eq(index).addClass('active');
    });

})