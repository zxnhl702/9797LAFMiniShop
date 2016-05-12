(function() {
  $(function() {
    var vm = new Vue({
      el: "#product-list-vue",
      data: {
        row: null,
        categories: [],
        broadcasting: [],
        table_name: "",
        sizes: _range(1, 100),
        // good
        g: {
          id: -1,
          name: "",
          cetegory_id: -1,
          price: 0,
          discount: 0,
          // if_recommended: "0",
          broadcasting_id: -1,
          if_mail: "1",
          imgs: "",
          if_valid: 0,
          editions: "",
          combos: "",
          link_tags: 0,
        },
        // good_recommended
        gr: {
          id: -1,
          name: "",
          img: "",
          good_id: -1,
          tablename: "",
          logtime: "",
          if_valid: 0
        },
        // 数据结构转换
        altered: {
          if_recommended: false,
          if_mail: true,
          mail_cost: 0,
          tags: [],
          sizes: [],
          editions: [],
          combos: [],
          colors: [],
          discount: 100,
          imgs: []
        },
        // 显示可选参数
        show_vars: {
          editions: false,
          combos: false,
          size: false,
          color: false
        },
        // 是否新增
        if_new: false,
        if_ready: {
          goodsRecommended: false,
          tags: false,
          good: false
        }
      },
      watch: {
        "if_ready.good": function(n) {
          if (n) {
            this.newTags();
            this.newGoodsRecommended();
          }
        },
        "if_ready.goodsRecommended": "ifUpdateGoodInfo",
        "if_ready.tags": "ifUpdateGoodInfo",
        "g.category_id": function(n) {
          var self = this;
          this.categories.forEach(function(c) {
            if (c.id == n) {
              self.show_vars.size = c.specific.indexOf("size") > -1;
              self.show_vars.color = c.specific.indexOf("color") > -1;
              self.table_name = c.table_name;
            }
          });
        },
        g: function(n) {
          // 包邮设置
          this.altered.if_mail = !!parseInt(n.if_mail);
          this.altered.mail_cost = this.altered.if_mail?0:parseFloat(n.if_mail.split(":")[1]);
          // 标签
          var ts = [];
          ["if_real", "if_7_days", "if_in_24", "if_brand"].forEach(function(k) {
            if (parseInt(n[k])) {
              ts.push(k);
            }
          });
          this.altered.tags = ts;
          $('.service').select2();
          // 显示可选的参数
          this.show_vars = $.extend(this.show_vars, {
            editions: false,
            combos: false,
          });
          // 颜色
          if (this.show_vars.color && !!n.colors) {
            this.altered.colors = n.colors.split("|");
          }
          $('.color').select2();
          if (this.show_vars.size && !!n.sizes) {
            this.altered.sizes = n.sizes.split("|");
          }
          $(".chima").select2();
          // 折扣
          this.altered.discount = parseFloat(n.discount) * 100;
          // 图片
          this.altered.imgs = !!n.imgs?n.imgs.split("|"):[];
          // 版本与套餐
          this.getAttrs(n.editions, "editions");
          this.getAttrs(n.combos, "combos");
        },
        gr: function(n) {
          this.altered.if_recommended = parseInt(n.id)>0?"1":"0";
        },
        categories: function(n) {
          var multi = [], self = this;
          n.forEach(function(r) {
            multi.push({
              key: r.table_name,
              sql: "select g.id as g_id, g.name, g.price, c.name as category_name, g.if_valid, gr.id, g.left, b.name as bname from "+r.table_name+" g left join categories c on c.table_name = '"+r.table_name+"' left join goodsRecommended gr on gr.good_id = g.id and gr.tablename = '"+r.table_name+"' left join broadcasting b on b.id = g.broadcasting_id group by g.id;"
            });
          });
          _callAjax({
            cmd: "multiFetch",
            multi: JSON.stringify(multi)
          }, function(d) {
            if (d.success && d.data) {
              Object.keys(d.data).forEach(function(k) {
                if (!d.data[k] || d.data[k].length == 0) return;
                d.data[k].forEach(function(r) {
                  table.row.add($.extend(r, {
                    table_name: k
                  }));
                });
              });
              table.draw();
              bindEvents();
            }
          });
        }
      },
      methods: {
        getAttrs: function(n, attr) {
          if (!n) {
            this.altered[attr] = [];
            return;
          }
          var self = this;
          _callAjax({
            cmd: "fetch",
            sql: "select * from "+attr+" where id in ("+n.split("|").join(",")+")"
          }, function(d) {
            if (!d.success || !d.data) return;
            var ret = [];
            d.data.forEach(function(e) {
              e.compose = e.description + "|" + e[attr=="editions"?"price":"addon"];
              ret.push(e);
            })
            self.altered[attr] = ret;
          });
        },
        newGood: function() {
          this.if_new = true;
          this.g = {
            id: -1,
            name: "",
            cetegory_id: -1,
            price: 0,
            discount: 1,
            if_recommended: "0",
            broadcasting_id: -1,
            if_mail: "1",
            imgs: "",
            if_valid: 0,
            editions: "",
            combos: "",
            link_tags: 0,
          };
          this.gr = {
            id: -1,
            name: "",
            img: "",
            good_id: -1,
            tablename: "",
            logtime: "",
            if_valid: 0
          };
          this.show_vars = {
            editions: false,
            combos: false,
            size: false,
            color: false
          };
          this.if_ready = {
            goodsRecommended: false,
            tags: false,
            good: false
          };
          this.altered.sizes = [];
          this.altered.colors = [];
        },
        newAttr: function(evt, tag) {
          var compose = $(evt.target).val(),
            attrs = compose.split("|")
            self = this;
          if (attrs.length != 2) return layer.msg("非法的格式");
          var description = _trim(attrs[0]),
            price = parseFloat(_trim(attrs[1]));
          if (description.length == 0) return layer.msg("描述不能为空");
          if (isNaN(price)) return layer.msg("价格不能为空");
          _callAjax({
            cmd: "exec",
            sql: "insert into "+tag+"(description, "+(tag=="editions"?"price":"addon")+") values('"+attrs[0]+"', "+attrs[1]+")"
          }, function(d) {
            if (d.success) {
              self.altered[tag].push({
                id: d.data,
                compose: compose
              });
              $(evt.target).val("");
            }
          });
        },
        delIm: function(id) {
          this.altered.imgs = _del_ele(this.altered.imgs, id);
        },
        delGrIm: function() {
          this.gr.img = "";
        },
        delEdition: function(index, edition) {
          this.altered.editions = _del_ele(this.altered.editions, index);
        },
        delCombo: function(index, combo) {
          this.altered.combos = _del_ele(this.altered.combos, index);
        },
        checkEditionsAndCombos: function(es, if_editions) {
          var t = if_editions?"版本":"套餐";
          for(var i = 0; i < es.length; i++) {
            var att = es[i].compose.split("|");
            if (att.length != 2) {
              return {
                success: false,
                errMsg: t+"格式错误"
              }
            } else if (isNaN(parseFloat(att[1]))) {
              return {
                success: fasle,
                errMsg: t+"价格有误"
              };
            } else if (att[0].length == 0) {
              return {
                success: false,
                errMsg: t+"描述有误"
              };
            }
          }
          return {
            success: true,
            errMsg: ""
          };
        },
        checkAttrs: function() {
          // 版本、套餐
          var r = this.checkEditionsAndCombos(this.altered.editions, true);
          if (!r.success) {
            layer.msg(r.errMsg);
            return false;
          };
          r = this.checkEditionsAndCombos(this.altered.combos, false);
          if (!r.success) {
            layer.msg(r.errMsg)
            return false;
          }
          // 名称
          if (!this.g.name.length) {
            layer.msg("产品名有误");
            return false;
          }
          // 库存
          if (!this.g.left) this.g.left = 0;
          // 价格
          if (isNaN(parseFloat(this.g.price))) {
            layer.msg("价格有误");
            return false;
          }
          // 包邮 注意if_mail是bool型，需要进行转换
          if (!this.altered.if_mail && isNaN(parseFloat(this.altered.mail_cost))) {
            layer.msg("包邮信息有误");
            return false;
          }
          // 推荐
          if (parseInt(this.altered.if_recommended)) {
            if (!this.gr.img) {
              layer.msg("需要有推荐头图");
              return false;
            }
            if (!_trim(this.gr.name)) {
              layer.msg("需要推荐名称");
              return false;
            }
          }
          // 大图
          if (this.altered.imgs.length == 0) {
            layer.msg("需要至少一张大图");
            return false;
          }
          if (this.if_new) {
            this.newGoodInfo();
          } else {
            this.updateGoodInfo();
          }
        },
        delGood: function() {
          _callAjax({
            cmd: "exec",
            sql: "delete from "+this.table_name+" where id ="+this.g.id
          }, function(d) {
            if (!d.success) layer.msg("无法删除临时新建货品");
          })
        },
        newTags: function() {
          var self = this,
            tags_sql = "insert into tags(if_mail, if_real, if_7_days, if_in_24, if_brand) values ('"+(self.altered.if_mail?"1":("0:"+self.altered.mail_cost))+"', ";
          self.altered.tags = $("#good_tags").val();
          ["if_real", "if_7_days", "if_in_24", "if_brand"].forEach(function(k) {
            if (!!self.altered.tags && self.altered.tags.indexOf(k) >= 0) {
              tags_sql += "1,"
            } else {
              tags_sql += "0,"
            }
          });
          _tell(tags_sql);
          _callAjax({
            cmd: "exec",
            sql: tags_sql.slice(0, tags_sql.length-1)+")"
          }, function(d) {
            if (!d.success || !d.data) {
              layer.msg("创建标签失败");
              self.delGood();
            } else {
              self.g.link_tags = d.data;
              self.if_ready.tags = true;
            }
          });
        },
        newGoodsRecommended: function() {
          var self = this;
          if (parseInt(this.altered.if_recommended)) {
            if (!_trim(this.gr.name)) return layer.msg("推荐信息名称不能为空");
            if (!this.gr.img) return layer.msg("推荐信息图片不能为空");
            _callAjax({
              cmd: "exec",
              sql: "insert into goodsRecommended(name, img, good_id, tablename) values ("
                + "'"+_trim(self.gr.name)+"'"
                + ", "
                + "'"+self.gr.img+"'"
                + ", "
                + self.g.id
                + ", "
                + "'"+self.table_name+"'"
                + ")"
            }, function(d) {
              if (!d.success || !d.data) {
                layer.msg("创建推荐失败");
                self.delGood();
              } else {
                self.gr.id = d.data;
                self.if_ready.goodsRecommended = true;
              }
            });
          } else {
            self.if_ready.goodsRecommended = true;
          }
        },
        newGoodInfo: function() {
          var self = this;
          _callAjax({
            cmd: "exec",
            sql: "insert into "+self.table_name+"(left) values(0)"
          }, function(d) {
            if (!d.success || !d.data) return layer.msg("创建临时物品失败！");
            self.g.id = d.data;
            self.if_ready.good = true;
          });
        },
        ifUpdateGoodInfo: function() {
          if (!this.if_ready.goodsRecommended || !this.if_ready.tags) return;
          this.updateGoodInfo();
        },
        updateGoodInfo: function() {
          var self = this,
            edition_ids = [],
            edition_sqls = [],
            combo_ids = []
            combo_sqls = [];
          this.altered.editions.forEach(function(e) {
            edition_ids.push(e.id);
            var att = e.compose.split("|");
            edition_sqls.push("update editions set description = '"+att[0]+"', price = "+att[1]+" where id = "+e.id);
          });
          this.altered.combos.forEach(function(c) {
            combo_ids.push(c.id);
            var att = c.compose.split("|");
            combo_sqls.push("update combos set description = '"+att[0]+"', addon = "+att[1]+" where id = "+c.id);
          });

          // tags
          var if_mail = self.altered.if_mail?"1":("0:"+self.altered.mail_cost),
            tags_sql = "update tags set if_mail = '"+if_mail+"', ";
          self.altered.tags = $("#good_tags").val();
          ["if_real", "if_7_days", "if_in_24", "if_brand"].forEach(function(k) {
            if (!!self.altered.tags && self.altered.tags.indexOf(k) >= 0) {
              tags_sql += " "+k+" = 1,"
            } else {
              tags_sql += " "+k+" = 0,"
            }
          });
          tags_sql = tags_sql.slice(0, tags_sql.length-1)+" where id = "+this.g.link_tags;

          // 推荐
          var recommendedSql = "", gr_name = _trim(this.gr.name);
          if (!this.gr.id) {
            if (parseInt(this.altered.if_recommended)) {
              recommendedSql = "insert into goodsRecommended(name, img, good_id, tablename) values("
                + "'"+gr_name+"', '"+this.gr.img+"', "+this.g.id+", '"+this.g.table_name+"')"
            }
          } else {
            recommendedSql = "update goodsRecommended set name = '"+gr_name+"', img = '"+this.gr.img+"', "
              +"if_valid = "+this.altered.if_recommended+" where id = "+this.gr.id;
          }

          _callAjax({
            cmd: "transaction",
            sqls: JSON.stringify([
              "update "+self.table_name+" set name = '"
                + self.g.name
                + "',  price = "
                + self.g.price
                + ", discount = "
                + parseFloat(self.altered.discount)/100
                + ", editions = '"
                + edition_ids.join("|")
                +"', combos = '"
                + combo_ids.join("|") +"', "
                + ($("#good_colors").val()?"colors = '"+$("#good_colors").val().join("|")+"', ":"")
                + ($("#good_sizes").val()?"size = '"+$("#good_sizes").val().join("|")+"', ":"")
                // + (self.show_vars.color?"colors = '"+$("#good_colors").val().join("|")+"', ":"")
                // + (self.show_vars.size?"size = '"+$("#good_sizes").val().join("|")+"', ":"")
                + " imgs = '"
                + self.altered.imgs.join("|")
                + "', if_valid = "
                + self.g.if_valid
                + ", broadcasting_id = "
                + self.g.broadcasting_id
                + ", left = "
                + self.g.left
                + ", link_tags = "
                + self.g.link_tags
                + " where id = "
                + self.g.id,
                tags_sql
            ].concat(edition_sqls).concat(combo_sqls).concat(recommendedSql))
          }, function(d) {
            if (d.success) {
              $("#product-modal").modal("hide");
              layer.msg("更新成功");
              var d = self.row.data();
              d.name = self.g.name;
              d.price = self.g.price;
              d.left = self.g.left;
              d.if_valid = self.g.if_valid;
              self.row.data(d).draw();
              bindEvents();
            } else {
              layer.msg("更新失败");
            }
          });
        }
      }
    });

    _callAjax({
      cmd: "fetch",
      sql: "select * from categories"
    }, function(d) {
      if (!d.success) return layer.msg(d.errMsg);
      vm.categories = d.data;
    });

    // 获取活动
    _callAjax({
      cmd: "fetch",
      sql: "select id, name from broadcasting where if_valid = 1"
    }, function(d) {
      if (d.success && d.data) {
        vm.broadcasting = d.data;
      }
    });

    // 初始化datatable
    var table = $("#product-table").DataTable({
      columns: [
        { data: 'g_id', visible: false },
        { data: 'table_name', visible: false },
        { data: 'name' },
        { data: 'price' },
				{ data: 'category_name' },
        { data: 'if_valid',
          render: function(data) {
            if (!!parseInt(data)) {
              return "<span class='label label-success'>已上架</span>";
            } else {
              return "<span class='label label-danger'>已下架</span>";
            }
          }
        },
				{
          data: 'gr_id' ,
          render: function(data) {
            if (!!parseInt(data)) {
              return "<i class='glyphicon glyphicon-ok text-success'></i>";
            } else {
              return "<i class='glyphicon glyphicon-remove text-red'></i>";
            }
          },
          visible: false
        },
        { data: 'left' },
        {
          data: "bname",
          render: function(data) {
            if (!!data) {
              return data;
            } else {
              return "<i class='glyphicon glyphicon-remove text-red'></i>";
            }
          },
          visible: false
        },
        {
          render: function(d) {
            return '<div class="btn-group"><button type="button" class="btn btn-info btn-sm product-edit" data-toggle="modal" data-target="#product-modal">编辑</button><button type="button" class="btn btn-warning btn-sm turn-valid">上架</button><button type="button" class="btn btn-danger btn-sm turn-invalid">下架</button></div>'
          }
        }
			],
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

    var bindEvents = function() {
      var _row = function(ele) {
        return table.row($(ele).parents().parents().parents('tr'));
      };

      $(".product-edit").click(function() {
        var r = _row(this),
          d = r.data();
        vm.row = r;
        // vm.initGood();
        vm.table_name = d.table_name;
        vm.if_new = false;
        _callAjax({
          cmd: "multiFetch",
          multi: JSON.stringify([
            {
              key: "good_info",
              sql: "select * from v_"+d.table_name+" where id = "+d.g_id
            },
            {
              key: "good_recommended",
              sql: "select * from v_goodsRecommended where good_id = "+d.g_id+" and tablename = '"+d.table_name+"'"
            },
            {
              key: "category_id",
              sql: "select id from categories where table_name = '"+d.table_name+"'"
            }
          ])
        }, function(d) {
          if (!d.success || !d.data) return layer.msg("无法获取商品信息");
          vm.g = $.extend({
            name: "",
            category_id: -1,
            price: 0,
            discount: 0,
            broadcasting_id: -1,
            if_mail: "1",
            imgs: "",
            if_valid: 0,
            left: 0,
            editions: "",
            combos: ""
          }, d.data.good_info[0], {
            category_id: d.data.category_id[0].id
          });
          // if_size, if_color
          if (!d.data.good_recommended) {
            d.data.good_recommended = [{}];
          }
          vm.gr = $.extend({
            id: -1,
            name: "",
            img: "",
            good_id: -1,
            tablename: "",
            logtime: "",
            if_valid: 0
          }, d.data.good_recommended[0]);
        });
      });

      var turnGoodStatus = function(e, status) {
        var r = _row(e),
          d = r.data();
          t = status==1?"上":"下";
        layer.confirm("确定"+t+"架商品？", {
          btn: ["确定", "取消"]
        }, function(idx) {
          _callAjax({
            cmd: "exec",
            sql: "update "+d.table_name+" set if_valid = "+status+" where id ="+d.g_id
          }, function(data) {
            if (data.success) {
              d.if_valid = status;
              r.data(d);
              bindEvents();
              layer.msg(t+"架成功");
            } else {
              layer.msg("无法"+t+"架");
            }
          });
          layer.close(idx);
        });
      };
      $(".turn-valid").click(function() {
        turnGoodStatus(this, 1);
      })
      $(".turn-invalid").click(function () {
        turnGoodStatus(this, 0);
      });
    };

    // 添加大图
    $("#add_good_img").click(function(evt) {
      if (vm.altered.imgs.length >= 1) {
        evt.preventDefault();
        return layer.msg("图片不能超过1张");
      }
    });
    $("#add_good_img").change(function() {
      var f = $(this).get(0).files[0];
      if (!f) return;
      layer.confirm("是否上传图片？", {
        btn: ["确定", "取消"]
      }, function(id) {
        _uploadImg(f, "good", "/upload", function(t) {
          var d = JSON.parse(t);
          vm.altered.imgs.push(d.data);
        });
      });
    });

    // 添加头图
    $("#pm-img-file").change(function() {
      var f = $(this).get(0).files[0];
      if (!f) return;
      layer.confirm("是否上传头图？", {
        btn: ["确定", "取消"]
      }, function(id) {
        _uploadImg(f, "banner", "/upload", function(t) {
          var d = JSON.parse(t);
          vm.gr.img = d.data;
        });
      });
    });
  });
}());
