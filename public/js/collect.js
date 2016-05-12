$(function() {
	//del
	$('.collect-del').on('click', function(e) {
		var $this = $(this);
		e.stopPropagation();
		e.preventDefault();
		$.confirm('取消收藏？', function() {
			$.toast('取消成功');
			$this.parents('li').remove();
		})
	})


	//Pull To load

	// 加载flag
	var loading = false;
	// 最多可加载的条目
	var maxItems = 16;

	// 每次加载添加多少条目
	var itemsPerLoad = 1;

	function addItems(number, lastIndex) {
		// 生成新条目的HTML
		var html = '';
		for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
			html += '<li><a href="detail.html" class="db clearfix"><img src="img/item-test.jpg" width="100%" class="db"><div class="item-info"><p>[热销]木墨MUMO 实木斗柜 原木九斗柜黑胡桃木九抽屉柜</p><span>¥ 6350.0</span><i class="iconFonts collect-del">&#xe63a;</i></div></a></li>';
		}
		// 添加新条目
		$('.collect-list').append(html);
		$('.infinite-scroll-preloader').hide();
	}
	addItems(8, 0)
		// 上次加载的序号
	var lastIndex = $('.collect-list li').length;

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
			lastIndex = $('.collect-list li').length;
			//容器发生改变,如果是js滚动，需要刷新滚动
			$.refreshScroller();
		}, 1000);
	});
})
