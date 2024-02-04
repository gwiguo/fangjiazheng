
// const express = require('express')
// const app=express() 

const http = require('http');
//用户接口
const usersApi = require('./api/usersApi');
//商品类型接口
const typeApi = require('./api/typeApi');
//商品接口
const goodsApi = require('./api/goodsApi');
//订单接口
const ordersApi = require('./api/ordersApi');
//评价接口
const commentsApi = require('./api/commentsApi');
//供应商接口
const supplierApi = require('./api/supplierApi');
//采购订单接口
const caigouApi = require('./api/caigouApi');
//购物车接口
const cardApi = require('./api/cardApi');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();
// let server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 后端api路由接口路径
app.use('/api/users', usersApi);
app.use('/api/type', typeApi);
app.use('/api/goods', goodsApi);
app.use('/api/orders', ordersApi);
app.use('/api/comments', commentsApi);
app.use('/api/supplier', supplierApi);
app.use('/api/caigou', caigouApi);
app.use('/api/card', cardApi);

const server = app.listen(3000,function () {

 const {address,port} =server.address() 
 console.log('HTTP服务启动成功:http://%s:%s',address,port) 
}) 

// node后端服务器
// const http = require('http');
// const badyParser = require('body-parser');
// const express = require('express');

// const userApi = require('./api/userApi');

// let app = express();
// let server = http.createServer(app);



// app.use(badyParser.json());
// app.use(badyParser.urlencoded({
//     extended: false
// }));

// // 后端api路由


// // 启动监听
// server.listen(5000, () => {
//     console.log(' success!! port:8888')
// })