package main

import (
	sw "9797LAFMiniShop/switcher"
	upload "9797LAFMiniShop/upload"
	relay "9797LAFMiniShop/relay"
	"crypto/md5"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/julienschmidt/httprouter"
	_ "github.com/mattn/go-sqlite3"
	"io"
	"log"
	"net/http"
)

type Ret struct {
	Success bool        `json:"success"`
	ErrMsg  string      `json:"errMsg"`
	Data    interface{} `json:"data"`
}

type Search struct {
	Name      string `json:"name"`
	TableName string `json:"table_name"`
	GoodId    string `json:"good_id"`
	Imgs      string `json:"imgs"`
}

func main() {
	rt := httprouter.New()
	rt.GET("/relay", RelayHandler)
	rt.GET("/bshops", DlmHandler)
	rt.POST("/upload", upload.UploadHandler)

	n := negroni.Classic()

	n.UseHandler(rt)
	n.Run(":11004")
}

func RelayHandler(rw http.ResponseWriter, r *http.Request, p httprouter.Params) {
	db := ConnectDB("./middle.db")

	defer func() {
		db.Close()
		err := recover()
		if err != nil {
			rw.Write(GenJsonpResult(r, &Ret{false, err.(string), nil}))
			log.Println(err)
		}
	}()

	LogClient(r.RemoteAddr, db)

	log.Println(r.URL.RawQuery)

	switcher := relay.Dispatch(db)
	var ret []byte
	msg, data := switcher[sw.GetParameter(r, "cmd")](r)
	ret = GenJsonpResult(r, &Ret{true, msg, data})

	rw.Write(ret)
}

func DlmHandler(rw http.ResponseWriter, r *http.Request, p httprouter.Params) {
	db := ConnectDB("./middle.db")

	defer func() {
		db.Close()
		err := recover()
		if err != nil {
			rw.Write(GenJsonpResult(r, &Ret{false, err.(string), nil}))
			log.Println(err)
		}
	}()

	LogClient(r.RemoteAddr, db)

	log.Println(r.URL.RawQuery)

	switcher := sw.Dispatch(db)
	var ret []byte
	msg, data := switcher[sw.GetParameter(r, "cmd")](r)
	ret = GenJsonpResult(r, &Ret{true, msg, data})

	rw.Write(ret)
}

func GenJsonpResult(r *http.Request, rt *Ret) []byte {
	bs, err := json.Marshal(rt)
	if err != nil {
		panic(err)
	}
	return []byte(sw.GetParameter(r, "callback") + "(" + string(bs) + ")")
}

func ConnectDB(dbPath string) *sql.DB {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		panic(err)
	}
	return db
}

func LogClient(ip string, db *sql.DB) {
	// 如果没有click表，会出现pointer为nil的问题
	stmt, _ := db.Prepare("insert into clicks(ip) values(?)")
	stmt.Exec(ip)
}

// 生成随机码
func getGuid() string {
	b := make([]byte, 48)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		panic("获取随机码错误")
	}
	h := md5.New()
	h.Write([]byte(base64.URLEncoding.EncodeToString(b)))
	return hex.EncodeToString(h.Sum(nil))
}

func perr(err error, msg string) {
	if err != nil {
		log.Println(err)
		panic(msg)
	}
}
