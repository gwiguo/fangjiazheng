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

//模糊查询
router.post('/selectName', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.caigou.selectName;
  let params = req.body;
  console.log(params);
  let str = '%'+[params.goodsname]+'%';
  conn.query(sql, str, function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 增加采购订单接口 --- 路径
router.post('/add', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.caigou.add;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.goodsname, params.price, params.num, params.money], function(err, result) {
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
router.post('/selectAll', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.caigou.selectAll;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 删除采购订单接口
// conn.connect();
router.post('/deleteOne', (req, res) => {
  let sql = $sql.caigou.deleteOne;
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

// 修改采购订单接口 --- 路径
router.post('/updateInfo', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.caigou.updateInfo;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.goodsname, params.price, params.num, params.money, params.cid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// id查找采购订单接口
// conn.connect();
router.post('/selectOne', (req, res) => {
  let sql = $sql.caigou.selectOne;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.cid],function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;