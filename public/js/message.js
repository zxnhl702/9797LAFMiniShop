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
		html += '<li><div class="item-content"><div class="item-media"><img src="img/activity.png"></div><div class="item-inner"><a href="message-detail.html"><div class="item-title-row"><div class="item-title">活动信息</div></div><div class="item-subtitle">新年伊始，万事皆新！</div><div class="item-time">2015-09-01 12:34</div></div></a></div><li><div class="item-content"><div class="item-media"><img src="img/message.png"></div><div class="item-inner"><a href="message-detail.html"><div class="item-title-row"><div class="item-title">通知消息</div></div><div class="item-subtitle">恭喜您的订单已经签收成功！</div><div class="item-time">2015-09-01 12:34</div></div></a></div>';
	}
	// 添加新条目
	$('.message-list ul').append(html);
	$('.infinite-scroll-preloader').hide();
}
addItems(5, 0)
	// 上次加载的序号
var lastIndex = $('.message-list li').length;

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
		lastIndex = $('.message-list li').length;
		//容器发生改变,如果是js滚动，需要刷新滚动
		$.refreshScroller();
	}, 1000);
});