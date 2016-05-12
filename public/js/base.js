//Init
$.config = {
	autoInit: true
}

//pull to reload
var _Reload = function(){
	$(document).on('refresh', '.pull-to-refresh-content',function(e) {
	    // 模拟2s的加载过程
	    setTimeout(function() {
	    	location.reload();
	        // 加载完毕需要重置
	        $.pullToRefreshDone('.pull-to-refresh-content');
	    }, 1000);
	});
}

//Scroll
var _Scroll = function(type){
	$('.content').on('scroll',function(){
		var ScrollTop = $('.scrollTop');

		if($(this).scrollTop() > 220){
			if(ScrollTop.css('display') == 'none'){
				ScrollTop.fadeIn();
				$('.scrollTop').on('click',function(){
					$('.content').scrollTop(0);
				})
			}
		}else{
			if(ScrollTop.css('display') == 'block'){
				ScrollTop.fadeOut()
			}
		}

		if(type == 'pullToLoad'){
		}
	})
}

//Search
var _Search = function(){
	$('#search').on('focus',function(){
		if($('.search-layer').css('display') == 'none'){
			$('.search-layer').fadeIn();
		}
		$('.searchbar-cancel').on('click',function(){
			$('.search-layer').fadeOut();
		})
	})
}
