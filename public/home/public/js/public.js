$(function() {
  let imgs = $('img[data-src]');
  let windowHeight = window.innerHeight;
  
  for (let i of imgs) {
      let imgHeight = i.offsetTop;
      let srcUrl = i.dataset.src;
      if (imgHeight < windowHeight) {    
      i.setAttribute('src', srcUrl);
      }
  };
});
// 获取浏览器title，并赋值给公共header的title
if ($('.header').length == 0) {
  var pageTitle = $(document).attr('title');
  var headerHtml = `
  <div class="public-header">
      <div class="public-header-bar">
      <button
          type="button"
          class="iconfont icon-right public-back back"
      ></button>
      <span class="page-title">${pageTitle}</span>
      </div>
  </div>
  `;
  $('.wrapper').after(headerHtml);
}


// 弹出微信客服弹框
var wxPopHtml = '';
var popInfoHtml = '';
var maskHtml = '<div class="mask"></div>'
var wxDetail = {
  wxID: 'wx-222222',
  qrcode: '../temp-images/qrcode.gif'
}

wxPopHtml = `<div class="public-pop-wx">
    <i class="iconfont icon-close" id="wx-close"></i>
    <div class="content">
        <p class="title">请联系我们的微信客服</p>
        <p id="wx-id">微信ID：<span>${wxDetail.wxID}</span></p>
    </div>
    <div class="wx-qrcode">
        <img src="${wxDetail.qrcode}" alt="">
    </div>
</div>`

$('.public-wx').on('click', function() {
  var body = $('body')
  body.css('overflow-y', 'hidden')

  $('.wrapper').prepend(wxPopHtml)
  $('.wrapper').prepend(maskHtml)


  // 点击复制ID内容
  $('#wx-id').bind('click', function() {
    copy(wxDetail.wxID);
  })

  // 关闭弹窗
  var wxClose = $('#wx-close');
  var mask = $('.mask');
  wxClose.on('click', function() {
    hideWx(mask)
  });
  mask.on('click', function() {
    hideWx(mask)
  });
})
function hideWx(maskEl) {
    var popWx = $('.public-pop-wx');
    popWx.remove();
    let timer = setTimeout(function() {
      maskEl.remove()
      $('body').css('overflow-y', 'scroll');
      clearTimeout(timer);
    },350);
  }


//浏览器后退
$('.public-back').on('click', function() {
  history.back();
  return false;
});


// 给手机端绑定touchustart事件兼容:hover
document.body.addEventListener('touchstart', function() {});


// 图片懒加载
$(window).on('scroll', function() {
  lazyload();
});
function lazyload() {
  let imgs = $('img[data-src]');
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let windowHeight = window.innerHeight;
  if (!imgs) {
    return;
  }
  for (let i of imgs) {
    let imgHeight = i.offsetTop;
    let srcUrl = i.dataset.src;    
    if (imgHeight <= windowHeight+scrollTop && imgHeight >= scrollTop){
      setTimeout(function() {
        i.setAttribute('src', srcUrl);
      },300);      
    }
  }
};

// 获取form内容
var getForm = function(val) {
  var params = $(val).serializeArray();
  // params = decodeURIComponent(params, true);
  return params;
}

// 获取cookie
function getCookie(name) {
  let strCookie =document.cookie;
  let arrCookie = strCookie.split(';');
  for (let i of arrCookie) {
    let arr = i.split('=');
    if (arr[0].trim() == name) {
      return  decodeURIComponent(arr[1], true);
    }
  }
  return '';
}

