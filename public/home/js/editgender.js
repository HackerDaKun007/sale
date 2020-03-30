var genderId = getCookie('userSex');
var maleEl = $('#male');
var femaleEl = $('#female');

var editForm = $('.edit-form');
var checked = $('.checked');

var confirmBtn = $('.confirm-btn');

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
});

var url = '/home/manage/';

confirmBtn.on('click', function() {
  let id = '';
  checked.find('input').each(function() {
    let $this = $(this);
    if($this.prop('checked')) {
      id = $this.val();
    }
  });
  if(id != genderId && id <= 2 && id >= 1) {
    _post({
        url:url+'editsex.html',
        data:{sex:id},
        success: function(msg) {
          console.log(msg);
        }
    });
  }
  
})


