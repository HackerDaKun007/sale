var genderId = getCookie('userSex');
var maleEl = $('#male');
var femaleEl = $('#female');

var editForm = $('.edit-form');
var checked = $('.checked');

if (genderId == 1 ) {
  maleEl.prop('checked', true);
} else {
  femaleEl.prop('checked', true);
}
  checked.on('click', function() {
    $('.checked')
      .find('input')
      .prop('checked', false);
    $(this)
      .find('input')
      .prop('checked', true);
  })

