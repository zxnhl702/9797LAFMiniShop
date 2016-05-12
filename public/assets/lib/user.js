(function() {
  var vm = new Vue({
    el: "#vm_user",
    data: {
      users: [],
      credits: {},
      user: {
        id: -1,
        open_id: "",
        sex: 0,
        pic: "",
        nick_name: "",
        phone: "",
        total: 0,
        cnt: 0,
        credits: 0
      },
      consumes: [],
      credits: [],
      coupons: [],
      locations: [],
      page_consumes: null,
      page_credits: null,
      credits_for_add: {
        credits: 0,
        event: ""
      },
      coupon_price: 0,
      row: null
    },
    watch: {
      users: function(d) {
        if (!d || !d.length) return;
        var self = this;
        d.forEach(function(r) {
          if (r.open_id in self.credits) {
            r.credits = parseInt(self.credits[r.open_id]);
          } else {
            r.credits = 0;
          }
          r.operator = "",
          table.row.add(r);
        });
        table.draw();
        bindEvents();
      },
      user: function(n) {
        var self = this;
        self.locations = [];
        self.coupons = [];
        self.credits = [];
        _callAjax({
          cmd: "multiFetch",
          multi: JSON.stringify([
            {
              key: "locations",
              sql: "select * from locations where open_id = '"+n.open_id+"'"
            },
            {
              key: "consumes",
              sql: "select id from orders where open_id = '"+n.open_id+"' and if_success = 3"
            },
            {
              key: "credits",
              sql: "select id from credits where open_id = '"+n.open_id+"'"
            },
            {
              key: "coupons",
              sql: "select * from v_coupons where open_id = '"+n.open_id+"'"
            }
          ])
        }, function(d) {
          if (!d.success || !d.data) return;
          self.locations = d.data.locations;
          ["consumes", "credits"].forEach(function(k) {
            if (!d.data[k]) return;
            var ids = [];
            d.data[k].forEach(function(i) {
              ids.push(i.id);
            });
            self["page_"+k].reInit(ids);
          });
          self.coupons = d.data["coupons"];
          });
      }
    },
    methods: {
      updatePages: function(ids, which) {
        var sqls = {
          consumes: "select * from v_orders where id = ("+ids.join(",")+")",
          credits: "select credits, strftime('%Y-%m-%d %H:%M:%S', logtime) as log_time, event from credits where id in ("+ids.join(",")+")"
        };
        var self = this;
				_callAjax({
          cmd: "fetch",
					sql: sqls[which]
				}, function(d) {
					if (!d.success) return;
					self[which]= d.data;
				});
      },
      updateCredit: function(ids) {
        this.updatePages(ids, "credits");
      },
      updateConsume: function(ids) {
        this.updatePages(ids, "consumes");
      },
      initCreditsForAdd: function() {
        this.credits_for_add = {
          credits: 0,
          event: ""
        };
      },
      initCouponForAdd: function() {
        var n = _now().split(" ")[0];
        this.coupon_pay = 0,
        $("#coupon_date_from").val(n);
        $("#coupon_date_to").val(n);
      },
      addCredits: function() {
        var cred = parseInt(this.credits_for_add.credits),
          evt = _trim(this.credits_for_add.event),
          self = this;
        if (!cred) return layer.msg("请输入积分！");
        if (!evt) return layer.msg("请输入事由！");
        _callAjax({
          cmd: "exec",
          sql: "insert into credits(open_id, credits, event) values ('"+this.user.open_id+"', "+cred+", '"+evt+"')"
        }, function(d) {
          if (d.success) {
            layer.msg("添加成功");
            self.page_credits.append(d.data);
            cred += self.user.credits;
            $("#user_credits").text(cred);
            dt = self.row.data();
            dt.credits = cred;
            self.row.data(dt).draw();
            bindEvents();
          } else {
            layer.msg("添加失败");
          }
        });
      },
      addCoupon: function() {
        var df = $("#coupon_date_from").val() + "",
          dt = $("#coupon_date_to").val() + "";
        if (!df || !dt || ((new Date(df)) > (new Date(dt)))) {
          return layer.msg("日期格式错误！");
        }
        if (this.coupon_price <= 0) return layer.msg("金额有误");
        var self = this;
        _callAjax({
          cmd: "exec",
          sql: "insert into coupons(open_id, price, date_from, date_to) values ('"
            + self.user.open_id + "', "
            + this.coupon_price + ", '"
            + df + "', '"
            + dt + "')"
        }, function(d) {
          if (!d.success || !d.data) return layer.msg("添加卡券失败！");
          layer.msg("添加卡券成功！");
          self.coupons.push({
            price: self.coupon_price,
            date_from: df,
            date_to: dt
          });
        });
      }
    }
  });

  var table = _table("#product-table", [
    { data: 'id' },
    { data: 'nick_name' },
    { data: "open_id", visible: false },
    { data: "sex", visible: false },
    { data: "pic", visible: false },
    { data: "phone" },
    { data: 'total' },
    { data: 'cnt' },
    { data: 'credits' },
    { data: 'log_time' },
    { data: "operator",
      render: function(n) {
        return '<div class="btn-group"><button type="button" class="btn btn-primary btn-sm show-user" data-toggle="modal" data-target="#user-modal">查看</button></div>';
      }
    }
  ]);

  var bindEvents = function() {
    $(".show-user").click(function() {
      var row = table.row($(this).parents().parents().parents('tr')),
        data = row.data();
      vm.row = row;
      vm.user = data;
    });
  };

  _callAjax({
    cmd: "multiFetch",
    multi: JSON.stringify([
      {
        key: "users",
        sql: "select * from v_users"
      },
      {
        key: "credits",
        sql: "select * from credits"
      }
    ])}, function(d) {
    if (d.success && d.data) {
      vm.users = d.data.users;
      var c = {};
      d.data.credits.forEach(function(r) {
        var credits = parseInt(r.credits)
        if (r.open_id in c) {
          c[r.open_id] += credits;
        } else {
          c[r.open_id] = credits;
        }
      });
      vm.credits = c;
    }
  });

  vm.page_consumes = _pages([], ".page_consume", 10, 5, vm.updateConsume);
  vm.page_credits =  _pages([], ".page_credit", 10, 5, vm.updateCredit);
}());
