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

// 增加接口 --- 路径
router.post('/add', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.add;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.sid, params.type, params.goodsname, params.price, params.productiondate, params.number, params.lirun,params.imgs], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 修改接口 --- 路径
router.post('/updateInfo', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.updateInfo;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.type, params.goodsname, params.price, params.sid, params.productiondate, params.number, params.lirun,params.imgs, params.id], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 修改数量接口 --- 路径
router.post('/updateNumber', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.updateNumber;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.number, params.id], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 加数量接口 --- 路径
router.post('/addNumber', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.addNumber;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.number, params.goodsname], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 改数量接口 --- 路径
router.post('/editNumber', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.editNumber;
  //接收前台数据
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.number, params.goodsname], function(err, result) {
    if (err) {
      console.log("操作失败"+err);
	  jsonWrite(res, result);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});


//模糊查询
router.post('/selectName', (req, res) => {
	//调用sql语句 --- sqlMap.js文件夹
  let sql = $sql.goods.selectName;
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

// 根据商品类型查询商品接口
router.post('/selectType', (req, res) => {
  let sql = $sql.goods.selectType;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.type],function(err, result) {
    if (err) {
      console.log("删除失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查询商品接口
router.post('/selectAll', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.goods.selectAll;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询商品价格升序接口
router.post('/selectPriceS', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.goods.selectPriceS;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询商品价格降序接口
router.post('/selectPriceJ', (req, res) => {
	//对应sqlMap.js文件中的sql语句
  let sql = $sql.goods.selectPriceJ;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log("查询失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 删除商品接口
// conn.connect();
router.post('/deleteOne', (req, res) => {
  let sql = $sql.goods.deleteOne;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.id],function(err, result) {
    if (err) {
      console.log("删除失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 删除商品接口
// conn.connect();
router.post('/selectPrice', (req, res) => {
  let sql = $sql.goods.selectPrice;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.goodsname],function(err, result) {
    if (err) {
      console.log("查找失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查商品接口
// conn.connect();
router.post('/selectOne', (req, res) => {
  let sql = $sql.goods.selectOne;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.id],function(err, result) {
    if (err) {
      console.log("查找失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// id查商品
// conn.connect();
router.post('/selectById', (req, res) => {
  let sql = $sql.goods.selectById;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.id],function(err, result) {
    if (err) {
      console.log("查找失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;