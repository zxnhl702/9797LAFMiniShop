create table if not exists clicks (
	ip text,
	logtime datetime default (datetime('now', 'localtime'))
);

-- 滚动头图
create table if not exists goodsRecommended (
	id integer primary key,
	name text,
	img text,
	good_id integer,
	tablename text,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer default 1
);
create view if not exists v_goodsRecommended as select id, name, img, good_id, tablename, strftime('%Y-%m-%d %H:%M:%S', logtime) as logtime, if_valid from goodsRecommended;

-- 活动位
create table if not exists broadcasting (
	id integer primary key,
	name text,
	img text,
	position integer default 1,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer default 1,
	url text default '#'
);
--alter table broadcasting add column url text default "#";

-- 品种
create table if not exists categories (
	id integer primary key,
	name text unique,
	table_name text,
	specific text,
	img text,
	if_recommended integer default 0,
	logtime datetime default (datetime('now', 'localtime'))
);

create table if not exists shoe (
	id integer primary key,
	name text,
	editions text,
	combos text,
	price real,
	discount real default 1.0,
	sizes text,
	colors text,
	link_tags integer,
	imgs text,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer,
	detail_link text default '',
	broadcasting_id integer default -1,
	left integer default 0,
	check(discount <= 1.0)
);

create view if not exists v_shoe as select s.id, name, editions, combos, price, discount, sizes, colors, link_tags, if_mail, if_real, if_7_days, if_in_24, if_brand, imgs, strftime('%Y-%m-%d %H:%M:%S', s.logtime) as logtime, if_valid, detail_link, broadcasting_id, left from shoe s, tags t where s.link_tags = t.id;

create table if not exists digital (
	id integer primary key,
	name text,
	price real,
	discount real default 1.0,
	editions text,
	combos text,
	colors text,
	link_tags integer,
	imgs text,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer,
	detail_link text default '',
	broadcasting_id integer default -1,
	left integer default 0,
	check(discount <= 1.0)
);

create view if not exists v_digital as select d.id, name, editions, combos, price, discount, colors, link_tags, if_mail, if_real, if_7_days, if_in_24, if_brand, imgs, strftime('%Y-%m-%d %H:%M:%S', d.logtime) as logtime, if_valid, detail_link, broadcasting_id, left from digital d, tags t where d.link_tags = t.id;

create table if not exists household (
	id integer primary key,
	name text,
	price real,
	discount real default 1.0,
	editions text,
	combos text,
	colors text,
	link_tags integer,
	imgs text,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer,
	detail_link text default '',
	broadcasting_id integer default -1,
	left integer default 0,
	check(discount <= 1.0)
);

create view if not exists v_household as select h.id, name, editions, combos, price, discount, colors, link_tags, if_mail, if_real, if_7_days, if_in_24, if_brand, imgs, strftime('%Y-%m-%d %H:%M:%S', h.logtime) as logtime, if_valid, detail_link, broadcasting_id, left from household h, tags t where h.link_tags = t.id;

create table if not exists cosmetics (
	id integer primary key,
	name text,
	price real,
	discount real default 1.0,
	editions text,
	combos text,
	colors text,
	link_tags integer,
	imgs text,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer,
	detail_link text default '', -- 图文详情页
	broadcasting_id integer default -1,
	left integer default 0,
	check(discount <= 1.0)
);

create view if not exists v_cosmetics as select c.id, name, editions, combos, price, discount, colors, link_tags, if_mail, if_real, if_7_days, if_in_24, if_brand, imgs, strftime('%Y-%m-%d %H:%M:%S', c.logtime) as logtime, if_valid, detail_link, broadcasting_id, left from cosmetics c, tags t where c.link_tags = t.id;

/*
alter table clothing add column broadcasting_id integer default -1;
alter table digital add column broadcasting_id integer default -1;
alter table household add column broadcasting_id integer default -1;
alter table cosmetics add column broadcasting_id integer default -1;
alter table clothing add column left integer default 0;
alter table digital add column left integer default 0;
alter table household add column left integer default 0;
alter table cosmetics add column left integer default 0;
*/

create table if not exists editions (
	id integer primary key,
	description text,
	price real
);

create table if not exists combos (
	id integer primary key,
	description text,
	addon real
);

create table if not exists tags (
	id integer primary key,
	if_mail text default 1,
	if_real integer default 0,
	if_7_days integer default 0,
	if_in_24 integer default 0,
	if_brand integer default 0,
	logtime datetime default (datetime('now', 'localtgtime'))
);

