(function() {
  $(function() {
    var vm = new Vue({
      el: "#vm_orders",
      data: {
        orders: []
      },
      watch: {
        orders: function(n) {
          if (!n || n.length == 0) return;
          n.forEach(function(r) {
            table.row.add(r);
          });
          table.draw();
          bindEvents();
        }
      },
      methods: {

      }
    });

    var bindEvents = function() {
      $(".send-good").click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
          data = row.data();
        layer.confirm("确定已经交付商品了吗？", {
          btns: ["确定", "取消"]
        }, function(idx) {
          _callAjax({
            cmd: "exec",
            sql: "update mini_orders set if_success = 1 where id = "+data.id
          }, function(d) {
            if (d.success) {
              data.if_success = "1";
              row.data(data);
              bindEvents();
              layer.msg("交易完成");
            } else {
              layer.msg("交易失败");
            }
          });
        });
      });

      $(".cancel-order").click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
          data = row.data();
        layer.confirm("确定终止该交易？", {
          btns: ["确定", "取消"]
        }, function(idx) {
          _callAjax({
            cmd: "transaction",
            sqls: JSON.stringify([
              "update mini_orders set if_success = -1 where id = "+data.id,
              "update cosmetics set left = (select left from cosmetics where id = "+data.good_id+")+1 where id = "+data.good_id
            ])
          }, function(d) {
            if (d.success) {
              row.remove();
              table.draw();
              layer.msg("取消成功");
            } else {
              layer.msg("取消失败");
            }
          });
        });
      });
    }

    var table = $("#order-table").DataTable({
      columns: [
        { data: 'id' },
        { data: "nick_name" },
        { data: "good_id", visible: false },
        { data: 'phone' },
        { data: 'logtime' },
        { data: 'name' },
				{ data: 'total' },
        { data: 'if_success',
          render: function(d) {
            return {
              0: "<span class='label label-primary'>未交付</span>",
              1: "<span class='label label-success'>交易完成</span>"
            }[d];
          }
        },
        { data: 'if_success',
          render: function(data) {
            return '<div class="btn-group"><button type="button" class="btn btn-info btn-sm send-good"'+(data!="0"?"disabled":"")+'>发货</button><button type="button" class="btn btn-warning btn-sm cancel-order" '+(data!="0"?"disabled":"")+'>取消</button></div>';
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
      sql: "select * from v_mini_orders"
    }, function(d) {
      if (d.success && d.data) {
        vm.orders = d.data;
      }
    });
  });
}());
