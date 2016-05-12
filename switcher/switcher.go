package switcher

import (
	"database/sql"
	"encoding/json"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
	"strings"
	"time"
)

type Xl map[string]func(*http.Request) (string, interface{})

type MultiSql struct {
	Key string `json:"key"`
	Sql string `json:"sql"`
}

func Dispatch(db *sql.DB) Xl {
	return Xl{
		"multiFetch": func(r *http.Request) (string, interface{}) {
			var kvs []MultiSql
			var d = []byte(GetParameter(r, "multi"))
			err := json.Unmarshal(d, &kvs)
			perr(err, "无法转换为json")
			ret := make(map[string]interface{}, 10)
			for _, kv := range kvs {
				_, ret[kv.Key] = fetch(kv.Sql, db)
			}
			return "获取信息成功", ret
		},

		"fetch": func(r *http.Request) (string, interface{}) {
			return fetch(GetParameter(r, "sql"), db)
		},

		"exec": func(r *http.Request) (string, interface{}) {
			/*
			sql := GetParameter(r, "sql")
			res, err := db.Exec(sql)
			perr(err, "无法执行写操作")
			var ret int64
			if strings.Index(sql, "insert") >= 0 {
				ret, _ = res.LastInsertId()
			} else { // update or detete
				ret, _ = res.RowsAffected()
			}
			return "写操作成功", ret
			*/
			return exec(GetParameter(r, "sql"), db)
		},

		"transaction": func(r *http.Request) (string, interface{}) {
			tx, err := db.Begin()
			perr(err, "无法启动事务")
			var sqls []string
			err = json.Unmarshal([]byte(GetParameter(r, "sqls")), &sqls)
			perr(err, "无法转换json")
			for _, s := range sqls {
				_, err = tx.Exec(s)
				if err != nil {
					log.Println(err)
					err = tx.Rollback()
					perr(err, "无法回滚事务")
					break
				}
			}
			err = tx.Commit()
			perr(err, "无法提交事务")
			return "事务成功", nil
		},

		"guess": func(r *http.Request) (string, interface{}) {
			var (
				mostBuyTb   string
				recentBuyTb string
				count       int
			)
			openid := GetParameter(r, "openid")

			// 购买最多的种类
			err := db.QueryRow("select c.table_name, count(o.id) as cnt from orders o, categories c where o.open_id = ? and o.category_id = c.id group by o.category_id order by cnt desc limit 1", openid).Scan(&mostBuyTb, &count)
			if err != nil {
				db.QueryRow("select table_name from categories order by random() limit 1").Scan(&mostBuyTb)
			}
			// 最近购买的种类
			err = db.QueryRow("select table_name from categories where id in (select category_id from orders where open_id = ? order by id desc limit 1)", openid).Scan(&recentBuyTb)
			if err != nil {
				db.QueryRow("select table_name from categories order by random() limit 1").Scan(&recentBuyTb)
			}

			gs1 := guessGoods(db, mostBuyTb)
			gs2 := make([]Good, 0)
			if recentBuyTb != mostBuyTb {
				gs2 = guessGoods(db, recentBuyTb)
			}

			return "猜你喜欢成功", append(gs1, gs2...)
		},
	}
}

func guessGoods(db *sql.DB, tbname string) []Good {
	var goods []Good
	rows, err := db.Query("select id, name, price, imgs from " + tbname + " order by random() limit 3")
	perr(err, "无法获取我猜商品信息")
	for rows.Next() {
		var g Good
		rows.Scan(
			&g.Id,
			&g.Name,
			&g.Price,
			&g.Imgs,
		)
		g.Tb = tbname
		goods = append(goods, g)
	}
	return goods
}

func perr(err error, msg string) {
	if err != nil {
		log.Println(err)
		panic(msg)
	}
}

func GetParameter(r *http.Request, key string) string {
	s := r.URL.Query().Get(key)
	if s == "" {
		panic("没有参数" + key)
	}
	return s
}

func today() string {
	return time.Now().Format("2006-01-02")
}

func tommorrow() string {
	return time.Unix(time.Now().Unix()+86400, 0).Format("2006-01-02")
}

func fetch(sqlCmd string, db *sql.DB) (string, interface{}) {
	rows, err := db.Query(sqlCmd)
	perr(err, "无法执行sql")
	columns, err := rows.Columns()
	perr(err, "无法获取列信息")
	sqlLen := len(columns)

	var ret []interface{}
	for rows.Next() {
		vals := make([]sql.RawBytes, sqlLen)
		scanArgs := make([]interface{}, len(vals))
		for i := range vals {
			scanArgs[i] = &vals[i]
		}
		rows.Scan(scanArgs...)

		// s_vals := make([]string, sqlLen)
		s_vals := make(map[string]string, 0)
		for i, col := range vals {
			// s_vals[i] = string(col)
			s_vals[columns[i]] = string(col)
		}
		ret = append(ret, s_vals)
	}

	return "sql执行成功", ret
}

func exec(sqlCmd string, db *sql.DB) (string, interface{}) {
	res, err := db.Exec(sqlCmd)
	perr(err, "无法执行写操作")
	var ret int64
	if strings.Index(sqlCmd, "insert") >= 0 {
		ret, _ = res.LastInsertId()
	} else { // update or detete
		ret, _ = res.RowsAffected()
	}
	return "写操作成功", ret
}