create table if not exists orders (
	id integer primary key,
	order_no text,
	open_id text,
	if_success integer default 0, -- -1 无效；0 待付款；1 物流中；2 待评价; 3 交易完成
	total real,
	credits_pay real,
	coupon_pay real,
	mail_pay real,
	remarks text default "",
	location text,
	logtime datetime default (datetime('now', 'localtime'))
	-- phone text default ""
);
-- alter table orders add column phone text default "";

create view if not exists v_orders as
	select o.id, order_no, nick_name, phone, if_success, total, credits_pay, coupon_pay, mail_pay, remarks, location,
	strftime('%Y-%m-%d %H:%M:%S', o.logtime) as log_time from orders o, users u where o.if_success >= 0 and o.open_id = u.open_id
		order by o.id desc limit 5000;

create table if not exists mini_orders (
	id integer primary key,
	if_success integer default 0, -- -1 失效; 0 未发货; 1 已发货
	open_id text,
	nick_name text,
	car_no text,
	phone text,
	good_id integer,
	logtime datetime default (datetime('now', 'localtime'))
);
-- alter table mini_orders add column open_id text;

create view if not exists v_mini_orders as
	select m.id, nick_name, if_success, good_id, c.name, c.price as total, phone, car_no, strftime('%Y-%m-%d %H:%M:%S', m.logtime) as logtime
	from mini_orders m, cosmetics c
	where m.good_id = c.id and if_success > -1;

create table if not exists ordersDetail (
	id integer primary key,
	order_no text,
	table_name text,
	good_id integer,
	name text,
	edition text,
	combo text,
	specifics text,
	amount integer,
	img text,
	price real -- 单价
);

create table if not exists carts (
	id integer primary key,
	open_id text,
	good_id integer,
	name text,
	img text,
	table_name text,
	edition text,
	combo text,
	specifics text,
	price real,
	num,
	if_mail text,
	logtime datetime default (datetime('now', 'localtime')),
	unique(open_id, table_name, good_id, specifics)
);

create table if not exists favorites (
	id integer primary key,
	open_id text,
	table_name text,
	good_id integer,
	img text,
	name text,
	price real,
	unique(open_id, table_name, good_id)
);

create table if not exists users (
	id integer primary key,
	open_id text unique,
	nick_name text,
	pic text,
	sex integer default 0,
	weixin_id integer,
	phone text,
	default_location_id integer,
	logtime datetime default (datetime('now', 'localtime'))
);
create view if not exists v_users as
	select u.id, u.open_id, u.sex, u.pic, u.nick_name, u.phone, strftime('%Y-%m-%d %H:%M:%S', u.logtime) as log_time,
	sum(o.total) as total, count(o.id) as cnt from users u, weixins w
	left join orders o on (o.open_id = u.open_id and o.if_success = 3)
	group by u.open_id;

create table if not exists locations (
	id integer primary key,
	open_id text,
	location text,
	unique(open_id, location)
);

create table if not exists weixins (
	id integer primary key,
	name text,
	app_id text,
	app_secret text,
	access_token text default '',
	jsapi_tikcet text default ''
);

create table if not exists comments (
	id integer primary key,
	open_id text,
	content text,
	order_id integer,
	logtime datetime default (datetime('now', 'localtime')),
	if_valid integer default 1
);
-- alter table comments add column if_valid integer default 1;
create view if not exists v_comments as select c.id, u.nick_name, o.table_name, o.good_id, c.content, strftime('%Y-%m-%d %H:%M:%S', c.logtime) as log_time from comments c, ordersDetail o, users u where c.if_valid = 1 and c.order_id = o.order_no and c.open_id = u.open_id group by c.id order by c.logtime desc limit 5000;

create table if not exists coupons (
	id integer primary key,
	open_id text,
	price real,
	date_from datetime,
	date_to datetime
);
create view if not exists v_coupons as select id, open_id, price, strftime('%Y-%m-%d', date_from) as date_from,
	strftime('%Y-%m-%d', date_to) as date_to from coupons where date_to > datetime('now', "localtime");

create table if not exists credits (
	id integer primary key,
	open_id text,
	credits integer,
	logtime datetime default (datetime('now', 'localtime')),
	event text default '',
	check(credits%10 = 0)
);

create table if not exists messages (
	id integer primary key,
	open_id text,
	title text,
	message text,
	type text default 'activity',
	logtime datetime default (datetime('now', 'localtime'))
);
