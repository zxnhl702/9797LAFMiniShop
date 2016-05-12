$(function() {
	//倒数五秒返回首页
	var time = 5;
	var backIndex = setInterval(function() {
		time--;
		$('.result-back-btn').text('(' + time + ')' + '返回首页');
		if (time == 0) {
			location.href = "index.html";
		}
	}, 1000)
})