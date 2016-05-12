$(function(){
	_Reload();
	
	//购物车总计个数
	/*
	var CartTotal = function(){
		var cartList = $('.cart-list li').length;
		if(cartList == 0){
			$('.bar-nav h1').text('购物车 ');
			$('.cart-null').show();
			$('.cart-bar').hide();
		}else{
			$('.bar-nav h1').text('购物车 ('+$('.cart-list li').length+')');		
		}
	}
	CartTotal();
	
	//cart-check
	$('.cart-check').on('click',function(){
		var $i = $(this).children('i');
		var $numAdd = $(this).next().find('.num-add');
		var $numRed = $(this).next().find('.num-reduce');
		if($i.hasClass('active')){
			$i.removeClass('active');	
			$numAdd.removeClass('active'); //移除算法
			$numRed.removeClass('active');
			totalNum = totalNum - $numRed.next().text();	//总计个数
			if(totalNum == 0){
				$('.cart-bar-submit').text('去结算');
			}else{
				$('.cart-bar-submit').text('去结算 ('+totalNum+')');				
			}
			$numRed.next().text('1'); //重置个数
		}else{
			$i.addClass('active');
			$numAdd.addClass('active'); //激活算法
			totalNum ++;	//总计个数
			$('.cart-bar-submit').text('去结算 ('+totalNum+')');
		}
		//如果选中的项目个数与购物车内的商品个数相册则点这也全选按钮
		if($('.cart-check i.active').length == $('.cart-list li').length){
			$('.cart-bar-check').addClass('active');
		}else{
			$('.cart-bar-check').removeClass('active');
		}
	})
	
	//all check
	$('.cart-bar-check').on('click',function(){
		if($(this).hasClass('active')){
			$('.cart-check i').removeClass('active');
			$(this).removeClass('active')
		}else{
			$('.cart-check i').addClass('active');
			$(this).addClass('active')
		}
	})
	
	//delete
	$('.cart-tool i').on('click',function(){
		var $this = $(this);
		$.confirm('确认删除这个宝贝么?', function () {
			$this.parents('li').remove();
          	$.toast('删除成功');
          	
          	CartTotal();
      	});
	})
	
	var	totalNum = 0, //总计个数 
		totalPrice = 0; //总计价格
		totalPrice_b = 0;
	//减法
	$('.num-reduce').on('click',function(){
		var n = $(this).next().text();
		var $li = $(this).parents('li');
		if($(this).hasClass('active')){
			if(n > 1){
				n--;
				var price = $li.attr('data-price') * n;				
				if( n == 1){
					$(this).removeClass('active');
				}else{
					$(this).addClass('active');
				}
				$(this).next().text(n);	//小计个数
				$li.find('.cart-footer').text('小计:¥ ' + price); //小计价格
				totalNum --;	//总计个数
				if(totalNum == 0){
					$('.cart-bar-submit').text('去结算');
				}else{
					$('.cart-bar-submit').text('去结算 ('+totalNum+')');				
				}
			}
		}
	})
	
	//加法
	$('.num-add').on('click',function(){
		var n = $(this).prev().text();
		var $li = $(this).parents('li');
		if($(this).hasClass('active')){
			n++;
			var price = $li.attr('data-price') * n;
			if(n > 1){
				$(this).prev().prev().addClass('active');
			}
			$(this).prev().text(n); //小计个数
			$li.find('.cart-footer').text('小计:¥ ' + price); //小计价格
			totalNum ++; //总计个数
			$('.cart-bar-submit').text('去结算 ('+totalNum+')');
		}else{
			$.toast('请勾选商品后再操作');
		}
	})
	*/
	
})
