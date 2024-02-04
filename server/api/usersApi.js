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

// 增加用户接口 --- 路径
router.post('/addUsers', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.users.add;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid, params.uname, params.upwd, params.tel, params.role], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 管理员增加用户接口 --- 路径
router.post('/addUsersYh', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.users.addYh;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid, params.uname, params.upwd, params.tel, params.role], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 验证账号是否可用接口 --- 路径
router.post('/selectOne', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.users.selectOne;
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

// 删除用户接口
// conn.connect();
router.post('/deleteOne', (req, res) => {
  let sql = $sql.users.deleteOne;
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

// 登录接口 --- 路径
router.post('/login', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.users.login;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uid,params.upwd,params.role], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查询用户信息接口
router.post('/select', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.users.select;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 修改用户接口 --- 路径
router.post('/updateInfo', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.users.updateInfo;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.uname,params.upwd,params.tel,params.uid], function(err, result) {
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