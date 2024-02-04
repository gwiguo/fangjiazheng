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

// 增加商品类型接口 --- 路径
router.post('/insertOrders', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.insertOrders;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid, params.gid, params.money, params.num], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查询商品类型接口
router.post('/selectOrdes', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.orders.selectOrdes;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


router.post('/selectMyOrdes', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.selectMyOrdes;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

//删除
router.post('/deleteOne', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.deleteOne;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.oid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

//查单个
router.post('/selectOne', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.selectOne;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.oid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

//修改
router.post('/updateInfo', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.updateInfo;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.money,params.num,params.oid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

//修改是否评价
router.post('/updatePingjia', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.orders.updatePingjia;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.oid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;