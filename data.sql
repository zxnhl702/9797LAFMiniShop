/* 微信用户信息
insert into weixins(name, app_id, app_secret) values('zsgd93', 'wxee6284b0c702c21e', '86707f6633745e51c4639f11c82abed2');

insert into users(open_id, nick_name, pic, weixin_id, phone, default_location_id) values ("wahahah", "你妈妈", "http://wx.qlogo.cn/mmopen/kBCyznggU09deYULM9uHb09iaCzn0Pco888HIDW3NTtJF1ps80VDdJSfKYB0Pj3yn9E3wbRqQayRzw1lE0ztnAQ/0", 1, '13357214547', 1);
*/

/* 头图测试数据
insert into goodsRecommended(name, img, good_id, tablename) values('ipad1 mini 2', 'pic/banner/1.jpg', 1, 'digital');
insert into goodsRecommended(name, img, good_id, tablename) values('紫砂电炖锅', 'pic/banner/2.jpg', 1, 'household');
insert into goodsRecommended(name, img, good_id, tablename) values('真皮平底老人鞋', 'pic/banner/3.jpg', 1, 'clothing');
insert into goodsRecommended(name, img, good_id, tablename) values('彩妆盘', 'pic/banner/4.jpg', 1, 'cosmetics');
*/

/* 广告位
insert into broadcasting(name, img, position) values('手机专区', 'pic/broadcasting/1.jpeg', 1);
insert into broadcasting(name, img, position) values('闪购', 'pic/broadcasting/2.jpeg', 2);
insert into broadcasting(name, img, position) values('团购', 'pic/broadcasting/3.jpeg', 3);
*/

/* 种类
insert into categories(name, table_name, img, specific) values('手机数码', 'digital', 'pic/category/1.gif', 'colors:颜色');
insert into categories(name, table_name, img, specific) values('家用电器', 'household', 'pic/category/2.gif', 'colors:颜色');
insert into categories(name, table_name, img, specific) values('鞋类', 'clothing', 'pic/category/3.gif', 'sizes:尺码|colors:颜色');
insert into categories(name, table_name, img, specific) values('美妆护肤', 'cosmetics', 'pic/category/4.gif', 'colors:颜色');
*/

/* ipad商品
insert into tags(if_mail, if_real, if_7_days, if_in_24, if_brand) values("0:3.5", 1, 1, 1, 1); -- 商品正品、快递信息等
insert into tags(if_mail, if_real, if_7_days, if_in_24, if_brand) values("1", 1, 1, 1, 1);
insert into tags(if_mail, if_real, if_7_days, if_in_24, if_brand) values("0:4.5", 1, 1, 1, 1);
insert into tags(if_mail, if_real, if_7_days, if_in_24, if_brand) values("1", 1, 1, 1, 1);

insert into editions(description, price) values('双核 iPad Air WIFI 16GB', 2588.0); -- 商品版本
insert into editions(description, price) values('双核 iPad Air WIFI 32GB', 2988.0);
insert into editions(description, price) values('ipad air 2 WLAN 16GB', 3268.0);
insert into editions(description, price) values('iPad Air 2 WLAN 64GB', 3958.0);
insert into editions(description, price) values('iPad Air 2 WLAN+Cellular 64GB', 5038.0);

insert into combos(description, addon) values('官方标配', 50); -- 套餐
insert into combos(description, addon) values('套餐一', 68);
insert into combos(description, addon) values('套餐二', 77);
insert into combos(description, addon) values('套餐三', 98);
insert into combos(description, addon) values('套餐四', 138);

insert into digital(name, price, editions, combos, colors, link_tags, imgs, if_valid) values ('ipad mini 2', 3268.0, '1|2|3|4|5', '1|2|3|4|5', '白色|银色|黑色', '1', '/pic/good/3.jpg|/pic/good/4.jpg', 1);
*/

/* 鞋子商品
insert into shoe(name, price, editions, combos, sizes, colors, link_tags, imgs, if_valid) values ('菲丫头妈妈鞋单鞋真皮软底女大码休闲平底老人鞋防滑中老年皮鞋秋', 99.0, '', '', '35|36|37|38|39|40|41|42', '黑色|黄色|深棕|枣红', '1', '/pic/good/1.jpg|/pic/good/2.jpg', 1);
*/

