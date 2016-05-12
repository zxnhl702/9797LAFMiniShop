$(function() {
	var url = window.location.href.split('=')[1];
	
	var changeTab = function(eq,id){
		$('.uo-bt a').eq(eq).addClass('active').siblings().removeClass('active');
		$(id).addClass('active').siblings().removeClass('active');
	}
		
	if(url == 'dfk'){
		changeTab(1,'#dfk')
	}else if(url == 'dfh'){
		changeTab(2,'#dfh')
	}else if(url == '#dsh'){
		changeTab(3,'#dsh')
	}else{
		changeTab(0,'#all')
	}
	//多个标签页下的无限滚动
	$(document).on("pageInit", ".page", function(e, id, page) {
		var loading = false;
		// 每次加载添加多少条目
		var itemsPerLoad = 2;
		// 最多可加载的条目
		var maxItems = 20;
		var lastIndex = $('.infinite-scroll.active ul li').length;

		function addItems(number, lastIndex) {
			// 生成新条目的HTML
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
				html += '<li><header class="clearfix uo-list-header"><h6 class="pull-left">订单号:201601010237</h6><span class="pull-right">交易完成</span></header><a href="order-detail.html" class="db clearfix"><img src="img/item-test.jpg" width="100%" class="db"><div class="item-info"><p>[热销]木墨MUMO 实木斗柜 原木九斗柜黑胡桃木九抽屉柜</p><span>¥ 6350.0 <small>x 2</small></span></div></a></li>';
			}
			// 添加新条目
			$('.infinite-scroll.active ul').append(html);
		}
		addItems(2,0)
		$(page).on('infinite', function() {
			// 如果正在加载，则退出
			if (loading) return;
			// 设置flag
			loading = true;
			var tabIndex = 0;
			if ($(this).find('.infinite-scroll.active').attr('id') == "all") {
				tabIndex = 0;
			}else if ($(this).find('.infinite-scroll.active').attr('id') == "dfk") {
				tabIndex = 1;
			}else if ($(this).find('.infinite-scroll.active').attr('id') == "dfh") {
				tabIndex = 2;
			}else{
				tabIndex = 3;
			}
			lastIndex = $('.infinite-scroll.active ul li').length;
			// 模拟1s的加载过程
			setTimeout(function() {
				// 重置加载flag
				loading = false;
				if (lastIndex >= maxItems) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					$.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
					// 删除加载提示符
					$('.infinite-scroll-preloader').html('<span class="infinite-scroll-tips">已全部加载</span>');
					return;
				}
				addItems(itemsPerLoad, lastIndex);
				// 更新最后加载的序号
				lastIndex = $('.infinite-scroll.active ul li').length;
				$.refreshScroller();
			}, 1000);
		});
	});


	$.init();
});