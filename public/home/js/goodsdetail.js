$(function () {
	var goodsId = getGoodsId();

	if (!goodsId) {
		notFound();
	}

	var goods = [{
			id: 1,
			total: 2500,
			sold: 654,
			price: 499,
			oldPrice: 899,
			start_time: 1585220400,
			end_time: 1585223999,
			title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
			imgs: [
				'../temp-images/img2.jpeg',
				'../temp-images/img5.jpeg',
				'../temp-images/img6.jpeg'
			],
			desc: '全新手表;手表镜面材质:矿物强化玻璃镜面;机芯产地:中国;品牌: 飞克; 型号:FM20 机芯类型:机械机芯-自动机械机芯;手表种类:男;风格:时尚潮流;表带材质:精钢;形状:圆形;显示方式:指针式;上市时间:2017年春夏;颜色分类:黑壳黑面黑带,黑壳黑面黑带(带日历),银壳白面黑带蝴蝶扣(带日历),黑壳黑面黑钢带(带日历),银壳白面银钢带(带日历),银壳蓝面银钢带(带日历),玫金壳白面玫金带(带日历),银壳钢带日历(蓝宝旗舰版),银壳白面黑带蝴蝶扣日历(蓝宝旗舰版);防水深度:30米生活防水;附加功能:日历,能量显示;表扣款式:针扣;表底类型:透底;表冠类型:旋入式;表盘厚度:11mm;表盘直径:42mm;品牌产地:国内;流行元素:精钢;表壳材质:精钢',
			descPart: [{
				title: 123,
				content: 123
			}],
			value: [{
					id: 1,
					title: 'test value1',
					img: '../temp-images/img2.jpeg',
					stock: 200,
					price: 499,
					regular_price: 899,
					available: 2000,
					back_available: 2000,
					sort: 1
				},
				{
					id: 2,
					title: 'test value2',
					img: '../temp-images/img5.jpeg',
					stock: 100,
					price: 600,
					regular_price: 899,
					available: 2000,
					back_available: 2000,
					sort: 2
				},
			]
		},
		{
			id: 2,
			total: 1200,
			sold: 320,
			price: 89,
			oldPrice: 389,
			start_time: 1585220400,
			end_time: 1585227599,
			title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
			imgs: [
				'../temp-images/img2_1.jpg',
				'../temp-images/img2_2.jpg',
				'../temp-images/img2_3.jpg',
				'../temp-images/img2_4.jpg'
			],
			desc: '【官方正品 假一罚十】欧佩二裂酵母润养修护套盒补水六件套',
			descPart: [{
				title: 123,
				content: 123
			}],
		},
		{
			id: 3,
			total: 65000,
			sold: 61002,
			price: 39.9,
			oldPrice: 338,
			start_time: 1585306800,
			end_time: 1585313999,
			title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
			imgs: [
				'//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg',
				'//t00img.yangkeduo.com/goods/images/2019-10-29/2a9c3e74-e043-408c-8cea-d5b8c52d0061.jpg',
				'//t00img.yangkeduo.com/goods/images/2019-10-29/095d8673-6ebb-41ba-9aac-5ff10c394558.jpg',
				'//t00img.yangkeduo.com/goods/images/2019-10-29/10babdb4-ce69-4b44-b83f-baebb9bc6ebc.jpg'
			],
			desc: '肌肤嫩不嫩,关键看水分。炭黑膜材搭配浓浓黑营养,清肌补水,轻松敷出焕采明亮的水嫩肌肤。',
			descPart: [{
				title: 123,
				content: 123
			}],
		},
		{
			id: 4,
			total: 880000,
			sold: 668002,
			price: 14.9,
			oldPrice: 78,
			start_time: 1585278960,
			end_time: 1585281599,
			title: '【买一送一】贝斯迪维生素e软胶囊200粒可搭祛痘印斑美白疤痕产品',
			imgs: [
				'//t00img.yangkeduo.com/goods/images/2019-07-30/2ece5488-0e5f-4a9e-b36c-f28cba9abdf9.png',
				'//t00img.yangkeduo.com/goods/images/2019-07-30/e68801c8-c6e1-4afb-a72b-110813f8934b.png',
				'//t00img.yangkeduo.com/goods/images/images/2019-09-25/34e5a151-64db-40a9-87a1-fd91c264c2ab.jpg?imageMogr2/quality/70'
			],
			desc: '买一送一同款,两瓶一共200粒。【限时优惠,卖完涨价】 蓝帽认证!支持防伪查询。',
			descPart: [{
				title: 123,
				content: 123
			}],
		},
		{
			id: 5,
			total: 7500,
			sold: 138,
			price: 58,
			oldPrice: 168,
			start_time: 1585216799,
			end_time: 1585220399,
			title: '百雀羚套装正品 补水保湿 精萃惊喜礼盒 洁面水乳霜4件套装护肤品',
			imgs: [
				'//t00img.yangkeduo.com/goods/images/2020-02-27/20f95311-1486-4818-8c6f-d8199fd1577f.jpg',
				'//t00img.yangkeduo.com/t10img/images/2018-06-13/75c07b4a716c393989caaea8306c2bee.jpeg',
				'//t00img.yangkeduo.com/goods/images/2018-11-10/337e6737d5c0fb85e5f6a322313faa2e.jpeg',
				'//t00img.yangkeduo.com/t07img/images/2018-06-13/56bbe6f31d2595f55370d12dd35e918a.jpeg'
			],
			desc: '百雀羚精粹惊喜礼盒【柔肤水100ml+保湿乳液100ml+亮采洁面膏95g+润白滋养霜50g】产品功效: 萃取蚕丝蛋白内含18种氨基酸,有效补充肌肤水份和胶原蛋白,令肌肤白皙粉嫩、光滑透亮',
			descPart: [{
				title: 123,
				content: 123
			}],
		}
	]

	var swiperWrapper = $('.swiper-wrapper');
	var promotion = $('.promotion');
	var goodsDesc = $('.goods-desc');
	var goodsValueList = $('.goods-value .value-list');
	var goodsText = $('.goods-text');
	var goodsImages = $('.goods-images .images');
	var payment = $('.payment');
	var selectGoodsValue = $('.select-goodsvalue ul');
	var selectGoodsInfo = $('.select-goodsvalue .goodsinfo');
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
	var nowTime = Math.floor(new Date().getTime() / 1000); //服务器现在时间
	goods.forEach(function (e) {
		if (goodsId == e.id) {
			let timeHtml = '';
			let stock = e.total - e.sold // 获取库存
			goodsEndTime = e.end_time;
			for (let i of e.descPart) {
				goodsValueListHtml += `
             <li class="item">
                <p class="item-name">${i.title}</p>
                <p class="item-value">${i.content}</p>
            </li>
          `
			}
			e.imgs.forEach(function (i) {
				swiperWrapperHtml += `
                    <div class="swiper-slide"><img class="swiper-image" src=${i} alt=""></div>
            `
				goodsImagesHtml += `<img src='/temp-images/default.jpg' data-src=${i} alt="">`
			})

			if (e.start_time > nowTime && e.end_time > nowTime) {
				timeHtml = `<span>即将开抢</span>`;
				paymentHtml = `
			<div class="payment-c disabled">
				<span class="price">￥${e.price}</span>
				${timeHtml}
			</div>
			`;
			} else if (e.end_time < nowTime && e.start_time < nowTime) {
				timeHtml = `<span>已结束</span>`;
				paymentHtml = `
			<div class="payment-c disabled">
				<span class="price">￥${e.price}</span>
				${timeHtml}
			</div>
			`;
			} else if (e.start_time < nowTime && e.end_time > nowTime) {
				timeHtml = `
				<span class="hours">00</span> :
				<span class="minutes">00</span> :
				<span class="seconds">00</span>
				`
				paymentHtml = `
				<div class="payment-c" id="pop-select">
					<span class="price">￥${e.price}</span>
					<span class="text"><i class="iconfont icon-clock_fill"></i>立即秒杀</span>
				</div>
				`
			}
			promotionHtml = `
				<div class="price-detail">
				<div class="top">
					<p class="price">￥<span>${e.price}</span></p>
					<p class="old-price">￥${e.oldPrice}</p>
				</div>
				<div class="bottom">
					仅剩${stock}件
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
           		<p class="desc"><i class="iconfont icon-huo" style="color: orangered"></i>${e.title} </p>
                    <div class="tips">
                        <span class="tip">预售</span>
                        <span class="tip">全国包邮</span>
                    </div>
        	`;

			goodsTextHtml = `${e.desc}`;
			

			if (e.value) {
				e.value.map(function (i, k) {
					let active = '';
					if (k == 0) {
						active = 'active';
						selectGoodsInfoHtml = `
            <img src=${i.img} alt="">
            <div>
                <p class="price">￥${i.price}</p>
                <p class="stock">库存${i.stock}件</p>
                <p class="selected">
                    已选：
                    <span>${i.title}</span>
                </p>
            </div>
            `
					}
					selectGoodsValueHtml += `
          <li class=${active}>${i.title}</li>
          `;
				});

			}
		}
	})
	goodsValueList.append(goodsValueListHtml)
	swiperWrapper.append(swiperWrapperHtml)
	promotion.append(promotionHtml)
	goodsDesc.append(goodsDescHtml)
	goodsText.append(goodsTextHtml)
	goodsImages.append(goodsImagesHtml)
	payment.append(paymentHtml)
	selectGoodsValue.append(selectGoodsValueHtml)
	selectGoodsInfo.html(selectGoodsInfoHtml)

	var toCommentList = $('.to-comment-list')
	var main = $('.main')
	var pageHeader = $('#page-header')
	var commentWrapper = $('.comment-wrapper')
	var showService = $('#show-service')
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

	//收藏
	var collectID = 1

	function isCollect(val) {
		if (collectID == 1) {
			collectID = 0
			val.removeClass('icon-cc-heart-o')
			val.addClass('icon-heart3')
		} else {
			collectID = 1
			val.addClass('icon-cc-heart-o')
			val.removeClass('icon-heart3')
		}
	}
	isCollect(isCollectBtn)
	isCollectBtn.on('click', function () {
		let $this = $(this)
		isCollect($this)
	})

	// 弹出选择栏
	var popSelectBtn = $('#pop-select');
	console.log(popSelectBtn);
	
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
	var decreaseBtn = $('#decrease')
	var increaseBtn = $('#increase')
	var buyNumber = $('#buynumber')

	decreaseBtn.on('click', function () {
		let val = buyNumber.val() * 1
		let num = val > 1 ? val - 1 : 1
		buyNumber.val(num)
		return false
	})
	increaseBtn.on('click', function () {
		let val = buyNumber.val() * 1
		let num = val < 5 ? val + 1 : 5
		buyNumber.val(num)
		return false
	})

	decreaseBtn.on('doubleclick', function (e) {
		e.preventDefault()
	})
	increaseBtn.on('doubleclick', function (e) {
		e.preventDefault()
	})

	var selectValues = $('.select-value ul li');

	selectValues.on('click', function () {
		let $this = $(this);
		let index = $this.index();
		let i = goods[0].value[index];
		selectGoodsInfoHtml = '';
		selectValues.removeClass('active');
		$this.addClass('active');

		selectGoodsInfoHtml = `
      <img src=${i.img} alt="">
      <div>
          <p class="price">￥${i.price}</p>
          <p class="stock">库存${i.stock}件</p>
          <p class="selected">
              已选：
              <span>${i.title}</span>
          </p>
      </div>
    `;
		selectGoodsInfo.html(selectGoodsInfoHtml)
	})

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

	// 获取当前URL的参数
	function getGoodsId() {
		let searchWords = window.location.search // 获取URL中的”？“后的字符串
		let theSearch = searchWords.split('=')
		return theSearch[1]
	}

	// 倒计时
	var timerEl = $('.timer');
	var num = 0;
	countDown(num, nowTime, goodsEndTime, timerEl);	

	setInterval(function () {
		num++;
		countDown(num, nowTime, goodsEndTime, timerEl);
	}, 1000);


})