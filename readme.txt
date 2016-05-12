_callAjax({
	cmd: "getGoods"
}, function(d) {
	/*
	 * success: true,
	 * errMsg: "获取商品成功",
	 * data: [
	 *	{
	 *		id: 1,
	 *		name: "LV女鞋",
	 *		price: 10,
	 *		left: 10,
	 *		img: "/pic/good/c2755ff993f7ab0fffd920416e87c380.jpg"
	 *	}
	 * ]
	 *
	 * */
});

_callAjax({
	cmd: "order",
	open_id: "wahaha",
	nick_name: "哇哈哈",
	good_id: 1,
	phone: "13857207697",
	car_no: "浙L7697A"
}, function(d) {
	/*
	 * success: true,
	 * errMsg: "下单成功",
	 * data: null
	 *
	 * */
});

// done
_callAjax({
	cmd: "getOrders",
	open_id: "wahaha"
}, function(d) {
	/*
	 * success: true,
	 * errMsg: "获取订单成功",
	 * data: [
	 *	{
	 *		id: 1,
	 *		good_name: "LV女鞋",
	 *		price: 10,
	 *		log_time: "2016-04-15 16:47:54"
	 *	}
	 *	]
	 * */
});
