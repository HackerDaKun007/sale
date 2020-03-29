;$(function() {
    var maleEl = $('#male');
    var femaleEl = $('#female');
    var genderId = 0; //测试数据，0为男性 1为女性
    
    var editForm = $('.edit-form');
    var checked = $('.checked');
    checked.on('click',function() {
        $('.checked').find('input').prop('checked',false);
        $(this).find('input').prop('checked',true);
    });
    console.info();
    
})