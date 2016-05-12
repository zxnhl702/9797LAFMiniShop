(function() {
  $(function() {
    var vm = new Vue({
      el: "vm_comments",
      data: {
        comments: [],
        targets: {}
      },
      watch: {
        comments: function(n) {
          if (!n) {
            this.targets = {};
            return;
          }
          var tables = {};
          n.forEach(function(r) {
            if ((r.table_name in tables) && (tables[r.table_name].indexOf(r.good_id) < 0)) {
              tables[r.table_name].push(r.good_id)
            } else {
              tables[r.table_name] = [r.good_id];
            }
          });
          var multis = [];
          Object.keys(tables).forEach(function(k) {
            multis.push({
              key: k,
              sql: "select id, name from "+k+" where id in ("+tables[k].join(",")+")"
            });
          });
          var self = this;
          _callAjax({
            cmd: "multiFetch",
            multi: JSON.stringify(multis)
          }, function(d) {
            if (!d.success || !d.data) layer.msg("读取信息失败");
            Object.keys(d.data).forEach(function(k) {
              d.data[k].forEach(function(r) {
                self.targets[k+"|"+r.id] = r.name;
              });
            });
            self.updateTable();
          });
        }
      },
      methods: {
        updateTable: function() {
          var self = this;
          this.comments.forEach(function(c) {
            table.row.add({
              c_id: c.id,
              nick_name: c.nick_name,
              good_name: self.targets[c.table_name+"|"+c.good_id],
              content: c.content,
              log_time: c.log_time,
              operator: ""
            });
          });
          table.column('0').order("desc").draw();
          $(".del-comment").click(function() {
            var self = this;
            layer.confirm("确定删除该评论？", {
              btn: ["确定", "取消"]
            }, function() {
              var row = table.row($(self).parents().parents('tr')),
                c_id = row.data().c_id;
              _callAjax({
                cmd: "exec",
                sql: "update comments set if_valid = 0 where id = "+c_id
              }, function(d) {
                if (!d.success || !d.data) return layer.msg("删除失败");
                layer.msg("删除成功");
                row.remove().draw();
              });
            });
          });
        }
      }
    });

    var table = $("#comment-table").DataTable({
      columns: [
        { data: 'c_id' },
        { data: 'nick_name' },
        { data: 'good_name' },
        { data: 'content' },
				{ data: 'log_time' },
        { data: 'operator',
          render: function(data) {
            return "<button type='button' class='btn btn-danger btn-sm del-comment'>删除</button>";
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
      sql: "select * from v_comments"
    }, function(d) {
      if (d.success && d.data) {
        vm.comments = d.data;
      }
    });
  });
}());
