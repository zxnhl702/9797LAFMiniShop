var is_test = true,
	test_addr = "http://" + window.location.hostname + ":11004/",
	app_addr = "http://115.231.121.138:10001/"; // not sure

var addr = is_test?test_addr:app_addr,
	_callAjax = _genCallAjax(addr+"bshops"),
	_searchAjax = _genCallAjax(addr+"search"),
	_smsAjax = _genCallAjax("http://develop.zsgd.com:7071/sms/");

var messagesLimit = 10;

var _wx = function(kv) {
	// 用于微信验证
	// {
	//		openid: 'dhkjahkdhak',
	//		onAuth: function(d) {}
	// }

	_callAjax({
		cmd: "fetch",
		sql: "select id from users where open_id = '" + kv['openid'] + "'",
		len: 1
	}, function(d) {
		if (!d.success) return _toast.show(d.errMsg);
		kv['onAuth']($.extend(d.data, {
			openid: kv['openid']
		}));
	});
};

var _initSwiper = function(container, pagination) {
	// .swiper-container, .swiper-pagination
	$(container).swiper({
		pagination: pagination,
		autoplay: 2000
	});
	$.reinitSwiper(1);
};

var _scrollToLoad = function(loading, cb) {
	$(document).on('infinite', '.infinite-scroll-bottom', function() {
		$('.infinite-scroll-preloader').show();
		if (loading) return;

		loading = true;

		setTimeout(function() {
			loading = false;
			cb(function() {
				$.detachInfiniteScroll($('.infinite-scroll'));
				$('.infinite-scroll-preloader').html('<span class="infinite-scroll-tips">已全部加载</span>');
			});
			$.refreshScroller();
		}, 1000);
	});
}

var _uploadImg = function(f, key, to, cb) {
	var fd = new FormData();
	fd.append(key, f);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function(e) {
		layer.closeAll();
		layer.msg('添加成功');
		var ret = e.target.responseText;
		// 上传成功回调函数
		cb(ret);
	}, false);
	xhr.addEventListener("abort", function() {
		layer.closeAll();
		layer.msg('传输中断');
	}, false);
	xhr.addEventListener("error", function() {
		layer.closeAll();
		layer.msg('传输错误');
	}, false);
	xhr.open("post", to);
	xhr.send(fd);
}

var _table = function(el, columns) {
	return $(el).DataTable({
    columns: columns,
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
};

var _set_cookie = function(k, v , expires) {
	if(undefined != expires) {
		$.cookie(k, v, {"expires": expires});
	} else {
		$.cookie(k, v);
	}
};

var _get_cookie = function(k) {
	return $.cookie(k);
};

var _del_cookie = function(k) {
	$.cookie(k, '', { expires: -1 });
}
