var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');



// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 查询购物车接口
router.post('/selectAll', (req, res) => {
  let sql = $sql.card.selectAll;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid],function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 增加购物车接口 --- 路径
router.post('/add', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.card.add;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.gid, params.uid], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 删除单个购物车接口
// conn.connect();
router.post('/deleteOne', (req, res) => {
  let sql = $sql.card.deleteOne;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.cid],function(err, result) {
    if (err) {
      console.log("删除失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 删除全部购物车接口
// conn.connect();
router.post('/deleteAll', (req, res) => {
  let sql = $sql.card.deleteAll;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid],function(err, result) {
    if (err) {
      console.log("删除失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});


module.exports = router;