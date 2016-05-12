$(function(){
	_Scroll()
	
	_Reload();
	
	//spec
	$('.pro-spec p').on('click','span',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
		
	//num
	/*
	var $reduce = $('.num-reduce'),$add = $('.num-add'),_val = $('.num-val'),n = _val.text();
	$reduce.on('click',function(){
		if(n > 1){
			n--;
			if( n == 1){
				$reduce.addClass('num-disabled');
			}
			_val.text(n);
		}
	})
	$add.on('click',function(){
		n++;
		if(n > 1){
			$reduce.removeClass('num-disabled');
		}
		_val.text(n);
	})
	*/
	
	//eval 如果评价列表为空，则不显示
	/*
	if($('#pro-eval li').length == 0){
		$('#pro-eval').hide();
	}
	*/
		
	//comment
	$('.pro-more-eval').on('click-1',function(){ // click-1 (fake for)-> click
		$.popup('.popup-comment');
		
		//Pull To Load
		$.initInfiniteScroll('.popup-comment .content'); 

		// 加载flag
		var loading = false;
		// 最多可加载的条目
		var maxItems = 12;
	
		// 每次加载添加多少条目
		var itemsPerLoad = 2;
	
		function addItems(number, lastIndex) {
			// 生成新条目的HTML
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
				html += '<li class="clearfix"><img src="img/avatar.jpg" class="pull-left" /><div><h5 class="margin-bottom pro-eval-name">我是网名</h5><p class="margin-bottom pro-eval-content">我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容</p><p class="pro-eval-info">2016-01-01&nbsp;&nbsp;颜色:黑色&nbsp;&nbsp;尺寸:均码</p></div></li>';
			}
			// 添加新条目
			$('#pro-all-eval ul').append(html);
			$('.infinite-scroll-preloader').hide();
		}
		// addItems(2, 0)
		// 上次加载的序号
		var lastIndex = $('#pro-all-eval ul li').length;
	
		// 注册'infinite'事件处理函数
		$('.popup-comment .content').on('infinite', function() {
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
				lastIndex = $('#pro-all-eval ul li').length;
				//容器发生改变,如果是js滚动，需要刷新滚动
				$.refreshScroller();
			}, 1000);
		});
		
	})
	
	/*
	//detail
	$('.pro-detail').on('click',function(){
		$.popup('.popup-detail');
	})
	
	//like
	$('.pro-collect').on('click',function(){
		if($(this).hasClass('active') == false){
			$(this).addClass('active').children('span:first-child').html('&#xe619;');
			$.toast('收藏成功');
		}else{
			$(this).removeClass('active').children('span:first-child').html('&#xe61a;');
			$.toast('取消收藏');			
		}
	})
	
	//add cart
	$('.pro-action-cart').on('click',function(){
		$.toast('加入购物车成功')
	})
	*/
})

