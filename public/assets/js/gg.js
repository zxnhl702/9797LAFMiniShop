$(function(){
	//modal start
	
		//img file fn
		$("#ad-modal-file").on('change',function(){
			var val = $(this).val();
			var type = val.substring(val.lastIndexOf('.')+1);
			if(type != 'jpg'){
				$(this).val('');
				layer.msg('请选择正确的文件格式(jpg)');
			}
		})
		
		//ad type fn
		$('#ad-type').on('change',function(){
			var select = $(this).children('option:selected').text();
			
			if(select == '活动'){
				$('#ad-modal-product').attr('disabled',true);
				$('#ad-modal-link').attr('disabled',false);
			}else if(select == '商品'){
				$('#ad-modal-product').attr('disabled',false);
				$('#ad-modal-link').attr('disabled',true);
			}else{
				$('#ad-modal-product').attr('disabled',true);
				$('#ad-modal-link').attr('disabled',true);
			}
		})
		
	//modal end
})
