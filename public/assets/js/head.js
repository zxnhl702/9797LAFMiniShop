$(function(){
	//sign out
	$('.sign-out').on('click',function(){
		layer.confirm('是否退出后台?',{
			btn:['确定','取消']
		},function(){
			layer.msg('成功退出');
			logout();
		})
	})
	
	var logout = function() {
		_del_cookie("nick");
		location.href = "http://" + window.location.hostname + ":11010/" + "login.html";
	}
	
	// laf admin
	$('#goToLAF').on('click', function() {
		location.href = "http://" + window.location.hostname + ":11010";
	})
	
	// 检查登陆信息
	if(undefined == _get_cookie("nick") && null == _get_cookie("nick")) {
		layer.msg("请重新登陆");
		location.href = "http://" + window.location.hostname + ":11010/" + "login.html";
	}
})