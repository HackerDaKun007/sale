var imageUrl = '/Upload/';

var serverTimeEnd = serverTimeEnd; //服务器时间
var dateTime = dateTime; //今天日期开始时间
var dateTimeEnd = dateTimeEnd; //今天结束时间
var KeyPassword = KeyPassword; //加密协议http
var vxUser = vxUser; //微信名
var vxId = vxId; //微信号
var vxImg = vxImg; //微信图片

$('#ServerTime').remove();
// 提醒弹窗
function alertInfo(val) {
  let timer;
  $('.public-pop-info').remove();
  let popInfoHtml = `
    <div class="public-pop-info">${val}</div>
 `;
  $('.wrapper').after(popInfoHtml);

  timer = setTimeout(function () {
    $('.public-pop-info').remove();
    clearTimeout(timer);
  }, 1500);
}


// 跳出问讯框
function popConfirm(val) {
  let confirmHtml = `
    <div class="public-confirm">
        <div class="info">
            <p>${val.info}</p>
        </div>
        <div class="confirm-btn">
            <span id="confirm">确定</span>
            <span id="cancle">取消</span>
        </div>
    </div>
`;
  let maskHtml = `<div class="mask"></div>`
  $('.wrapper').after(maskHtml);
  $('.wrapper').after(confirmHtml);

  $('#confirm').bind('click', function () {
    // 移除问询框的HTML
    $('.public-confirm').remove();
    $('.mask').remove();

    // 进行下一步操作
    val.success();
  })
  $('#cancle').bind('click', function () {
    $('.public-confirm').remove();
    $('.mask').remove();
    if (typeof val.error != 'undefined') {
      val.error();
    }
  })
}

// 单按键提醒框
function singleConfirm(info) {
  let confirmHtml = `
    <div class="public-confirm">
        <div class="info">
            <p>${info}</p>
        </div>
        <div class="confirm-btn">
            <span id="single">确定</span>
        </div>
    </div>
    `;
  let maskHtml = `<div class="mask"></div>`
  $('.wrapper').after(maskHtml);
  $('.wrapper').after(confirmHtml);

  $('#single').bind('click', function () {
    console.log(12);

    // 移除问询框的HTML
    $('.public-confirm').remove();
    $('.mask').remove();
  })
}

// 倒计时
function countDown(n, nowtime, endtime, el) {
  let hours = el.eq(0).find('.hours');
  let minutes = el.eq(0).find('.minutes');
  let seconds = el.eq(0).find('.seconds');

  let leftTime = endtime - (nowtime + n);

  let h = parseInt((leftTime / (60 * 60)) % 24);
  let m = parseInt((leftTime / 60) % 60);
  let s = parseInt(leftTime % 60);

  if (leftTime > 0) {
    hours.text(getTrueNumber(h))
    minutes.text(getTrueNumber(m))
    seconds.text(getTrueNumber(s))
  } else {
    hours.text('00')
    minutes.text('00')
    seconds.text('00')
  }
}

function getTrueNumber(x) {
  if (x < 10) return '0' + x;
  else return x;
};

// 页面出错
function notFound() {
  window.location.replace('/404.html');
}

// 复制内容到剪贴板
var timer

function copy(info) {
  var wrapper = $('.wrapper')
  $('#copy').remove()
  wrapper.append('<input readonly value="' + info + '" id="copy" />')
  var NumClip = document.getElementById('copy')

  var NValue = NumClip.value
  var valueLength = NValue.length
  selectText(NumClip, 0, valueLength)

  if (document.execCommand('copy', false, null)) {
    document.execCommand('copy', false, null) // 执行浏览器复制命令

    popInfoHtml = `<div class="public-pop-info">已复制到粘贴板</div>`
    wrapper.prepend(popInfoHtml)

    var popInfo = $('.public-pop-info')
    clearTimeout(timer)
    timer = setTimeout(function () {
      if (popInfo.length >= 1) {
        popInfo.remove()
      }
    }, 1500)
  } else {
    popInfoHtml = `<div class="public-pop-info">复制失败</div>`
    wrapper.prepend(popInfoHtml)
    var popInfo = $('.public-pop-info')

    timer = setTimeout(function () {
      popInfo.remove()
    }, 1000)
  }
}

// 思路：要想复制到剪贴板，必须先选中这段文字。
// input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
// 选择文本。createTextRange(setSelectionRange)是input方法
function selectText(textbox, startIndex, stopIndex) {
  if (textbox.createTextRange) {
    //ie
    var range = textbox.createTextRange()
    range.collapse(true)
    range.moveStart('character', startIndex) //起始光标
    range.moveEnd('character', stopIndex - startIndex) //结束光标
    range.select() //不兼容苹果
  } else {
    //firefox/chrome
    textbox.setSelectionRange(startIndex, stopIndex)
    textbox.focus()
  }
}

var ajax = '';

//提交post数据
var _post = function (load) {
  jQuery.support.cors = true;
  if (ajax != '') {
    ajax.abort();
  }
  ajax = $.ajax({
    type: 'post',
    dataType: 'json',
    cache: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("key", KeyPassword);
    },
    headers: load.header,
    url: load.url,
    data: load.data,
    async: true,
    timeout: 10000,
    success: function (msg) {
      if (typeof msg == 'object') {
        if (msg.code == 1) {
          alertInfo(msg.msg);
          if (load.success != '' || load.success != null) {
            load.success(msg);
          }
        }
        if (msg.code == 0) {
          alertInfo(msg.msg);
          if (load.success != '' || load.success != null) {
            load.success(msg);
          }
        }
      } else {
        if (msg != '' && msg != null) {
          if (load.success != '' || load.success != null) {
            load.success(msg);
          }
        } else {
          if (load.success != '' || load.success != null) {
            load.success('');
          }
        }
      }
    },
    error: function (err) {
      alertInfo('服务器请求失败');
      if (load.error != null && load.error != '') {
        load.error();
      }
    },
    complete: function (XMLHttpRequest, status) {
      if (status == 'timeout') {
        ajaxTimeoutTest.abort();
        alertInfo('服务器请求超时，请稍后再操作！')
      }
    }
  })
}

//获取form数据
function getForm(val) {
  let params = $(val).serializeArray();
  return params;
}

// 获取cookie
function getCookie(name) {
  let strCookie = document.cookie;
  let arrCookie = strCookie.split(';');
  for (let i of arrCookie) {
    let arr = i.split('=');
    if (arr[0].trim() == name) {
      return decodeURIComponent(arr[1], true);
    }
  }
  return '';
}

// 获取URL关键词
function getSearchWord(name) {
  let search = location.search.split('?');
  let arrSearch = search[1].split('&');
  for (let i of arrSearch) {
    let arr = i.split('=');
    if (arr[0] == name) {
      return arr[1];
    }
  }
  return '';
}


// 获取JSON
function getJson(val) {
  let data = decodeURIComponent(val.html(), true);
  data = JSON.parse(data);
  return data;
}


// 订单状态
var order_status = [{
    code: 1,
    value: '待发货'
  },
  {
    code: 2,
    value: '待收货'
  },
  {
    code: 3,
    value: '确定收货'
  },
  {
    code: 4,
    value: '取消'
  },
  {
    code: 5,
    value: '待确定'
  },
  {
    code: 6,
    value: '退货'
  },
  {
    code: 7,
    value: '售后服务'
  }
];

// 转换时间日期格式

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}