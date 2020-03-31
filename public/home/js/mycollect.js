var data = getJson($('#data'));

var list = $('.list');
var listHtml = '';

if (data) {
  if (data.length > 0) {
    data.forEach(function(e) {
      if (e.cancel == 1) {
        listHtml += `
				<li>
					<a href="/home/goods/goodsdetail.html?id=${e.goods_id}&date_id=${e.rushdate_id}&time_id=${e.rushtime_id}">
						<img src=${imageUrl + e.img}>
						<div class="price">
							<span>￥${e.price}</span>
							<span>￥${e.orprice}</span>
						</div>
					</a>
				</li>
				`;
      }
	})
	list.append(listHtml);
  } else {
    let html = `<div class="no-content">
            <i class="iconfont icon-border_color_px_rounded"></i>
            <p>您还没有相关的收藏</p>
        </div>`
    list.after(html);
  }
} else {
  let html = `<div class="no-content">
        <i class="iconfont icon-border_color_px_rounded"></i>
        <p>您还没有相关的收藏</p>
    </div>`
  $list.after(html);
}