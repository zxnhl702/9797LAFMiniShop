$(function() {
	// Data tables
	/*
	var itemData = [
		[
			"#201509821",
			"vivo X6A全网通高配版4G超薄八核高清大屏双卡智能指纹手机vivox6",
			"3000/5000",
			"手机数码",
			"<i class='glyphicon glyphicon-ok text-success'></i>",
			"2016-02-02 18:34:50",
			"<i class='glyphicon glyphicon-ok text-success'></i>",
			"30",
			"圣诞",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#product-modal" id="product-edit">编辑</button><button type="button" class="btn btn-danger btn-sm">下架</button><button type="button" class="btn btn-primary btn-sm" id="go-comment">评价</button><button type="button" class="btn btn-warning btn-sm">删除</button></div>'
		],
		[
			"#201509822",
			"vivo X5A全网通高配版4G超薄八核高清大屏双卡智能指纹手机vivox5",
			"3000/5000",
			"手机数码",
			"<i class='glyphicon glyphicon-remove text-red'></i>",
			"<i class='glyphicon glyphicon-remove text-red'></i>",
			"<i class='glyphicon glyphicon-remove text-red'></i>",
			"30",
			"<i class='glyphicon glyphicon-remove text-red'></i>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#product-modal" id="product-edit">编辑</button><button type="button" class="btn btn-danger btn-sm">上架</button><button type="button" class="btn btn-primary btn-sm" id="go-comment">评价</button><button type="button" class="btn btn-warning btn-sm">删除</button></div>'
		]
	]

	$("#product-table").DataTable({
		data: itemData,
		language: {
			"sProcessing": "处理中...",
			"sLengthMenu": "显示 _MENU_ 项结果",
			"sZeroRecords": "没有匹配结果",
			"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
			"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix": "",
			"sSearch": "搜索:",
			"sUrl": "",
			"sEmptyTable": "表中数据为空",
			"sLoadingRecords": "载入中...",
			"sInfoThousands": ",",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上一页",
				"sNext": "下一页",
				"sLast": "末页"
			},
			"oAria": {
				"sSortAscending": ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		}
	});
	*/

	//product modal start

		//img file fn
		$("#pm-img-file").on('change',function(){
			var val = $(this).val();
			var type = val.substring(val.lastIndexOf('.')+1);
			if(type != 'jpg'){
				$(this).val('');
				layer.msg('请选择正确的文件格式(jpg)');
			}
		})

		//pack checkbox fn
		/*
		$("#pm-pack-checkbox").on('click',function(){
			$('#pm-pack-input').attr('disabled',$(this).is(':checked'));
		})
		*/

		//sale state fn
		/*
		$("#pm-sale-list").on('click','li',function(){
			var text = $(this).text();
			$("#pm-sale-btn").html(''+ text +' <span class="fa fa-caret-down"></span>');

			if(text == '定时上架'){
				$('#pm-sale-input').attr('disabled',false).val('');
			}else{
				$('#pm-sale-input').attr('disabled',true).val('');
			}
		})
		*/

		//sort change fn
		var selectDisabled = function(){
			$('.form-custom').on('click','input[type="checkbox"]',function(){
				var checked = $(this).is(':checked');
				$(this).parent().next().attr('disabled',!checked);
			})
		}
		$('#pm-sort').on('change',function(value){
			var val = $(this).children('option:selected').val();
			var $custom = $('.form-custom');
			//鞋尺码
			var $xieChiMa = '<div class="form-group"><label>尺码</label><div class="input-group"><span class="input-group-addon"><input type="checkbox"checked id="pm-pack-checkbox"/></span><select class="form-control xie-chima"multiple="multiple"style="width: 100%;"><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option></select></div></div>';
			//服装尺码
			var $fuChiMa = '<div class="form-group"><label>尺码</label><div class="input-group"><span class="input-group-addon"><input type="checkbox"checked id="pm-pack-checkbox"/></span><select class="form-control fu-chima"multiple="multiple"style="width: 100%;"><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option><option>XXXL</option><option>XXXXL</option></select></div></div>';
			//箱尺寸
			var $xiangChiCun = '<div class="form-group"><label>尺寸</label><div class="input-group"><span class="input-group-addon"><input type="checkbox"checked id="pm-pack-checkbox"/></span><select class="form-control xiang-chicun"multiple="multiple"style="width: 100%;"><option>15寸</option><option>16寸</option><option>17寸</option><option>18寸</option><option>20寸</option><option>24寸</option><option>27寸</option><option>28寸</option><option>29寸</option><option>32寸</option></select></div></div>';
			//颜色
			var $color = '<div class="form-group"><label>颜色</label><div class="input-group"><span class="input-group-addon"><input type="checkbox"checked id="pm-pack-checkbox"/></span><select class="form-control color"multiple="multiple"style="width: 100%;"><option>乳白色</option><option>白色</option><option>米白色</option><option>浅灰色</option><option>深灰色</option><option>灰色</option><option>银色</option><option>黑色</option><option>杏红色</option><option>玫红色</option><option>粉红色</option><option>红色</option><option>酒红色</option><option>卡其色</option><option>明黄色</option><option>杏色</option><option>柠檬黄</option><option>桔色</option><option>浅黄色</option><option>荧光黄</option><option>金色</option><option>香槟色</option><option>黄色</option><option>军绿色</option><option>墨绿色</option><option>浅绿色</option><option>绿色</option><option>翠绿色</option><option>青色</option><option>天蓝色</option><option>孔雀蓝</option><option>宝蓝色</option><option>浅蓝色</option><option>深蓝色</option><option>湖蓝色</option><option>蓝色</option><option>藏青色</option><option>浅素色</option><option>深紫色</option><option>紫红色</option><option>紫罗兰</option><option>紫色</option><option>咖啡色</option><option>巧克力色</option><option>栗色</option><option>浅棕色</option><option>深棕色</option><option>褐色</option><option>驼色</option></select></div></div>'


			if(val == '鞋/箱包'){
				$custom.empty();
				$($xieChiMa + $xiangChiCun + $color ).appendTo($custom);
				// $('.xie-chima,.xiang-chicun,.color').select2();
				selectDisabled();
			}else if(val == '手表眼镜' || val == '手机数码' || val == '家用电器' || val == '居家生活' || val == '家具建材' || val == '母婴用品'){
				$custom.empty();
				$($color ).appendTo($custom);
				// $('.color').select2();
				selectDisabled();
			}else if(val == '请选择商品分类' || val == '美妆护肤' || val == '食品/医药保健' || val == '图书音像'){
				$custom.empty();
			}else if(val == '女装' || val == '男装'){
				$custom.empty();
				$($fuChiMa + $color ).appendTo($custom);
				// $('.fu-chima,.color').select2();
				selectDisabled();
			}
		})

		//xinghao fn and peijian fn
		/*
		$('#pm-xinghao-inp,#pm-peijian-inp').on('keydown',function(e){
			if(e.keyCode == 13){
				var val = $(this).val();
				var val_0 = val.split('/')[0];
				var val_1 = val.split('/')[1];
				var test = new RegExp('/');
				if(!val || !test.test(val) || !val_0 || !val_1){
					layer.msg('请输入正确格式，以"/"间隔');
				}else{
					$(this).next().children('ul').append('<li><span>×</span>'+val_0+'/'+val_1+'</li>');
				}
			}
		})
		*/

		/*
		$('#pm-xinghao-checkbox').on('change',function(){
			$('#pm-xinghao-inp').attr('disabled',!$(this).is(':checked'));
			$('#pm-sj-inp,#pm-yj-inp').attr('disabled',$(this).is(':checked')).val('');
		})
		*/

		/*
		$('.pm-xinghao-list,.pm-peijian-list').on('click','span',function(){
			$(this).parent().remove();
		})
		*/

		//Date range picker with time picker
    	$('#pm-sale-input').daterangepicker({singleDatePicker:true,timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});

		//service select2
	    // $(".service").select2();

    //product modal end

    //go comment
		/*
    $('#go-comment').on('click',function(){
    	$('.sidebar-menu li').eq(5).click();
    })
		*/
})
