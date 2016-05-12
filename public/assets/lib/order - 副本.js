(function() {
  $(function() {
    var vm = new Vue({
      el: "#vm_orders",
      data: {
        orders: [],
        detail: {
          order_no: "",
          if_success: -1,
          nick_name: "",
          log_time: "",
          phone: "",
          location: "",
          remarks: ""
        },
        details: [],
        buffer: {
          remarks: "",
          total: ""
        }
      },
      watch: {
        "detail.order_no": function(n) {
          var self = this;
          _callAjax({
            cmd: "fetch",
            sql: "select * from ordersDetail where order_no = '"+n+"'"
          }, function(d) {
            if (d.success && d.data) {
              self.details = d.data;
            }
          });
        },
        orders: function(n) {
          n.forEach(function(r) {
            r.operator = "",
            table.row.add(r);
          });
          table.draw();
          bindEvents();
        }
      },
      methods: {
        updateRemark: function() {
          this.detail.remarks = this.buffer.remarks;
        },
        updateTotal: function() {
          this.detail.total = this.buffer.total;
        },
        updateOrderInfo: function() {
          var self = this;
          layer.confirm("确定修改内容？", {
            btn: ["确定", "取消"]
          }, function(idx) {
            layer.close(idx);
            _callAjax({
              cmd: "exec",
              sql: "update orders set remarks = '"+self.detail.remarks+"', total = "
                +self.detail.total+" where id = "+self.detail.id
            }, function(d) {
              if (d.success) {
                $("#order-modal").modal("hide");
              }
            });
          });
        }
      }
    });

    var bindEvents = function() {
      $(".show-detail").click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
          data = row.data();
        vm.detail = data;
        vm.buffer = {
          remarks: "",
          price: ""
        };
      });
      $(".cancel-order").click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
        data = row.data();
        layer.confirm("确定删除？", {
            btn: ["确定", "取消"]
          }, function(idx) {
          _callAjax({
            cmd: "exec",
            sql: "update orders set if_success = -1 where id = "+data.id
          }, function(d) {
            if (d.success) {
              layer.msg("删除成功");
              row.remove().draw();
              layer.close(idx);
            } else {
              layer.msg("删除失败");
            }
          });
        });
      });
      $(".delivery").click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
        data = row.data();
        layer.confirm("确定发货？", {
            btn: ["确定", "取消"]
          }, function(idx) {
          _callAjax({
            cmd: "exec",
            sql: "update orders set if_success = 2 where id = "+data.id
          }, function(d) {
            if (d.success) {
              layer.msg("发货成功");
              data.if_success = 2;
              row.data(data).draw();
              bindEvents();
              layer.close(idx);
            } else {
              layer.msg("发货失败");
            }
          });
        });
      });
    };

    var table = $("#order-table").DataTable({
      columns: [
        { data: 'id', visible: false },
        { data: 'order_no' },
        { data: "nick_name" },
        { data: 'phone', visible: false },
        { data: 'log_time' },
        { data: 'location' },
				{ data: 'total' },
        { data: 'if_success',
          render: function(d) {
            return {
              0: "<span class='label label-primary'>待付款</span>",
              1: "<span class='label label-warning'>物流中</span>",
              2: "<span class='label label-danger'>待评价</span>",
              3: "<span class='label label-success'>交易完成</span>"
            }[d];
          }
        },
        { data: "credits_pay", visible: false },
        { data: "coupon_pay", visible: false },
        { data: "mail_pay", visible: false },
        { data: "remarks", visible: false },
        { data: 'if_success',
          render: function(data) {
            return '<div class="btn-group"><button type="button" class="btn btn-info btn-sm show-detail" data-toggle="modal" data-target="#order-modal">查看</button><button type="button" class="btn btn-warning btn-sm cancel-order" '+(data!="0"?"disabled":"")+'>取消</button></div>';
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

    _callAjax({
      cmd: "fetch",
      sql: "select * from v_orders"
    }, function(d) {
      if (d.success && d.data) {
        vm.orders = d.data;
      }
    });
  });
}());
