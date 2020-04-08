
	var nowTime = serverTimeEnd //服务器现在时间
	var endTime = dateTimeEnd // 服务器今天结束时间

	// 插入数据
	var scrollList = $('.scroll-list');
	var newGoodsArr = [];
	function getNewGoods() {
		let scrollListHtml = ''
		if (recogoods) {
			newGoodsArr = JSON.parse(JSON.stringify(recogoods));
			newGoodsArr.sort(function (a, b) {
				return a.end_time - b.end_time;
			})
			newGoodsArr.forEach(function (e,k) {
				let dayInfo = 0
				let title = ''
				if (e.start_time < endTime && e.end_time > nowTime) {
					let TimeHtml_ = '';
					let inputHtml = '';

					if(e.start_time <= nowTime) {
						title = '距结束还剩';
						TimeHtml_ = `<div class="tips">已抢${e.num_back - e.num}件</div>`;
					}else {
						inputHtml = `<input type="hidden" class="start_time" value="${e.start_time}" />
						<input type="hidden" class="end_time" value="${e.end_time}" />
						<input type="hidden" class="num_back" value="${e.num_back}" /><input type="hidden" class="num" value="${e.num}" />`
						title = '距活动开抢';
						TimeHtml_ = '<div class="tips">即将开抢</div>';
					}
					scrollListHtml += `
					<a class="item" href="/home/goods/goodsdetail.html?id=${e.goods_id}&date_id=${
            e.rushdate_id
		  }&time_id=${e.rushtime_id}">
		  				${inputHtml}
						<div class="timer time-n">
							<div>${title}</div>
							<span class="hours">00</span> :
							<span class="minutes">00</span> :
							<span class="seconds">00</span>
						</div>
						<div class="goods-desc">
							<div class="goods-img">
								<img src="${e.home_img}" alt="">
							</div>
							<div class="goods-detail">
								<div class="price">￥<span>${e.price_val}</span></div>
								<div class="name">${e.title}</div>
								${TimeHtml_}
							</div>
						</div>
					</a>
					`
				} else if (e.end_time > nowTime && e.start_time > endTime) {
					title = '距活动开始还有'
					dayInfo = new Date(e.start_time * 1000).getDate() - new Date().getDate();

					scrollListHtml += `
					<a class="item" href="/home/goods/goodsdetail.html?id=${e.goods_id}&date_id=${e.rushdate_id}&time_id=${e.rushtime_id}">
						<div class="timer">
							<div>${title}</div>
							<span>${dayInfo}天</span>
						</div>
						<div class="goods-desc">
							<div class="goods-img">
								<img src="${e.home_img}" alt="">
							</div>
							<div class="goods-detail">
								<div class="price">￥<span>${e.price_val}</span></div>
								<div class="name">${e.title}</div>
								<div class="tips">即将开始</div>
							</div>
						</div>
					</a>
					`
				}
			})
			scrollList.append(scrollListHtml)
		}
	}
	getNewGoods();
	
	// 判断在当前小时内的数据并插入HTML中
	var categoryTimesList = $('.category .list')
	var notstart = $('.sale.notstart')
	var start = $('.sale.start')

	function getArray(array, time) {
		let activeStr = 0
		let activeEnd = 0
		let categoryTimeHtml = ''
		let startListHtml = ''
		let startHtml = ''
		let notstartHtml = ''
		let activeSaleHtml = ''
		let goodsArr = []
		let key = 0

		if (
			new Date(array.date * 1000).getDate() ==
			new Date(nowTime * 1000).getDate() &&
			array.date < nowTime
		) {
			let newArr = JSON.parse(JSON.stringify(array.rushtime))
			newArr.sort(function (a, b) {
				return a.end_time - b.end_time
			})
			if (newArr.length > 0) {
				newArr.forEach(function (e, k) {
					let bool = '';
					let tempArr = [];
					let newGoods = JSON.parse(JSON.stringify(e.goods));

					if (newGoods.length > 3) {
						tempArr = newGoods.splice(0, 3);
						newGoods = newGoods.sort(function(a,b) {
							return a.goods_id - b.goods_id
						});
						newGoods = tempArr.concat(newGoods);				
					}

					if (e.start_time < time && e.end_time > time) {
						startHtml = `<div class="sale-list"></div>`
						activeStr = e.start_time
						activeEnd = e.end_time
						newGoods.map(function (i) {
							let sold = (i.num_back - i.num) / i.num_back;
							if(sold > 0.1) {
								soldPercent = Math.round(sold *100);
							}else {
								let ar = sold * 100;
								soldPercent = ar.toFixed(2);
							}
							startListHtml += `
			  <a class="list-item" href="/home/goods/goodsdetail.html?id=${
          i.goods_id
        }&date_id=${i.rushdate_id}&time_id=${i.rushtime_id}">
			  <img src='${homeImg}/temp-images/default.jpg' data-src=${i.home_img} alt="" />
			  <div class="detail">
				  <div class="sale-top">
					  <div class="name">${i.username}</div>
					  <div class="sale-progress">
						  <span class="progress-bar" style="--progressWidth:${
                soldPercent <= 5 ? 5 : soldPercent
              }%" data-percent="${soldPercent}%"></span>
						  <div class="sold">已抢${i.num_back - i.num}件</div>
					  </div>
				  </div>
				  <div class="sale-bottom">
					  <div class="price">
						  <div class="now-price">￥<span>${i.price_val}</span></div>
						  <div class="old-price">￥<span>${i.orprice_val}</span></div>
					  </div>
					  <div class="sale-btn">马上抢<i class="iconfont icon-right"></i></div>
					</div>
			  </div>
		  </a> 
			  `
						})
						key = k
					}
					if (e.end_time > time && activeEnd < e.end_time) {
						if (k == key + 1) {
							bool = 'active'
							newGoods.map(function (i) {
								let sold = (i.num_back - i.num) / i.num_back;								
								if(sold > 0.1) {
									soldPercent = Math.round(sold *100);
								}else {
									let ar = sold * 100;
									soldPercent = ar.toFixed(2);
								}
								activeSaleHtml += `
				  <a class="list-item" href="/home/goods/goodsdetail.html?id=${
            i.goods_id
          }&date_id=${i.rushdate_id}&time_id=${i.rushtime_id}">
				  <img src='${homeImg}/temp-images/default.jpg' data-src=${i.home_img} alt="" />
			  <div class="detail">
				  <div class="sale-top">
					  <div class="name">${i.username}</div>
					  <div class="sale-progress">
						  <span class="progress-bar" style="--progressWidth:0%" data-percent="0%"></span>
						  <div class="sold">已抢0件</div>
					  </div>
				  </div>
				  <div class="sale-bottom">
					  <div class="price">
						  <div class="now-price">￥<span>${i.price_val}</span></div>
						  <div class="old-price">￥<span>${i.orprice_val}</span></div>
					  </div>
						  <div class="sale-btn">即将开抢</div>
						</div>
				  </div>
			  </a> 
				  `
							})
						}
						categoryTimeHtml += `<li class="item ${bool}">${e.username}</li>`
						notstartHtml += `<div class="sale-list ${bool}"></div>`
						goodsArr.push(newGoods)
					}
				})

				if (goodsArr.length < 1) {
					notstartHtml = `<div class="nocontent">
				<p>活动尚未开始</p>
				</div>`
				}
				if (activeEnd == 0) {
					startHtml = `<div class="nocontent">
				<p>活动尚未开始</p>
				</div>`
				}
			}
			categoryTimesList.html(categoryTimeHtml)
			notstart.html(notstartHtml)
			start.html(startHtml)

			let startList = $('.sale.start .sale-list')
			startList.append(startListHtml)

			let activeSale = $('.notstart.sale .sale-list.active')
			activeSale.append(activeSaleHtml)
		}

		return {
			activeStr: activeStr,
			activeEnd: activeEnd,
			goodsArr: goodsArr
		}
	}
	var jus = getArray(rushgoods, nowTime)
	var activeStr = jus.activeStr
	var activeEnd = jus.activeEnd
	var goodsArr = jus.goodsArr

	// 当timeList的长度大于6个以上才显示
	var totalBtn = $('.total')
	var listLength = categoryTimesList.eq(0).find('.item').length

	if (listLength <= 6) {
		totalBtn.hide()
	} else {
		totalBtn.show()
	}



	// category时间item点击事件
	var notstartLists = $('.notstart .sale-list')
	categoryTimesList.find('.item').on('click', function () {
		let saleListHtml = ''
		let $this = $(this)
		let num = $this.index()
		let er = 0

		if ($this.parent().is('#top-list')) {
			er = 1
		}
		categoryTimesList.find('.item').removeClass('active')
		notstartLists.removeClass('active')
		$this.addClass('active')
		notstartLists.eq(num).addClass('active')

		categoryTimesList
			.eq(er)
			.find('.item')
			.eq(num)
			.addClass('active')

		goodsArr[num].map(function (i) {
			let sold = (i.num_back - i.num) / i.num_back;
			if(sold > 0.1) {
				soldPercent = Math.round(sold *100);
			}else {
				let ar = sold * 100;
				soldPercent = ar.toFixed(2);
			}
			saleListHtml += `
          <a class="list-item" href="/home/goods/goodsdetail.html?id=${
            i.goods_id
          }&date_id=${i.rushdate_id}&time_id=${i.rushtime_id}">
          <img src=${i.home_img} alt="" />
          <div class="detail">
              <div class="sale-top">
                  <div class="name">${i.username}</div>
                  <div class="sale-progress">
                      <span class="progress-bar" style="--progressWidth:0%" data-percent="0%"></span>
                      <div class="sold">已抢0件</div>
                  </div>
              </div>
              <div class="sale-bottom">
                  <div class="price">
                      <div class="now-price">￥<span>${i.price_val}</span></div>
                      <div class="old-price">￥<span>${i.orprice_val}</span></div>
                  </div>
                  <div class="sale-btn">即将开抢</div>
              </div>
          </div>
      </a> 
          `;

			notstartLists.eq(num).html(saleListHtml)
		})
	})

	var topTimer = $('.top .timer')
	var recomTimerN = scrollList.eq(0).find('.time-n'); // 活动开始的计时器

	var num = 0
	var numb = nowTime + num
	countDown(num, nowTime, activeEnd, topTimer)

	setInterval(function () {
		num++
		numb = nowTime + num
		reload(numb)
		countDown(num, nowTime, activeEnd, topTimer)
	}, 1000);

	var numN = 0;
	var numS = 0;
	var nowTimeRecogoods = 0;
	newGoodsArr.forEach(function (sube,kk) {
		if (sube.end_time > nowTime) {
			let nTimer = recomTimerN.eq(numN);
			if (sube.start_time < nowTime) {
				countDown(num, nowTime, sube.end_time, nTimer);
				let ar = setInterval(function () {
					let nowTimeRecogoods = nowTime + num;
					if(nowTimeRecogoods >=  sube.end_time) {
						$('.scroll-list').find('a.item').each(function() {
							let $this = $(this);
							let hours = $this.find('.hours').html();
							let minutes = $this.find('.minutes').html();
							let seconds = $this.find('.seconds').html();
							if(hours == '00' && minutes == '00' && seconds == '00' ) {
								$this.remove();
								clearInterval(ar);
							}
						});
					}
					countDown(num, nowTime, sube.end_time, nTimer)
				}, 1000)
			} else {
				countDown(num, nowTime, sube.start_time, nTimer);
				let arrs = setInterval(function () {
					let nowTimeRecogoods = nowTime + num;
					if(nowTimeRecogoods >= sube.start_time) {
						$('.scroll-list').find('a.item').each(function() {
							let $this = $(this);
							let hours = $this.find('.hours').html();
							let minutes = $this.find('.minutes').html();
							let seconds = $this.find('.seconds').html();
							if(hours == '00' && minutes == '00' && seconds == '00' ) {
								/**
								 * 执行****
								 */
								let end_time = $this.find('.end_time').val() * 1;
								let num_back = $this.find('.num_back').val() * 1;
								let goodsNum = $this.find('.num').val()  * 1;
								$this.find('.timer.time-n div').html('距结束还剩');
								$this.find('.tips').html(`已抢${num_back - goodsNum}件`);
								/**
								 * 执行*******
								 */
								let arr = setInterval(function () {
									let nowTimeRecogoods = nowTime + num;
									if(nowTimeRecogoods >=  end_time) {
										$('.scroll-list').find('a.item').each(function() {
											let $this = $(this);
											let hours = $this.find('.hours').html();
											let minutes = $this.find('.minutes').html();
											let seconds = $this.find('.seconds').html();
											if(hours == '00' && minutes == '00' && seconds == '00' ) {
												$this.remove();
												clearInterval(arr);
											}
										});
									}
									countDown(num, nowTime, end_time, $this)
								}, 1000)
								clearInterval(arrs);
							}
						});
					}
					countDown(num, nowTime, sube.start_time, nTimer)
				}, 1000)
			}
			numN ++;
		} 
	})

	function reload(num) {
		//如果当前时间大于今日结束时间，强制刷新页面
		if (endTime < num) {
			window.location.reload(true)
			return false
		}
		// 即将开始栏目的到点触发
		else if (activeEnd < num && activeStr < num) {
			let jus = getArray(rushgoods, num)
			if (jus.activeStr != 0 && jus.activeEnd != 0) {
				activeStr = jus.activeStr
				activeEnd = jus.activeEnd
			}
		}
	}


	var navItem = $('.nav-item')
	var category = $('.category')
	var saleList = $('.sale')

	navItem.on('click', function () {
		let $this = $(this)
		navItem.removeClass('active')
		saleList.removeClass('active')

		if ($this.is('.notstart')) {
			$('.notstart').addClass('active')
			category.addClass('active')
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
	});




// 首次访问时弹出并发送请求
function popRecom(val) {
	let recomHtml = `
	<div class="pop-recom">
        <i class="iconfont icon-close" id="recom-close"></i>
            <img src="/ad.png" alt="">
    </div>`;
	let maskHtml = `<div class="mask"></div>`;
	$('.wrapper').after(maskHtml);
	$('.wrapper').after(recomHtml);

	setTimeout(function() {
		$('.pop-recom').addClass('show');
	}, 150);


	$('#recom-close, .mask').bind('click', function () {
	  // 移除问询框的HTML
	  $('.pop-recom').remove();
	  $('.mask').remove();
  
	  // 进行下一步操作
	  val.success();
	})
  };

  let loaded = sessionStorage.getItem('loaded');
  if (loaded == null || typeof loaded === 'undefined') {
	popRecom({
		success: function() {
			_post({
				url: '/home/index/recorder.html',
				success: function(msg){
					if (msg.code == 1) {
						sessionStorage.setItem('loaded', 'loaded');
					}
				}
				,alert:false
				,loading:false
			})
		}
	  })
  }