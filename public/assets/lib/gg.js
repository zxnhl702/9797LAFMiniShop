(function() {
  $(function() {
    var vm = new  Vue({
      el: "#vm_ad",
      data: {
        ads: [],
        ad: {
          id: -1,
          name: "",
          position: "",
          img: "",
          if_valid: 0
        },
        current_id: -1
      },
      watch: {
        ads: function(n) {
          n.forEach(function(r) {
            table.row.add(r);
          });
          table.draw();
          bindEvents();
        }
      },
      methods: {
        editAd: function(n) {
          var self = this;
          if (!_trim(self.ad.name)) return layer.msg("名称不能为空");
          if (!self.ad.img) return layer.msg("图片不能为空");
          var p = parseInt(self.ad.position);
          if (p < 1 || p > 3) return layer.msg("请选择适当位置");

          _tell("update broadcasting set img = '"+self.ad.img+"', name = '"+self.ad.name+"', position = " +self.ad.position+" where id = "+self.ad.id);

          _callAjax({
            cmd: "exec",
            sql: "update broadcasting set img = '"+self.ad.img+"', name = '"+self.ad.name+"', position = "
              +self.ad.position+" where id = "+self.ad.id
          }, function(d) {
            if (d.success) {
              layer.msg("更新成功");
              $("#ad-modal").modal("hide");
              table.row(self.current_id).data(self.ad).draw();
              bindEvents();
            } else {
              layer.msg("更新失败");
            }
          })
        },
        delAdImg: function() {
          this.ad.img = "";
        }
      }
    });

    var table = _table("#ad-table", [
      { data: 'id' },
      { data: 'name' },
      { data: 'img', visible: false },
      { data: 'position',
        render: function(d) {
          return {
            "1": "左大",
            "2": "右上",
            "3": "右下"
          }[d];
        }
      },
      {
        data: "if_valid",
        render: function(d) {
          if (parseInt(d)) {
            return "<span class='label label-primary'>生效</span>";
          } else {
            return "<span class='label label-danger'>失效</span>";
          }
        }
      },
      {
        data: "if_valid",
        render: function(n) {
          return '<div class="btn-group"><button type="button" class="btn btn-warning btn-sm edit-ad" data-toggle="modal" data-target="#ad-modal">修改</button><button type="button" class="btn btn-danger btn-sm remove-ad">'+
            (parseInt(n)?"删除":"启用")+'</button></div>'
        }
      }
    ]);

    var bindEvents = function() {
      $('.edit-ad').click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
          data = row.data();
        vm.ad = data;
        vm.current_id = row.index();
      });
      $('.remove-ad').click(function() {
        var row = table.row($(this).parents().parents().parents('tr')),
          data = row.data(),
          t = parseInt(data.if_valid)?"删除":"启用",
          valid = parseInt(data.if_valid)?"0":"1";
        layer.confirm("确定"+t+"？", {
          btn: ["确定", "取消"]
        }, function(idx) {
          layer.close(idx);
          _callAjax({
            cmd: "exec",
            sql: "update broadcasting set if_valid = "+valid+" where id = "+data.id
          }, function(d) {
            if(d.success) {
              layer.msg(t+"成功");
              data.if_valid = valid;
              row.data(data).draw();
              bindEvents();
            } else {
              layer.msg(t+"失败");
            }
          });
        });
      });
    };

    $("#ad-modal-file").change(function() {
      var f = $(this).get(0).files[0];
      if (!f) return;
      layer.confirm("是否上传图片？", {
        btn: ["确定", "取消"]
      }, function() {
        _uploadImg(f, "broadcasting", "/upload", function(t) {
          var d = JSON.parse(t);
          vm.ad.img = d.data;
        });
      });
    });

    _callAjax({
      cmd: "fetch",
      sql: "select id, name, img, position, url, if_valid from broadcasting order by id desc limit 5000"
    }, function(d) {
      if (d.success && d.data) {
        vm.ads = d.data;
      }
    });

  });
}());
