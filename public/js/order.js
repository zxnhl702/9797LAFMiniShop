$(function(){
	//address 如果没有地址则显示添加按钮
	if($('.order-address-info').css('display') == 'none'){
		$('.order-address a').show();
	}
	//use credit
	$('.item-credit').on('click','i',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');			
		}else{
			$(this).addClass('active');
		}
	})

	//select coupon
	$('.item-coupon').on('click',function(){
		var coupon = $(this).attr('data-coupon');
		if(coupon != 0){
			$.popup('.popup-coupon');
		}else{
			$.toast('您暂无优惠券可用');
		}
	})
	
	/*
	$('.popup-coupon').on('click','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.item-coupon').find('.item-after').text('- ¥100.0 ');
	})
	*/
})
