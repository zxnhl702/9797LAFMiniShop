(function() {
	var vm = new Vue({
		el: "#product-sort",
		data: {
			categories: [],
			categories_cnt: {},
			current_index: -1
		},
		watch: {
			categories: function(n, _o) {
				var self = this,
					sqls = [];
				n.forEach(function(r) {
					sqls.push({
						key: r.table_name,
						sql: "select count(*) as cnt from "+r.table_name+" where if_valid > 0"
					});
				});
				_callAjax({
					cmd: "multiFetch",
					multi: JSON.stringify(sqls)
				}, function(d) {
					if (!d.success || !d.data) return;
					self.categories_cnt = d.data;
				});
			}
		},
		methods: {
			newCategory: function() {
				layer.msg("暂未开放");
			},
			updateCategory: function() {
				var self = this,
					cur = this.categories[this.current_index],
					f = $("#sem-file").get(0).files[0];
				if (!!f) {
					_uploadImg(f, "category", "/upload", function(t) {
						var d = JSON.parse(t);
						layer.msg(d.errMsg);
						if (d.success) {
							_callAjax({
								cmd: "exec",
								sql: "update categories set img = '"+d.data+"' where id = "+cur.id
							}, function(d) {
								if (!d.success) layer.msg("无法更新种类图片");
							});
						}
					});
				}

				_callAjax({
					cmd: "exec",
					sql: "update categories set if_recommended = "+(!!cur.if_recommended?1:0)+" where id = "+cur.id
				}, function(d) {
					if (!d.success) layer.msg("无法更改种类属性");
				});

				$("#sort-edit-modal").modal("hide");
			}
		}
	});

	$(function() {
		_callAjax({
			cmd: "fetch",
			sql: "select id, name, table_name, if_recommended from categories"
		}, function(d) {
			if (!d.success || !d.data) return;
			var ret = [];
			d.data.forEach(function(r) {
				r.if_recommended = parseInt(r.if_recommended);
				ret.push(r);
			});
			vm.categories = ret;
		});

		$("#sem-file").change(function() {
			var self = this;
			var reader = new FileReader(),
				file = this.files[0];
			reader.onload = function(e) {
				var im = new Image();
				im.src = e.target.result;
				im.onload = function() {
					if (im.width && im.width != 300 || im.height && im.height != 130) {
						return layer.msg("非法的图片尺寸");
					}
				}
			};
			reader.readAsDataURL(file);
		});
	});
}());
