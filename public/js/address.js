$(function(){
	//删除地址
	$('.address-edit').on('click',function(){
		if($(this).text() == '编辑'){
			$(this).text('返回');
			$('input').attr('type','checkbox');
			// $('.address-btn').text('删除');
		}else{
			$(this).text('编辑');
			$('input').attr('type','radio');
			// $('.address-btn').text('新增地址');
		}
	})
	
	/*
	$('.address-btn').on('click',function(){
		if($(this).text() == '删除'){
			var size = $('input[type="checkbox"]:checked').size();
			if(size == 0){
				$.toast('请选择要删除的地址');
			}else{
				$.confirm('确认要删除 '+ size +' 个地址吗?',function(){
					$.toast('删除成功');
					$('input[type="checkbox"]:checked').parents('li').remove();
				})
			}
		}else{
			$.popup('.popup-address');
		}
	})
	*/
})
