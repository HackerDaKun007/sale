var data = getJson($('#data'));

var list = $('.list');
var listHtml = '';

if (data) {
  if (data.length > 0) {
		let newData = JSON.parse(JSON.stringify(data));
		newData.reverse();
		
		newData.forEach(function(e) {
		if (e.cancel == 1) {
			listHtml += `
					<li>
						<a href="/home/goods/goodsdetail.html?id=${e.goods_id}&date_id=${e.rushdate_id}&time_id=${e.rushtime_id}">
							<img src=${imageUrl + e.img}>
							<div class="price">
								<span>￥${e.price}</span>
							</div>
						</a>
					</li>
					`;
		}
		})
		list.append(listHtml);
  } else {
      list.after(publicMycollect('收藏'));
  }
} else {
  list.after(publicMycollect('收藏'));
}