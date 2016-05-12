$(function() {
	// Data tables
	var itemData = [
		[
			"#201509821",
			"隔壁家老王",
			"vivo X6A全网通高配版4G超薄八核高清大屏双卡智能指纹手机vivox6",
			"test",
			"2016-02-02 18:34:50",
			"<button type='button' class='btn btn-danger btn-sm'>删除</button>",
		],
		[
			"#201509821",
			"隔壁家老王",
			"vivo X6A全网通高配版4G超薄八核高清大屏双卡智能指纹手机vivox6",
			"test",
			"2016-02-02 18:34:50",
			"<button type='button' class='btn btn-danger btn-sm'>删除</button>",
		]
	]
	
	$("#comment-table").DataTable({
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