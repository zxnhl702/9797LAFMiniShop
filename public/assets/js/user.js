$(function() {
	// Data tables
	var itemData = [
		[
			"#1",
			"隔壁家老王",
			"15088729901",
			"5000",
			"21",
			"3000",
			"2012-01-01 12:34:21",
			"2015-01-01 12:34:12",
			'<div class="btn-group"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#user-modal">查看</button><button type="button" class="btn btn-info btn-sm">TA的订单</button><button type="button" class="btn btn-danger btn-sm">删除</button></div>'
		],
		[
			"#2",
			"隔壁家老孙",
			"15088729901",
			"5000",
			"21",
			"3000",
			"2012-01-01 12:34:21",
			"2015-01-01 12:34:12",
			'<div class="btn-group"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#user-modal">查看</button><button type="button" class="btn btn-info btn-sm">TA的订单</button><button type="button" class="btn btn-danger btn-sm">删除</button></div>'
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
	
	$('#ticket-startTime,#ticket-endTime').daterangepicker({singleDatePicker:true,timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
	
	$('#ticket-type').on('change',function(){
		var select = $(this).children('option:selected').text();
		if(select == '满减'){
			$('.ticket-fullToOff').attr('disabled',false);
			$('#ticket-unlimited').attr('disabled',true);
		}else if(select == '无限制'){
			$('.ticket-fullToOff').attr('disabled',true);
			$('#ticket-unlimited').attr('disabled',false);
		}else{
			$('.ticket-fullToOff').attr('disabled',true);
			$('#ticket-unlimited').attr('disabled',true);
		}
	})
})