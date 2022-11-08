const express = require('express');
const app = express(); // express 서버 생성
const port = process.env.PORT || 3000;
//let axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./data/mapdata.db',sqlite3.OPEN_READWRITE, (err)=> {

    if (err) return console.error(err.message);

    console.log("connection successful");

});

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(__dirname ));

// get : 읽기(사이트) , post : 쓰기(댓글작성), put: 수정, delete: 삭제(댓글)
 // 메인 페이지
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/mainPG.html');


});

app.get('/hi', function(요청, 응답){
    응답.sendFile(__dirname + '/example.html');


});

app.get('/search', function(요청, 응답){
    //응답.sendFile(__dirname + '/search.html');

    var sql = `SELECT * from '병원';`;
    db.all(sql, function(err, rows){
        rows.forEach(function (row){
            console.log(rows[0]);

            //응답.render("hospital", {model: row});
        });
        응답.render('search',{model: rows});

    });
});

app.get('/api/hospitals', function(요청, 응답){

    var sql = `SELECT * from '병원';`;
    db.all(sql, function(err, rows){
        rows.forEach(function (row){
            //console.log(rows[0]);

            //응답.render("hospital", {model: row});
        });
        응답.render('hospital',{model: rows});

    });
    /*const test = {
        title: "Test",
        items: ["one", "two", "three"]
      };
      응답.render("hospital", {model: test});*/
});

app.get('/api/pharmacy', function(요청, 응답){

    var sql = `SELECT * from '약국', '24시 편의점';`;
    db.all(sql, function(err, rows){
        rows.forEach(function (row){
            //console.log(rows[0]);

            //응답.render("hospital", {model: row});
        });
        응답.render('pharmacy',{model: rows});

    });
});

app.get('/api/sbjinryoso', function(요청, 응답){

    var sql = `SELECT * from '선별진료소';`;
    db.all(sql, function(err, rows){
        rows.forEach(function (row){
            //console.log(rows[0]);

            //응답.render("hospital", {model: row});
        });
        응답.render('sbjinryoso',{model: rows});

    });
});

app.get("/pharmach_list", (req, res) =>{

    let api = async() => {
        let response =  null;
            try{
            //http://api.odcloud.kr/api/3033733/v1/uddi:835b1c55-fbaf-45ee-936e-83b92b3c2a8d?page=1&perPage=10&returnType=XML&serviceKey=bb2DyTkLtZ69N9NXxrrn9JDou2Rshqy2nscuvs%2BPCKEv7NapMVsqMSJlxsXYHIs46GNI82Jp7qYApFEMokq5Jw%3D%3D
            response = await axios.get("http://api.odcloud.kr/api/3033733/v1/uddi:835b1c55-fbaf-45ee-936e-83b92b3c2a8d", {
                params:{
                    "serviceKey" : "bb2DyTkLtZ69N9NXxrrn9JDou2Rshqy2nscuvs+PCKEv7NapMVsqMSJlxsXYHIs46GNI82Jp7qYApFEMokq5Jw==",
                    "page" : req.query.page,
                    "perPage" : req.query.perPage,
                    "returnType" : req.query.returnType

                }
            });
        }
        catch(e){
            console.log(e);
        }
        return response;
    }
    api().then((response) =>{
        res.setHeader("Access Control Allow Origin", "*");
        res.json(response.data.response.body);
    });

});

app.listen(port,()=> console.log(`Example app listening on port ${port}`));
