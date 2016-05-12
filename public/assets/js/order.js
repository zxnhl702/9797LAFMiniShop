$(function() {
	// Data tables
	var itemData = [
		[
			"#201509821",
			"隔壁家老王",
			"2016-02-02 18:34:50",
			"张阿三 | 15088887777 | 浙江省 舟山市 定海区 昌国路135号",
			"3000",
			"<span class='label label-primary'>未付款</span>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm">取消</button></div>'
		],
		[
			"#201509821",
			"隔壁家老王",
			"2016-02-02 18:34:50",
			"张阿三 | 15088887777 | 浙江省 舟山市 定海区 昌国路135号",
			"3000",
			"<span class='label label-info'>已付款,未发货</span>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm">取消</button></div>'
		],
		[
			"#201509821",
			"隔壁家老王",
			"2016-02-02 18:34:50",
			"张阿三 | 15088887777 | 浙江省 舟山市 定海区 昌国路135号",
			"3000",
			"<span class='label label-warning'>已发货,未收货</span>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm">取消</button></div>'
		],
		[
			"#201509821",
			"隔壁家老王",
			"2016-02-02 18:34:50",
			"张阿三 | 15088887777 | 浙江省 舟山市 定海区 昌国路135号",
			"3000",
			"<span class='label label-danger'>确认收货,未评价</span>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm">取消</button></div>'
		],
		[
			"#201509821",
			"隔壁家老王",
			"2016-02-02 18:34:50",
			"张阿三 | 15088887777 | 浙江省 舟山市 定海区 昌国路135号",
			"3000",
			"<span class='label label-success'>已完成</span>",
			'<div class="btn-group"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm" disabled>取消</button></div>'
		]
	]
	
	$("#order-table").DataTable({
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
	
})