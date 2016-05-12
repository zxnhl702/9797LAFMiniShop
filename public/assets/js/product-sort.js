$(function(){
	//sort add fn
	/*
	$('#sort-add').on('click',function(){
		if($(this).hasClass('disabled')){
			layer.msg('暂未开放');
		}
	})
	*/

	//sort del fn
	$('.product-sort-body').on('click','#sort-del',function(){
		if($(this).hasClass('disabled')){
			layer.msg('默认分类，无法删除');
		}
	})

	//sort edit fn
	/*
	$('.product-sort-body').on('click','#sort-edit',function(){
		var sortName = $(this).parents('tr').children('#sort-name').text();
		var sortState = $(this).parents('tr').find('.glyphicon');

		//modal input name
		$('#sem-name').val(sortName);

		//modal checkbox and file active
		if(sortState.hasClass('glyphicon-ok')){
			$('#sem-checkbox').attr('checked',true);
			$('#sem-file').attr('disabled',false);
		}
	})
	*/

	//modal start

		//checkbox change fn
		/*
		$('#sem-checkbox').on('click',function(){
			$('#sem-file').attr('disabled',!$(this).is(':checked'));
		})
		*/

		//accept upload image type
		$('#sem-file').on('change',function(){
			var val = $(this).val();
			var type = val.substring(val.lastIndexOf('.')+1);
			if(type != 'jpg'){
				$(this).val('');
				layer.msg('请选择正确的文件格式(jpg)');
			}
		})

	//modal end
})
