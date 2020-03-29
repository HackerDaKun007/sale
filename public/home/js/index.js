$(function () {
	// 初始化变量
	var navItem = $('.nav-item')
	var category = $('.category')
	var saleList = $('.sale')
	//
	navItem.on('click', function () {
		let $this = $(this)
		navItem.removeClass('active')
		saleList.removeClass('active')

		if ($this.is('.notstart')) {
			$('.notstart').addClass('active')
			category.addClass('active');

		} else {
			category.removeClass('active')
			category.removeClass('poptop')
			$('.start').addClass('active')
		}
	})

	$('.total').on('click', function () {
		if (category.is('.poptop')) {
			category.removeClass('poptop')
		} else {
			category.addClass('poptop')
		}
	})



	// 滚动到scrollTopNav时固定住
	var scrollFixed = $('.scroll-fixed')
	var scrollTopNav = $('.scroll-top-nav')
	var scrollToTopBtn = $('.scroll-to-top-btn')
	$(document).on('scroll', function () {
		if (window.scrollY > scrollTopNav[0].offsetTop) {
			scrollTopNav.addClass('hide')
			scrollFixed.addClass('active')
			scrollToTopBtn.addClass('active')
		} else {
			scrollTopNav.removeClass('hide')
			scrollFixed.removeClass('active')
			scrollToTopBtn.removeClass('active')
		}
	})

	// 滚动到顶部
	scrollToTopBtn.on('click', function () {
		if (
			typeof window.getComputedStyle(document.body).scrollBehavior ==
			'undefined'
		) {
			scrollSmoothTo(0)
		} else {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		}
	})
	var nowTime = Math.floor(new Date().getTime() / 1000); //服务器现在时间
	var endTime = 1585324799; // 服务器今天结束时间
	// 插入数据
	var goods = [];
	goods = [{
			id: 1,
			total: 2500,
			sold: 654,
			price: 499,
			oldPrice: 899,
			title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
			name: '全自动机械表',
			img: './temp-images/img2.jpeg',
			start_time: 1585292400,
			end_time: 1585295999
		},
		{
			id: 2,
			total: 12000,
			sold: 4500,
			price: 89,
			oldPrice: 389,
			title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
			name: '润养修护套盒',
			img: './temp-images/img2_1.jpg',
			start_time: 1585288800,
			end_time: 1585292399
		},
		{
			id: 3,
			total: 65000,
			sold: 61002,
			price: 39.9,
			oldPrice: 338,
			title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
			name: '黑面膜',
			img: '//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg',
			start_time: 1585299599,
			end_time: 1585299599
		},
		{
			id: 4,
			total: 880000,
			sold: 668002,
			price: 14.9,
			oldPrice: 78,
			title: '贝斯迪维生素e软胶囊200粒可搭祛痘印斑美白疤痕产品',
			name: '维生素e软胶囊',
			img: '//t00img.yangkeduo.com/goods/images/2019-07-30/2ece5488-0e5f-4a9e-b36c-f28cba9abdf9.png',
			start_time: 1585382400,
			end_time: 1585396800
		},
		{
			id: 5,
			total: 7500,
			sold: 1380,
			price: 58,
			oldPrice: 168,
			title: '百雀羚套装正品 补水保湿 精萃惊喜礼盒 洁面水乳霜4件套装护肤品',
			name: '百雀羚套装',
			img: '//t00img.yangkeduo.com/goods/images/2020-02-27/20f95311-1486-4818-8c6f-d8199fd1577f.jpg',
			start_time: 1585198800,
			end_time: 1585223999
		}
	]
	var scrollList = $('.scroll-list');

	function getNewGoods() {
		let scrollListHtml = '';
		if (goods) {
			let newGoodsArr = JSON.parse(JSON.stringify(goods));
			let goodsEnd = [];
			newGoodsArr.sort(function (a, b) {
				return a.end_time - b.end_time;
			});
			newGoodsArr.forEach(function (e) {
				let dayInfo = 0;
				let title = '';
				if (e.start_time < endTime && e.end_time > nowTime) {
					title = '距结束还剩';
					goodsEnd.push(e.end_time);
					scrollListHtml += `
					<a class="item" href="./goods/goodsdetail.html?id=${e.id}">
						<div class="timer timer-n">
							<div>${title}</div>
							<span class="hours">00</span> :
							<span class="minutes">00</span> :
							<span class="seconds">00</span>
						</div>
						<div class="goods-desc">
							<div class="goods-img">
								<img src="${e.img}" alt="">
							</div>
							<div class="goods-detail">
								<div class="price">￥<span>${e.price}</span></div>
								<div class="name">${e.name}</div>
								<div class="tips">已抢${e.sold}件</div>
							</div>
						</div>
					</a>
					`;
				} else if (e.end_time > nowTime && e.start_time > endTime) {
					title = '距活动开始还有';
					dayInfo = new Date(e.start_time * 1000).getDate() - new Date().getDate();

					scrollListHtml += `
					<a class="item" href="./goods/goodsdetail.html?id=${e.id}">
						<div class="timer">
							<div>${title}</div>
							<span>${dayInfo}天</span>
						</div>
						<div class="goods-desc">
							<div class="goods-img">
								<img src="${e.img}" alt="">
							</div>
							<div class="goods-detail">
								<div class="price">￥<span>${e.price}</span></div>
								<div class="name">${e.name}</div>
								<div class="tips">即将开始</div>
							</div>
						</div>
					</a>
					`;
				}
			})
			scrollList.append(scrollListHtml);
			return {
				goodsEnd
			};
		}
	}
	let a = getNewGoods();
	let goodsEnd = a.goodsEnd;

	var array = [{
		'date': '1584979200',
		'id': 123,
		'retu': [{
				'id': 1,
				start_time: 1585292400,
				end_time: 1585295999,
				username: '15:00',
				goods: [{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
					{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
					{
						id: 3,
						total: 65000,
						sold: 61002,
						price: 39.9,
						oldPrice: 338,
						title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
						name: '黑面膜',
						img: '//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg'
					},
					{
						id: 4,
						total: 880000,
						sold: 668002,
						price: 14.9,
						oldPrice: 78,
						title: '贝斯迪维生素e软胶囊200粒可搭祛痘印斑美白疤痕产品',
						name: '维生素e软胶囊',
						img: '//t00img.yangkeduo.com/goods/images/2019-07-30/2ece5488-0e5f-4a9e-b36c-f28cba9abdf9.png'
					},
					{
						id: 5,
						total: 7500,
						sold: 1380,
						price: 58,
						oldPrice: 168,
						title: '百雀羚套装正品 补水保湿 精萃惊喜礼盒 洁面水乳霜4件套装护肤品',
						name: '百雀羚套装',
						img: '//t00img.yangkeduo.com/goods/images/2020-02-27/20f95311-1486-4818-8c6f-d8199fd1577f.jpg'
					}
				]
			},
			{
				'id': 1,
				start_time: 1585288800,
				end_time: 1585292399,
				username: '14:00',
				goods: [{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
					{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
					{
						id: 3,
						total: 65000,
						sold: 61002,
						price: 39.9,
						oldPrice: 338,
						title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
						name: '黑面膜',
						img: '//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg'
					},
					{
						id: 4,
						total: 880000,
						sold: 668002,
						price: 14.9,
						oldPrice: 78,
						title: '贝斯迪维生素e软胶囊200粒可搭祛痘印斑美白疤痕产品',
						name: '维生素e软胶囊',
						img: '//t00img.yangkeduo.com/goods/images/2019-07-30/2ece5488-0e5f-4a9e-b36c-f28cba9abdf9.png'
					},
					{
						id: 5,
						total: 7500,
						sold: 1380,
						price: 58,
						oldPrice: 168,
						title: '百雀羚套装正品 补水保湿 精萃惊喜礼盒 洁面水乳霜4件套装护肤品',
						name: '百雀羚套装',
						img: '//t00img.yangkeduo.com/goods/images/2020-02-27/20f95311-1486-4818-8c6f-d8199fd1577f.jpg'
					},
					{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
				]
			},
			{
				'id': 1,
				'start_time': 1585285200,
				end_time: 1585288799,
				username: '13:00',
				goods: [{
						id: 3,
						total: 65000,
						sold: 61002,
						price: 39.9,
						oldPrice: 338,
						title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
						name: '黑面膜',
						img: '//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg'
					},
					{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
				]
			},
			{
				'id': 1,
				'start_time': 1585224000,
				end_time: 1585227599,
				username: '20:00',
				goods: [{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
					{
						id: 5,
						total: 7500,
						sold: 1380,
						price: 58,
						oldPrice: 168,
						title: '百雀羚套装正品 补水保湿 精萃惊喜礼盒 洁面水乳霜4件套装护肤品',
						name: '百雀羚套装',
						img: '//t00img.yangkeduo.com/goods/images/2020-02-27/20f95311-1486-4818-8c6f-d8199fd1577f.jpg'
					}
				]
			},
			{
				'id': 1,
				'start_time': 1585227600,
				end_time: 1585231199,
				username: '21:00',
				goods: [{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
					{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
					{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
				]
			},
			{
				'id': 1,
				'start_time': 1585206000,
				end_time: 1585209599,
				username: '15:00',
				goods: [{
						id: 2,
						total: 12000,
						sold: 4500,
						price: 89,
						oldPrice: 389,
						title: '欧佩二裂酵母润养修护套盒冬季补水六件套',
						name: '润养修护套盒',
						img: './temp-images/img2_1.jpg'
					},
					{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
				]
			},
			{
				'id': 1,
				'start_time': 1585209600,
				end_time: 1585213199,
				username: '16:00',
				goods: [{
						id: 3,
						total: 65000,
						sold: 61002,
						price: 39.9,
						oldPrice: 338,
						title: '膜法世家黑面膜补水保湿清洁收缩毛孔面膜保湿补水学生女官方正品',
						name: '黑面膜',
						img: '//t00img.yangkeduo.com/goods/images/2020-03-13/2c4aad94-c6f6-4af0-8971-418bec91cc2c.jpg'
					},
					{
						id: 1,
						total: 2500,
						sold: 654,
						price: 499,
						oldPrice: 899,
						title: '飞克正品全自动机械手表男士时尚潮流防水曲弧面超薄休闲真皮腕表',
						name: '全自动机械表',
						img: './temp-images/img2.jpeg'
					},
				]
			},
		]
	}];

	// 判断在当前小时内的数据并插入HTML中
	var categoryTimesList = $('.category .list');
	var notstart = $('.sale.notstart');
	var start = $('.sale.start');

	function getArray(array, time) {
		let activeStr = 0;
		let activeEnd = 0;
		let categoryTimeHtml = '';
		let startListHtml = '';
		let startHtml = '';
		let notstartHtml = '';
		let activeSaleHtml = '';
		let goodsArr = [];
		let key = 0;
		let newArr = JSON.parse(JSON.stringify(array[0].retu));
		newArr.sort(function (a, b) {
			return a.end_time - b.end_time;
		});
		if (newArr.length > 0) {
			newArr.forEach(function (e, k) {
				let bool = '';
				if (e.start_time < time && e.end_time > time) {
					startHtml = `<div class="sale-list"></div>`
					activeStr = e.start_time;
					activeEnd = e.end_time;
					e.goods.map(function (i) {
						soldPercent = Math.floor((i.sold / i.total) * 100) //换算成已售百分比
						startListHtml += `
			  <a class="list-item" href="./goods/goodsdetail.html?goodsId=${i.id}">
			  <img src='/temp-images/default.jpg' data-src=${i.img} alt="" />
			  <div class="detail">
				  <div class="sale-top">
					  <div class="name">${i.title}</div>
					  <div class="sale-progress">
						  <span class="progress-bar" style="--progressWidth:${
							soldPercent <= 5 ? 5 : soldPercent
						  }%" data-percent="${soldPercent}%"></span>
						  <div class="sold">已抢${i.sold}件</div>
					  </div>
				  </div>
				  <div class="sale-bottom">
					  <div class="price">
						  <div class="now-price">￥<span>${i.price}</span></div>
						  <div class="old-price">￥<span>${
							i.oldPrice
						  }</span></div>
					  </div>
					  <div class="sale-btn">马上抢<i class="iconfont icon-right"></i></div>
					</div>
			  </div>
		  </a> 
			  `;
					})
					key = k;

				}
				if (e.end_time > time && activeEnd < e.end_time) {
					if (k == key + 1) {
						bool = 'active';
						e.goods.map(function (i) {
							soldPercent = Math.floor((i.sold / i.total) * 100) //换算成已售百分比
							activeSaleHtml += `
				  <a class="list-item" href="./goods/goodsdetail.html?goodsId=${i.id}">
				  <img src="/temp-images/default.jpg" data-src=${i.img} alt="" />
				  <div class="detail">
					  <div class="sale-top">
						  <div class="name">${i.title}</div>
						  <div class="sale-progress">
							  <span class="progress-bar" style="--progressWidth:${
								soldPercent <= 5 ? 5 : soldPercent
							  }%" data-percent="${soldPercent}%"></span>
							  <div class="sold">已抢${i.sold}件</div>
						  </div>
					  </div>
					  <div class="sale-bottom">
						  <div class="price">
							  <div class="now-price">￥<span>${i.price}</span></div>
							  <div class="old-price">￥<span>${
								i.oldPrice
							  }</span></div>
						  </div>
						  <div class="sale-btn">即将开抢</div>
						</div>
				  </div>
			  </a> 
				  `;
						
						})
					}
					categoryTimeHtml += `<li class="item ${bool}">${e.username}</li>`;
					notstartHtml += `<div class="sale-list ${bool}"></div>`;	
					goodsArr.push(e.goods);
				}
			})
				
			if (goodsArr.length < 1) {
				notstartHtml = `<div class="nocontent">
				<p>活动尚未开始</p>
				</div>`;
			}
			if (activeEnd == 0) {
				startHtml = `<div class="nocontent">
				<p>活动尚未开始</p>
				</div>`;
			}
		}
		categoryTimesList.html(categoryTimeHtml);
		notstart.html(notstartHtml);
		start.html(startHtml);

		let startList = $('.sale.start .sale-list');
		startList.append(startListHtml);

		let activeSale = $('.notstart.sale .sale-list.active');
		activeSale.append(activeSaleHtml);

		return {
			activeStr: activeStr,
			activeEnd: activeEnd,
			goodsArr: goodsArr,
		};
	}
	var jus = getArray(array, nowTime);
	var activeStr = jus.activeStr;
	var activeEnd = jus.activeEnd;
	var goodsArr = jus.goodsArr;


	// 当timeList的长度大于6个以上才显示
	var totalBtn = $('.total');
	var listLength = categoryTimesList.eq(0).find('.item').length;

	if (listLength <= 6) {
		totalBtn.hide()
	} else {
		totalBtn.show()
	}

	// category时间item点击事件
	var notstartLists = $('.notstart .sale-list')
	categoryTimesList.find('.item').on('click', function () {
		let saleListHtml = '';
		let $this = $(this);
		let num = $this.index();
		let er = 0;

		if ($this.parent().is('#top-list')) {
			er = 1;
		}
		categoryTimesList.find('.item').removeClass('active');
		notstartLists.removeClass('active');
		$this.addClass('active');
		notstartLists.eq(num).addClass('active');

		categoryTimesList.eq(er).find('.item').eq(num).addClass('active');

		goodsArr[num].map(function (i) {
			soldPercent = Math.floor((i.sold / i.total) * 100) //换算成已售百分比
			saleListHtml += `
          <a class="list-item" href="./goods/goodsdetail.html?goodsId=${i.id}">
          <img src=${i.img} alt="" />
          <div class="detail">
              <div class="sale-top">
                  <div class="name">${i.title}</div>
                  <div class="sale-progress">
                      <span class="progress-bar" style="--progressWidth:${
                        soldPercent <= 5 ? 5 : soldPercent
                      }%" data-percent="${soldPercent}%"></span>
                      <div class="sold">已抢${i.sold}件</div>
                  </div>
              </div>
              <div class="sale-bottom">
                  <div class="price">
                      <div class="now-price">￥<span>${i.price}</span></div>
                      <div class="old-price">￥<span>${
                        i.oldPrice
                      }</span></div>
                  </div>
                  <div class="sale-btn">即将开抢</div>
              </div>
          </div>
      </a> 
          `;

			notstartLists.eq(num).html(saleListHtml)
		})
	});

	var topTimer = $('.top .timer');
	var recomTimer = scrollList.eq(0).find('.timer-n');

	var num = 0;
	var numb = nowTime + num;
	countDown(num, nowTime, activeEnd, topTimer);

	setInterval(function () {
		num++;
		numb = nowTime + num;
		reload(numb);
		countDown(num, nowTime, activeEnd, topTimer);
	}, 1000);

	goodsEnd.forEach(function (e, k) {
		goods.forEach(function (sube) {
			if (sube.end_time == e) {
				let nTimer = recomTimer.eq(k);
				countDown(num, nowTime, e, nTimer);
				setInterval(function () {
					countDown(num, nowTime, e, nTimer);
				}, 1000);
			}
		})
	});

	function reload(num) {
		//如果当前时间大于今日结束时间，强制刷新页面
		if (endTime < num) {
			window.location.reload(true);
			console.log('reload');
			
			return false;
		}
		// 即将开始栏目的到点触发
		else if (activeEnd < num && activeStr < num) {
			let jus = getArray(array, num);
			if (jus.activeStr != 0 && jus.activeEnd != 0) {
				activeStr = jus.activeStr;
				activeEnd = jus.activeEnd;
			}
		}
	}
})