/* 炖锅商品
insert into editions(description, price) values('1.0L两人用', 45.0); -- 商品版本
insert into editions(description, price) values('0.5L一人用', 39.0);

insert into household(name, price, editions, combos, colors, link_tags, imgs, if_valid) values ('【天天特价】益美 YM-E35B紫砂电炖锅插电砂锅陶瓷煮粥煲汤锅白瓷', 39.0, '6|7', '', '白色|黑色', '1', '/pic/good/5.jpg|/pic/good/6.jpg', 1);
*/

/* 彩妆盘
insert into editions(description, price) values('39色彩妆盘', 15.6); -- 商品版本
insert into editions(description, price) values('39色彩妆盘+单支刷', 18.6);
insert into editions(description, price) values('39色彩妆盘+5支刷', 20.6);
insert into editions(description, price) values('39色彩妆盘+7支刷', 25.6);

insert into cosmetics(name, price, editions, combos, colors, link_tags, imgs, if_valid) values ('39色初学者彩妆套盒全套组合粉饼腮红眼影化妆粉盒彩妆盘正品包邮', 15.6, '8|9|10|11', '', '', '1', '/pic/good/7.jpg|/pic/good/8.jpg|/pic/good/9.jpg', 1);
*/

/* 订单
insert into orders(order_no, open_id, if_success, total, credits_pay, coupon_pay, mail_pay, location) values('dhkahkdashk', 'wahahah', 1, 7090.5, 0, 33, 3.5, "浙江省舟山市定海区昌国路135号301室");
insert into ordersDetail(order_no, good_id, table_name, specifics, amount, price, edition, combo, name, img) values ('dhkahkdashk', 1, 'digital', '颜色:黑色', 1, 3560, '双核 iPad Air WIFI 16GB', '官方标配', 'ipad mini 2', 'pic/good/3.jpg');
insert into ordersDetail(order_no, good_id, table_name, specifics, amount, price, edition, combo, name, img) values ('dhkahkdashk', 1, 'digital', '颜色:白色', 1, 3560, '双核 iPad Air WIFI 16GB', '官方标配', 'ipad mini 2', 'pic/good/3.jpg');
*/

/* 评论
insert into comments(open_id, content, order_id) values('wahahah', '用得真是爽啊！！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '爽歪歪了！！！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '真是便宜又好用啊！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '啦啦啦啦！！！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '啦啦啦啦！！！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '啦啦啦啦！！！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '汪汪汪汪汪！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '汪汪汪汪汪！', 'dhkahkdashk');
insert into comments(open_id, content, order_id) values('wahahah', '汪汪汪汪汪！', 'dhkahkdashk');
*/

/* 住址
insert into locations(open_id, location) values('wahahah', '浙江省舟山市定海区昌国路135号301室');
insert into locations(open_id, location) values('wahahah', '浙江省舟山市定海区育苗路17号2单元101');
*/

/* 优惠券
insert into coupons(open_id, price, date_from, date_to) values('wahahah', 10.0, '2016-02-16', '2016-02-27');
insert into coupons(open_id, price, date_from, date_to) values('wahahah', 10.0, '2016-02-16', '2016-02-29');
insert into coupons(open_id, price, date_from, date_to) values('wahahah', 10.0, '2016-02-16', '2016-03-27');
insert into coupons(open_id, price, date_from, date_to) values('wahahah', 15.0, '2016-02-16', '2016-03-29');
*/

/* 积分
insert into credits(open_id, credits) values('wahahah', 100);
insert into credits(open_id, credits) values('wahahah', 102); -- fail cos CHECK
insert into credits(open_id, credits, event) values('wahahah', 100, '元宵赠送');
insert into credits(open_id, credits, event) values('wahahah', 300, '购物返还');
*/

/* 消息
insert into messages(open_id, title, message) values("wahahah", "你好，这是测试信息", "在事件处理器中经常需要调用 event.preventDefault() 或 event.stopPropagation()。尽管我们在方法内可以轻松做到，不过让方法是纯粹的数据逻辑而不处理 DOM 事件细节会更好。 为了解决这个问题，Vue.js 为 v-on 提供两个 事件修饰符：.prevent 与 .stop。你是否还记得修饰符是点号打头的指令后缀？");
insert into messages(open_id, title, message, type) values("wahahah", "你好，这是测试信息", "在事件处理器中经常需要调用 event.preventDefault() 或 event.stopPropagation()。尽管我们在方法内可以轻松做到，不过让方法是纯粹的数据逻辑而不处理 DOM 事件细节会更好。 为了解决这个问题，Vue.js 为 v-on 提供两个 事件修饰符：.prevent 与 .stop。你是否还记得修饰符是点号打头的指令后缀？", "info");
*/
