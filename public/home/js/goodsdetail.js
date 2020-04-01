$(function () {
	
	var goods = getJson($('#goods'));
	var comment = getJson($('#comment'));
	var favorite = getJson($('#favorite'));
	var service = getJson($('#service'));
	
	var nowTime = serverTimeEnd; //服务器现在时间

	var swiperWrapper = $('.swiper-wrapper');
	var promotion = $('.promotion');
	var goodsDesc = $('.goods-desc');
	var goodsValue = $('.goods-value');
	var goodsValueList = $('.goods-value .value-list');
	var goodsText = $('.goods-text');
	var goodsImages = $('.goods-images .images');
	var payment = $('.payment');
	var selectGoodsValue = $('.select-goodsvalue ul');
	var selectGoodsInfo = $('.select-goodsvalue .goodsinfo');
	var commentList = $('.comment-list .content');
	var showComment = $('#show-comment');
	var serviceDesc = $('.service-desc .detail-list');
	var showService = $('#show-service');
	var showServiceHtml = '';
	var serviceDescHtml = '';
	var showCommentHtml = '';
	var commentListHtml = '';
	var swiperWrapperHtml = '';
	var goodsDescHtml = '';
	var goodsValueListHtml = '';
	var goodsTextHtml = '';
	var goodsImagesHtml = '';
	var paymentHtml = '';
	var selectGoodsValueHtml = '';
	var selectGoodsInfoHtml = '';
	var promotionHtml = '';
	var goodsEndTime = 0;

	if (goods) {
		let timeHtml = '';
		let stock = 0;
		goodsEndTime = goods.end_time;
		goods.sty.forEach(function (e, k) {
			stock += e.available; // 获取库存	

			let active = '';
			if (k == 0) {
				active = 'active';
				selectGoodsInfoHtml = `
					<img src=${imageUrl + goods.home_img} alt="">
					<div>
						<p class="price">￥${e.price}</p>
						<p class="stock">库存${e.available}件</p>
						<p class="selected">
							已选：
							<span>${e.username}</span>
						</p>
					</div>
					`;
			}
			selectGoodsValueHtml += `
				<li class=${active}>${e.username}</li>
				`;
		});

		goods.images.forEach(function (e) {
			swiperWrapperHtml += `
				<div class="swiper-slide"><img class="swiper-image" src=${imageUrl + e.img}></div>
				`;
			goodsImagesHtml += `<img src='/home/temp-images/default.jpg' data-src=${imageUrl + e.img}>`
		});

		if (goods.start_time > nowTime && goods.end_time > nowTime) {
			timeHtml = `<span>即将开抢</span>`;
			paymentHtml = `
					<div class="payment-c disabled">
						<span class="price">￥${goods.sty[0].price}</span>
						${timeHtml}
					</div>
					`;
		} else if (goods.end_time < nowTime && goods.start_time < nowTime) {
			timeHtml = `<span>已结束</span>`;
			paymentHtml = `
					<div class="payment-c disabled">
						<span class="price">￥${goods.sty[0].price}</span>
						${timeHtml}
					</div>
					`;
		} else if (goods.start_time < nowTime && goods.end_time > nowTime) {
			timeHtml = `
					<span class="hours">00</span> :
					<span class="minutes">00</span> :
					<span class="seconds">00</span>
					`
			paymentHtml = `
					<div class="payment-c" id="pop-select">
						<span class="price">￥${goods.sty[0].price}</span>
						<span class="text"><i class="iconfont icon-clock_fill"></i>立即秒杀</span>
					</div>
					`
		}

		promotionHtml = `
				<div class="price-detail">
					<div class="top">
						<p class="price">￥<span>${goods.sty[0].price}</span></p>
						<p class="old-price">￥${goods.sty[0].regular_price}</p>
					</div>
					<div class="bottom">
						仅剩${goods.sty[0].available}件
					</div>
				</div>
				<div class="promotion-name">
					<div class="item-top"><i class="iconfont icon-clock_fill"></i>限时秒杀</div>
					<div class="timer">
						${timeHtml}
					</div>
				</div>
				`;

		goodsDescHtml = `
				<p class="desc"><i class="iconfont icon-huo" style="color: orangered"></i>${goods.username} </p>
				 <div class="tips">
					 <span class="tip">货到付款</span>
					 <span class="tip">全国包邮</span>
				 </div>
				 `;
		
		if (goods.parameter) {
			if (goods.parameter.length > 0) {
				goodsValue.show();
				for (let i of goods.parameter) {
					goodsValueListHtml += `
							<li class="item">
								<p class="item-name">${i.title}</p>
								<p class="item-value">${i.content}</p>
							</li>
							`;
				}
			} else {
				goodsValue.hide();
			}
		} else {
			goodsValue.hide();
		}
		goodsTextHtml = `${goods.details}`;
	
		goodsValueList.append(goodsValueListHtml);
		swiperWrapper.append(swiperWrapperHtml);
		promotion.append(promotionHtml);
		goodsDesc.append(goodsDescHtml);
		goodsText.append(goodsTextHtml);
		goodsImages.append(goodsImagesHtml);
		payment.append(paymentHtml);
		selectGoodsValue.append(selectGoodsValueHtml);
		selectGoodsInfo.html(selectGoodsInfoHtml);
	}

	if (comment) {
		comment.forEach(function(e,k) {
			let html = '';
			for (let i=1; i<=6; i++) {
				if (e['img'+i] != '') {
					html += `
					<div class="img-item"><img src=${imageUrl + e['img'+i]}></div>
					`;
				}
			}
			commentListHtml += `
			<div class="content-item">
				<div class="head">
					<div class="avatar">
						<img src=${imageUrl + e.home_img}>
						<span class="name">${e.username}</span>
					</div>
					<div class="date">${e.create_time}</div>
				</div>
				<div class="comment">${e.content}</div>
				<div class="comment-imgs">
					${html}
				</div>
			</div>
			`;
			
			if (k == 0) {
				showCommentHtml = `
				<div class="head">
					<div class="title">商品评价（${comment.length}）</div>
					<div class="to-comment-list">查看更多<i class="iconfont icon-right"></i></div>
				</div>
				<div class="content">
					<div class="content-item">
						<div class="avatar">
							<img src=${imageUrl + e.home_img}>
							<span class="name">${e.username}</span>
						</div>
						<div class="comment">${e.content}</div>
					</div>
				</div>
				`;
			}
			
		});

		commentList.append(commentListHtml);
		showComment.append(showCommentHtml);
	}

	if (service != null && service) {
		service.forEach(function(e) {
			serviceDescHtml += `
			<div class="list-item">
					<i class="iconfont icon-dian"></i>
					<div class="desc-deatil">
						<p>${e.title}</p>
						<p class="desc">${e.content}</p>
					</div>
				</div>
			`;
		});

		if (service.length == 1) {
			showServiceHtml = `<p>${service[0].title}</p>
			<i class="iconfont icon-right"></i>`;
		} else if (service.length == 2){
			showServiceHtml = `<p>${service[0].title}· ${service[1].title}</p>
			<i class="iconfont icon-right"></i>`;
		} else {
			showServiceHtml = `<p>${service[0].title} · ${service[1].title} · ${service[2].title}</p>
			<i class="iconfont icon-right"></i>`;
		}

	} else {
		showServiceHtml = `<p>服务说明</p>
		<i class="iconfont icon-right"></i>`;
	}
	showService.append(showServiceHtml);
	serviceDesc.append(serviceDescHtml);

	var toCommentList = $('.to-comment-list')
	var main = $('.main')
	var pageHeader = $('#page-header')
	var commentWrapper = $('.comment-wrapper')
	var serviceDesc = $('.service-desc')
	var closeBtn = $('.close-btn')
	var showMoreBtn = $('.showmore')
	var valueList = $('.value-list > .item')
	var isCollectBtn = $('.is-collect')

	toCommentList.on('click', function () {
		main.hide()
		pageHeader.hide()
		commentWrapper.addClass('active')

		commentWrapper.stop().animate({
				'margin-right': '0'
			},
			300,
			function () {
				commentWrapper.css({
					margin: '0 auto'
				})
			}
		)

		var state = {
			title: 'title',
			url: '#'
		}
		window.history.pushState(state, 'title', '#')
		window.addEventListener(
			'popstate',
			function (e) {
				if (commentWrapper.is('.active')) {
					commentWrapper.stop().animate({
							'margin-right': '-100%'
						},
						300,
						function () {
							main.show()
							pageHeader.show()
							commentWrapper.removeClass('active')
						}
					)
				}
				window.history.replaceState(state, 'title', '#')
			},
			false
		)
	})

	var mask;
	var maskHtml = '<div class="mask"></div>';
	showService.on('click', function () {
		$('body').css('overflow', 'hidden');
		serviceDesc.addClass('active');

		serviceDesc.stop().animate({
				bottom: '0'
			},
			200,
			function () {
				$('.wrapper').after(maskHtml);
				mask = $('.mask');
				mask.on('click', function () {
					hideService(serviceDesc, '-28rem');
				});
			}
		)
	})

	closeBtn.on('click', function () {
		hideService(serviceDesc, '-28rem')
	})

	// 展开大于6列被隐藏的item
	var valueListLength = valueList.length
	var leftValueItem
	if (valueListLength <= 6) {
		showMoreBtn.hide();
	} else {
		leftValueItem = valueList.slice(6);
		leftValueItem.hide();
		showMoreBtn.show();
	}
	showMoreBtn.on('click', function () {
		$(this).hide();
		leftValueItem.show();
	});

	// 弹出选择栏
	var popSelectBtn = $('#pop-select');

	var selectEl = $('.select-goodsvalue');
	var selectCloseBtn = $('#select-close');

	popSelectBtn.on('click', function () {
		$('body').css('overflow', 'hidden');
		selectEl.addClass('active');

		selectEl.stop().animate({
				bottom: '0'
			},
			200,
			function () {
				$('body').append(maskHtml)
				mask = $('.mask');
				mask.on('click', function () {
					hideService(selectEl, '-80%')
				});
			}
		)
	})

	selectCloseBtn.on('click', function () {
		hideService(selectEl, '-80%')
	})

	// 增加和减少购买数量
	var decreaseBtn = $('#decrease');
	var increaseBtn = $('#increase');
	var buyNumber = $('#buynumber');
	var selectItem = goods.sty[0];
	
	decreaseBtn.on('click', function () {
		let val = buyNumber.val() * 1;
		let num = val > 1 ? val - 1 : 1;

		buyNumber.val(num);
		toOrderUrl = url + '&goodsstyle_id=' + selectValueId + '&num=' + buyNumber.val();
		submitBtn.attr('href', toOrderUrl);
		return false;
	})
	increaseBtn.on('click', function () {
		let val = buyNumber.val() * 1;
		let num = 0;
		if (selectItem.available > 0) {
			num = val < 5 ? val + 1 : 5;
		}
		buyNumber.val(num)
		toOrderUrl = url + '&goodsstyle_id=' + selectValueId + '&num=' + buyNumber.val();
		submitBtn.attr('href', toOrderUrl);
		return false;
	})

	decreaseBtn.on('doubleclick', function (e) {
		e.preventDefault()
	})
	increaseBtn.on('doubleclick', function (e) {
		e.preventDefault()
	})

	var selectValues = $('.select-value ul li');

	var selectValueId = goods.sty[0].goodsstyle_id;
	var url = `/home/order/order.html${location.search}`;
	var submitBtn = $('.submit-btn');
	var toOrderUrl = url + '&goodsstyle_id=' + selectValueId + '&num=' + buyNumber.val();
	submitBtn.attr('href', toOrderUrl);

	
	selectValues.on('click', function () {
		let $this = $(this);
		let index = $this.index();
		let i = goods.sty[index];
		selectItem = goods.sty[index];
		selectGoodsInfoHtml = '';
		selectValues.removeClass('active');
		$this.addClass('active');
		selectValueId = i.goodsstyle_id;
		selectGoodsInfoHtml = `
		<img src=${imageUrl + goods.home_img} alt="">
		<div>
			<p class="price">￥${i.price}</p>
			<p class="stock">库存${i.available}件</p>
			<p class="selected">
				已选：
				<span>${i.username}</span>
			</p>
		</div>
		`;
		selectGoodsInfo.html(selectGoodsInfoHtml);
		toOrderUrl = url + '&goodsstyle_id=' + selectValueId + '&num=' + buyNumber.val();
		submitBtn.attr('href', toOrderUrl);
	});

	// 隐藏底部弹框
	function hideService(el, originBottom) {
		if (el.is('.active')) {
			$('body').css('overflow-y', 'scroll')
			el.stop().animate({
					bottom: originBottom
				},
				200
			)
			let timer = setTimeout(function () {
				el.removeClass('active');
				mask.remove();
				clearTimeout(timer);
			}, 500)
		}
	}


	// 倒计时
	var timerEl = $('.timer');
	var num = 0;
	countDown(num, nowTime, goodsEndTime, timerEl);

	setInterval(function () {
		num++;
		countDown(num, nowTime, goodsEndTime, timerEl);
	}, 1000);




	//收藏
	var goods_id = getSearchWord('id');
	var rushdate_id = getSearchWord('date_id');
	var rushtime_id = getSearchWord('time_id');

	var collect = false;
	if (!favorite) {
		collect = false;
	} else {
		favorite.forEach(function(e) {
			if (e.goods_id == goods_id && e.rushdate_id == rushdate_id && e.rushtime_id == rushtime_id ) {
				// favorNum = e.cancel;
				if (e.cancel == 1) {
					collect = true;
				} else if (e.cancel == 2) {
					collect = false;
				}
			}
		})
	}


	function isCollect(val) {
		if (collect) {
			collect = false;
			val.removeClass('icon-cc-heart-o');
			val.addClass('icon-heart3');
		} else {
			collect = true;
			val.addClass('icon-cc-heart-o');
			val.removeClass('icon-heart3');
		}
	}
	isCollect(isCollectBtn);

	isCollectBtn.on('click', function () {
		num ++;
		let $this = $(this);
		isCollect($this);
		_post({
			url: '/home/goods/favorite.html',
			data: {
				goods_id: goods_id,
				rushdate_id: rushdate_id,
				rushtime_id: rushtime_id,
			},
			success: function(msg) {
				
			}
		})
	});

})