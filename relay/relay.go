package relay

import (
	"crypto/md5"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	_ "github.com/mattn/go-sqlite3"
	"io"
	"log"
	"net/http"
	"time"
)

type Xl map[string]func(*http.Request) (string, interface{})

type Good struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Price float32 `json:"price"`
	Left int `json:"left"`
	Img string `json:"img"`
}

type Order struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Price float32 `json:"score"`
	LogTime string `json:"htime"`
}

type Scores struct {
	OpenId string `json:"qcno"`
	Score int `json:"score"`
}

func Dispatch(db *sql.DB) Xl {
	return Xl{
		"getGoods": func(r *http.Request) (string, interface{}) {
			rows, err := db.Query("select id, name, price, left, imgs from cosmetics where if_valid = 1 and left > 0")
			perr(err, "无法获取商品信息")
			var gs []Good
			for rows.Next() {
				var g Good
				rows.Scan(
					&g.Id,
					&g.Name,
					&g.Price,
					&g.Left,
					&g.Img,
				)
				gs = append(gs, g)
			}
			return "获取商品信息成功", gs
		},

		"order": func(r *http.Request) (string, interface{}) {
			tx, err := db.Begin()
			perrorWithRollBack(err, "无法生成订单", tx)
			_, err = tx.Exec("insert into mini_orders(open_id, nick_name, car_no, phone, good_id) values(?,?,?,?,?)",
				GetParameter(r, "open_id"),
				GetParameter(r, "nick_name"),
				GetParameter(r, "car_no"),
				GetParameter(r, "phone"),
				GetParameter(r, "good_id"),
			)
			perrorWithRollBack(err, "无法生成订单", tx)
			var left int
			err = tx.QueryRow("select left from cosmetics where id = ?", GetParameter(r, "good_id")).Scan(&left)
			perrorWithRollBack(err, "无法生成订单", tx)
			if left == 0 {
				tx.Commit()
				panic("无法生成订单")
			} else {
				left--
			}
			_, err = tx.Exec("update cosmetics set left = ? where id = ?", left, GetParameter(r, "good_id"))
			perrorWithRollBack(err, "无法生成订单", tx)
			tx.Commit()
			return "下单成功", nil
		},

		"getOrders": func(r *http.Request) (string, interface{}) {
			rows, err := db.Query("select m.id, g.name, g.price, strftime('%Y-%m-%d %H:%M:%S', m.logtime) from mini_orders m, cosmetics g where m.good_id = g.id and m.open_id = ? and m.if_success >= 0", GetParameter(r, "open_id"))
			perr(err, "无法获取订单")
			var os []Order
			for rows.Next() {
				var o Order
				rows.Scan(
					&o.Id,
					&o.Name,
					&o.Price,
					&o.LogTime,
				)
				os = append(os, o)
			}
			return "获取订单成功", os
		},
		
		"getScores": func(r *http.Request) (string, interface{}) {
			open_ids := GetParameter(r, "open_ids")
			selectSql := "select o.open_id, sum(c.price) from mini_orders o, cosmetics c" + 
						" where o.good_id = c.id and o.if_success <> -1 and o.open_id in (" + open_ids + ") group by o.open_id "
			rows, err := db.Query(selectSql, open_ids)
			defer rows.Close()
			perr(err, "获取消费积分失败")
			var sList []Scores
			for rows.Next() {
				var s Scores
				rows.Scan(&s.OpenId, &s.Score)
				sList = append(sList, s)
			}
			return "获取消费积分成功", sList
		},

	}
}

func perr(err error, msg string) {
	if err != nil {
		log.Println(err)
		panic(msg)
	}
}

// 打印并抛出异常
func perrorWithRollBack(e error, errMsg string, tx *sql.Tx) {
	if e != nil {
		tx.Rollback()
		log.Println(e)
		panic(errMsg)
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

func getGuid() string {
	b := make([]byte, 48)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		panic("获取随机码错误")
	}
	h := md5.New()
	h.Write([]byte(base64.URLEncoding.EncodeToString(b)))
	return hex.EncodeToString(h.Sum(nil))
}
