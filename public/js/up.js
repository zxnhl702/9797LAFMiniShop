$(function(){
	$('.up-photo,.up-name,.up-sex').on('click',function(){
		$.toast('此项无法更改');
	})
	$('.up-phone').on('click',function(){
		var $this = $(this);
		var tel;
		$.prompt('请输入您的手机号',function(value){
			tel = value;
			if(!/^(13[0-9]|14[7]|15[0-9]|18[0-9])\d{8}$/.test(value) == false){
				$.prompt('请输入4位手机验证码',function(value){
					if(value.length == 4){
						$.toast('更改成功');
						$this.find('.item-after').text(tel);
					}else{
						$.toast('请输入正确的4位手机验证码');
					}
				})
			}else{
				$.toast('请输入正确的11位手机号');
			}
		})
	})
})
