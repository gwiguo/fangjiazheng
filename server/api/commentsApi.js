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
router.post('/insertComments', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.comments.insertComments;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid, params.oid, params.gid, params.content], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

//查商品评价
router.post('/selectById', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.comments.selectById;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.gid], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查我的评价
router.post('/selectMyComments', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.comments.selectMyComments;
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


module.exports = router;