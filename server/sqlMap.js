var sqlMap = {
  // 用户
  users: {//users指代表名
	//是对应的增删改查语句
    add: 'insert into users values(?,?,?,?,?)',
	addYh: 'insert into users(tel,uid,uname,upwd,role) values(?,?,?,?,DEFAULT)',
	select:'select * from users where role = 0',
	selectOne:'select * from users where uid=?',
	login:'select * from users where uid=? and upwd=? and role=?',
	updateInfo:'update users set uname=?,upwd=?,tel=? where uid=?',
	deleteOne:'delete from users where uid=?'
  },
  type:{
  	  selectAll:'select * from type',
	  deleteOne:'delete from type where id=?',
	  selectOne:'select * from type where id=?',
	  selectName:'select * from type where typename = ?',
	  updateInfo:'update type set typename=? where id=?',
	  add: 'insert into type values(default,?)',
  },
  goods:{
	  addNumber:'update goods set number=number+? WHERE goodsname = ?',
	  editNumber:'update goods set number=? WHERE goodsname = ?',
	  updateNumber:'update goods set number=number-? WHERE id = ?',
	  updateInfo:'update goods set type=?,goodsname=?,price=?,sid=?,productiondate=?,number=?,lirun=?,imgs=? where id=?',
	  selectOne:'select * from goods where id=?',
	  add: 'insert into goods(id,sid,type,goodsname,price,productiondate,number,lirun,imgs) values(default,?,?,?,?,?,?,?,?)',
	  selectPriceS:'select * from goods ORDER BY price',
	  selectPriceJ:'select * from goods ORDER BY price desc',
  	  selectName:'select * from goods where goodsname like ?',
	  selectPrice:'select * from goods where goodsname=?',
	  selectType:'select goods.* from goods left join type on goods.type = type.id where goods.type = ?',
	  selectAll:'select goods.*,type.typename,supplier.region,supplier.suppliername from goods left join type on goods.type = type.id LEFT JOIN supplier ON goods.sid = supplier.id',
	  selectById:'select goods.*,type.typename,supplier.region,supplier.suppliername from goods left join type on goods.type = type.id LEFT JOIN supplier ON goods.sid = supplier.id where goods.id = ?',
	  deleteOne:'delete from goods where id=?'
  },
  orders:{
	  updateInfo:'update orders set money=?,num=? where oid=?',
	  updatePingjia:'update orders set pingjia=1 where oid=?',
	  selectOne:'SELECT users.uname,users.uid,users.tel,goods.id,goods.goodsname,goods.price,orders.oid,orders.num,orders.money FROM orders LEFT JOIN users ON orders.uid = users.uid LEFT JOIN goods ON orders.gid = goods.id where orders.oid = ?',
	  deleteOne:'delete from orders where oid=?',
  	  insertOrders:'INSERT INTO orders VALUES(default,?,?,?,?,default)',
	  selectMyOrdes:'SELECT goods.imgs,users.uname,users.tel,goods.id,goods.goodsname,goods.price,orders.oid,orders.uid,orders.num,orders.money,orders.pingjia FROM orders LEFT JOIN users ON orders.uid = users.uid LEFT JOIN goods ON orders.gid = goods.id where orders.uid = ?',
	  selectOrdes:'SELECT users.uname,users.tel,goods.goodsname,goods.price,goods.lirun,orders.oid,orders.num,orders.money FROM orders LEFT JOIN users ON orders.uid = users.uid LEFT JOIN goods ON orders.gid = goods.id',
  },
  comments:{
	  selectById:'select * from comments where gid = ? order by comments.ctime desc',
	  insertComments:'insert into comments(cid,uid,oid,gid,content,ctime) values(default,?,?,?,?,NOW())',
	  selectMyComments:'SELECT comments.ctime,comments.cid,users.uname,goods.goodsname,goods.imgs,comments.content FROM comments LEFT JOIN users ON comments.uid = users.uid LEFT JOIN goods ON comments.gid = goods.id where comments.uid = ? order by comments.ctime desc',
  },
  supplier:{
	  selectAll:'select * from supplier',
	  deleteOne:'delete from supplier where id=?',
	  updateInfo:'update supplier set region=?,suppliername=?,tel=? where id=?',
	  add: 'insert into supplier values(default,?,?,?)',
	  selectOne:'select * from supplier where id = ?',
  },
  caigou:{
	  selectName:'select * from caigou where goodsname like ?',
	  add: 'insert into caigou values(default,?,?,?,?)',
	  selectAll:'select * from caigou',
	  deleteOne:'delete from caigou where cid=?',
	  selectOne:'select * from caigou where cid = ?',
	  updateInfo:'update caigou set goodsname=?,price=?,num=?,money=? where cid=?',
  },
  card:{
	  deleteAll:'delete from card where uid=?',
	  deleteOne:'delete from card where cid=?',
  	  add: 'insert into card values(default,?,default,?)',
	  selectAll:'select card.*,goods.goodsname,goods.price,goods.imgs from card LEFT JOIN goods ON card.gid = goods.id where card.uid=?',
  },
}

module.exports = sqlMap;