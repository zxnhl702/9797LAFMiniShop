$(function() {
	_Scroll('pullToLoad');
	_Reload()

	//filter-tab
	/*
	$('.filter-tab').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');

		if ($(this).hasClass('change')) {
			$(this).toggleClass('changed').siblings().removeClass('changed');
		}
	})
	*/

	//viewtype
	var vt = 0;
	$('.viewtype-switch').on('click', function() {
		if (vt == 0) {
			$(this).children('i').html('&#xe623;')
			vt++;
			$('.larger-view').removeClass('larger-view').addClass('list-view');
		} else {
			$(this).children('i').html('&#xe688;')
			vt--;
			$('.list-view').removeClass('list-view').addClass('larger-view');
		}
	})


	/*
	//Pull To load

	// 加载flag
	var loading = false;
	// 最多可加载的条目
	var maxItems = 16;

	// 每次加载添加多少条目
	var itemsPerLoad = 4;

	function addItems(number, lastIndex) {
		// 生成新条目的HTML
		var html = '';
		for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
			html += '<li><a href="detail.html" class="db clearfix"><img src="img/item-test.jpg" width="100%" class="db" /><div class="item-info"><p>[热销]木墨MUMO  实木斗柜 原木九斗柜黑胡桃木九抽屉柜</p><span>¥ 6350.0</span></div></a></li>';
		}
		// 添加新条目
		$('.infinite-scroll-bottom .list ul').append(html);
		$('.infinite-scroll-preloader').hide();
	}
	addItems(8, 0)
	// 上次加载的序号
	var lastIndex = $('.list li').length;

	// 注册'infinite'事件处理函数
	$(document).on('infinite', '.infinite-scroll-bottom', function() {
		$('.infinite-scroll-preloader').show();
		// 如果正在加载，则退出
		if (loading) return;

		// 设置flag
		loading = true;

		// 模拟1s的加载过程
		setTimeout(function() {
			// 重置加载flag
			loading = false;
			if (lastIndex >= maxItems) {
				// 加载完毕，则注销无限加载事件，以防不必要的加载
				$.detachInfiniteScroll($('.infinite-scroll'));
				// 删除加载提示符
				$('.infinite-scroll-preloader').html('<span class="infinite-scroll-tips">已全部加载</span>');
				return;
			}

			// 添加新条目
			addItems(itemsPerLoad, lastIndex);
			// 更新最后加载的序号
			lastIndex = $('.list li').length;
			//容器发生改变,如果是js滚动，需要刷新滚动
			$.refreshScroller();
		}, 1000);
	});
	*/
})
